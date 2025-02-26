import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlert, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransactions } from "@/lib/inngest/functions";
// import { helloWorld } from "@/lib/inngest/functions";
import { serve } from "inngest/next";
 

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    // helloWorld,            // This will call the sample function...
    checkBudgetAlert, 
    triggerRecurringTransactions, 
    processRecurringTransaction,
    generateMonthlyReports,

  ],
});
