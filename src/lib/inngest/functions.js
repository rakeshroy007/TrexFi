import { sendEmail2 } from "@/actions/send-email";
import { db } from "../prisma";
import { inngest } from "./client";
import EmailTemplate222 from "../../../emails/template2";
import { GoogleGenerativeAI } from "@google/generative-ai";



export const checkBudgetAlert = inngest.createFunction( 
  { name: "Check Budget Alerts" }, 
  { cron: "0 */6 * * *" },       // 📌 This is a cron-expression which will run every 6 hours... 
  async ({ step }) => {
    const budgets = await step.run("fetch-budget", async () => {
      return await db.budget.findMany({ 
        include: { 
          user: { 
            include: { 
              accounts: {
                where: {
                  isDefault: true
                }
              }
            }
          }
        }
      })
    })

    for (const budget of budgets) { 
      const defaultAccount = budget.user.accounts[0]
      if (!defaultAccount) continue;   // skip if no default account 

      await step.run(`check-budget-${budget.id}`, async () => {

        const currentDate = new Date();
        // start of current month
        const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        )

        const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        )

        const expenses = await db.transaction.aggregate({ 
          where: { 
            userId: budget.userId, 
            accountId: defaultAccount.id,   // Only consider default account
            type: "EXPENSE",
            date: { 
              gte: startOfMonth, 
              lte: endOfMonth 
            },
          },
          _sum: { 
            amount: true,
          }
        });
        console.log("Expenses: ", expenses)

        const totalExpenses = expenses?._sum.amount?.toNumber() || 0;
        const budgetAmount = budget.amount;
        const percentageUsed = (totalExpenses / budgetAmount) * 100

        console.log("percentageUsed: ", percentageUsed)

        console.log("budget.lastAlertSent: ",budget.lastAlertSent)
        if (percentageUsed >= 80 && 
          (!budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date()))
        ) {

          if (!budget.user?.email) {
            console.error("No email found for user:", budget.user);
            return;
          }
          
          // 👉 Send Email
          await sendEmail2({
            to: budget.user.email, 
            subject: `Budget Alert for ${defaultAccount.name}`,
            react: EmailTemplate222({
              userName: budget.user.name,
              type: "budget-alert",
              data: {
                percentageUsed, 
                budgetAmount: parseInt(budgetAmount).toFixed(1),
                totalExpenses: parseInt(totalExpenses).toFixed(1),
                accountName: defaultAccount.name
              }
            })
          })

          // 👉 Update lastAlertSent
          if (!budget?.id) {
            console.log("Budget Id: ",budget?.id)
            throw new Error("Budget ID is undefined or null");
          }

          try {  
            await db.budget.update({ 
              where: { id: budget.id },  
              data: { lastAlertSent: new Date() } 
            }); 
          
          
          } catch (error) {
            console.error("Error updating budget:", error);
            return { success: false, error: error.message };  // Return a valid object
          }
          
        }
      })
    }

  },
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}


export const triggerRecurringTransactions = inngest.createFunction(
  {
    id: "trigger-recurring-transactions",
    name: "Trigger Recurring Transactions",
  },
  {cron: "0 0 * * *"},      // This will be run everyday at midnight...
  async ({ step }) => {
    // 👉 1. Fetch all due recurring transactions
    const recurringTransactions = await step.run(
      "fetch-recurring-transactions",
      async () => {
        return await db.transaction.findMany({
          where: {
            isRecurring: true,
            status: "COMPLETED",
            OR: [
              { lastProcessed: null },     // never processed
              { nextRecurringDate: {lte: new Date()} },   // Due date passed
            ],
          },
        })
      }
    )

    // 👉 2. Create events for each transaction
    if ( recurringTransactions.length > 0 ) {
      const events = recurringTransactions.map((transaction) => ({       
        name: "transaction.recurring.process",
        data: { transactionId: transaction.id, userId: transaction.userId },
      }))

      // 👉 3. Send events to be processed
      await inngest.send(events)
    }

    return { triggered: recurringTransactions.length }
  }
)


export const processRecurringTransaction = inngest.createFunction(
  {
    id: "process-recurring-transaction",
    throttle: {
      limit: 10,    // Only process 10 transactions
      period: "1m",   // per minute
      key: "event.data.userId",    // per user
    }, 
  },
  { event: "transaction.recurring.process" },
  async ({ event, step }) => {
    // Validate event data
    if (!event?.data?.transactionId || !event?.data?.userId) {
      console.error("Invalid event data: ", event)
      return { error: "Missing required event data" };
    }

    await step.run("process-transaction", async() => {
      const transaction = await db.transaction.findUnique({
        where: {
          id: event.data.transactionId,
          userId: event.data.userId,
        },
        include: {         // include account information to this transaction...
          account: true,
        }
      })

      if (!transaction || !isTransactionDue(transaction)) return

      await db.$transaction(async (tx) => {
        // 1️⃣ Create new transaction
        await tx.transaction.create({
          data: {
           type: transaction.type,
           amount: transaction.amount,
           description: `${transaction.description} (Recurring)` ,
           date: new Date(),
           category: transaction.category,
           userId: transaction.userId,
           accountId: transaction.accountId,
           isRecurring: false
          }
        })

        // 2️⃣ Update account balance
        const balanceChange = transaction.type === "EXPENSE" ? -transaction.amount.toNumber() : transaction.amount.toNumber()

        await tx.account.update({
          where: { id: transaction.accountId },
          data: { balance: { increment: balanceChange } }
        })

        // 3️⃣ Update last processed date and next recurring date
        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            lastProcessed: new Date(),
            nextRecurringDate: calculateNextRecurringDate(
              new Date(),
              transaction.recurringInterval
            )
          }
        })

      })

    })
  }
)


function isTransactionDue(transaction) {
  // If no lastProcessed date, transaction is due
  if (!transaction.lastProcessed) return true

  const today = new Date()
  const nextDue = new Date(transaction.nextRecurringDate)

  // Compare with nextDue date
  return nextDue <= today
}

function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate)

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1)
      break
    case "WEEKLY":
      date.setDate(date.getDate() + 7)
      break
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1)
      break
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1)
      break
  }

  return date
}


export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    name: "Generate Monthly Reports"
  }, 
  { cron: "0 0 1 * *" },         // Run every first month...
  async({ step }) => {
    const users = await step.run("fetch-users", async()=> {
      return await db.user.findMany({ 
        include: { accounts: true }, 
      })
    })

    for (const user of users) {
      await step.run(`generate-report-${user.id}`, async () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1)

        const stats = await getMonthlyStats(user.id, lastMonth)
        /*
          Sample Example: 
          {
            totalExpenses: 100,
            totalIncome: 150,
            byCategory: { Food: 80, Transport: 20 },
            transactionCount: 5
          }
        */
        const monthName = lastMonth.toLocaleString("default", { month: "long" })

        const insights = await generateFinancialInsights(stats, monthName) ;

        await sendEmail2({ 
          to: user.email, 
          subject: `Your Monthly Financial Report - ${monthName}`,
          react: EmailTemplate222({
            userName: user.name,
            type: "monthly-report",
            data: {
              stats,
              month: monthName,
              insights
            }
          })
        })
      })
    }

    return { processed: users.length }
  }
)


const getMonthlyStats = async (userId, month) => { 
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1) 
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0)        // last day of month ex: 2025-02-28T00:00:00.000Z (last day of February)...

  const transactions = await db.transaction.findMany({
    where: {
      userId: userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  return transactions.reduce(
    (stats, t) => {
      const amount = t.amount.toNumber()
      if (t.type === 'EXPENSE') {
        stats.totalExpenses += amount
        stats.byCategory[t.category] = (stats.byCategory[t.category] || 0) + amount
      } else {
        stats.totalIncome += amount
      }
      return stats;
    },
    {
      totalExpenses: 0,
      totalIncome: 0,
      byCategory: {},
      transactionCount: transactions.length,
    }
  )
}

async function generateFinancialInsights(stats, month) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    Keep it friendly and conversational.

    Financial Data for ${month}:
    - Total Income: $${stats.totalIncome}
    - Total Expenses: $${stats.totalExpenses}
    - Net Income: $${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
      .map(([category, amount]) => `${category}: $${amount}`)
      .join(", ")}

    Format the response as a JSON array of strings, like this:
    ["insight 1", "insight 2", "insight 3"]
  `

  try {
    const result = await model.generateContent( prompt )
    const response = await result.response
    const text = response.text()
    const clenedText = text.replace(/```(?:json)?\n?/g, "").trim()

    return JSON.parse(clenedText)
  } catch (error) {
    console.error("Error generating insights: ", error)
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ]
  }
}
