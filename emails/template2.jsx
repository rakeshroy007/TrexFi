
export default function EmailTemplate222({

    /*
        const PREVIEW_DATA = {
            monthlyReport: {
                userName: "John Doe",
                type: "monthly-report",
                data: {
                    month: "December",
                    stats: {
                        totalIncome: 5000,
                        totalExpenses: 3500,
                        byCategory: {
                        housing: 1500,
                        groceries: 600,
                        transportation: 400,
                        entertainment: 300,
                        utilities: 700,
                        },
                    },
                    insights: [
                        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
                        "Great job keeping entertainment expenses under control this month!",
                        "Setting up automatic savings could help you save 20% more of your income.",
                    ],
                },
            },
            budgetAlert: {
                userName: "John Doe",
                type: "budget-alert",
                data: {
                    percentageUsed: 85,
                    budgetAmount: 4000,
                    totalExpenses: 3400,
                },
            },
            };
    */ 
        userName = "",
        type = "monthly-report",
        data = { },
    }) {
        if (type === "monthly-report") {
            return ( 
                `
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Monthly Financial Report</title>
                    <style>
                        body {
                            background-color:rgb(107, 160, 216);
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        .container { 
                            background-color: #ffffff;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        }
                        .title {
                            color: #1f2937;
                            font-size: 32px;
                            font-weight: bold;
                            text-align: center;
                            margin: 0 0 20px;
                        }
                        .text {
                            color: #4b5563;
                            font-size: 16px;
                            margin-bottom: 16px;
                        }
                        .stats-container {
                            margin: 32px 0;
                            padding: 20px;
                            background-color: #e9edf2;
                            border-radius: 5px;
                        }
                        .stat {
                            margin-bottom: 16px;
                            padding: 12px;
                            background-color: #fff;
                            border-radius: 4px;
                            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                            text-align: center;
                        }
                        .heading {
                            color: #1f2937;
                            font-size: 20px;
                            font-weight: 600;
                            margin: 0 0 16px;
                        }
                        .section {
                            margin-top: 32px;
                            padding: 20px;
                            background-color: #f9fafb;
                            border-radius: 5px;
                            border: 1px solid #e5e7eb;
                        }
                        .footer {
                            color: #6b7280;
                            font-size: 14px;
                            text-align: center;
                            margin-top: 32px;
                            padding-top: 16px;
                            border-top: 1px solid #e5e7eb;
                        }
                        .row {
                            display: flex;
                            justify-content: space-between;
                            padding: 12px 0;
                            border-bottom: 1px solid #e5e7eb;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1 class="title">Monthly Financial Report</h1>

                        <p class="text">Hello ${userName},</p>
                        <p class="text">Here&rsquo;s your financial summary for ${data?.month}:</p>

                        <!-- Main Stats -->
                        <div class="stats-container">
                            <div class="stat">
                                <p class="text">Total Income</p>
                                <p class="heading">${(data?.stats.totalIncome || 0).toFixed(2)}</p>
                            </div>
                            <div class="stat">
                                <p class="text">Total Expenses</p>
                                <p class="heading">${(data?.stats.totalExpenses || 0).toFixed(2)}</p>
                            </div>
                            <div class="stat">
                                <p class="text">Net</p>
                                <p class="heading">
                                    ${(data?.stats.totalIncome - data?.stats.totalExpenses).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <!-- Category Breakdown -->
                        ${data?.stats.byCategory 
                            ? `
                            <div class="section">
                                <h2 class="heading">Expenses by Category</h2>
                                ${Object.entries(data.stats.byCategory).map(
                                    ([category, amount]) => `
                                        <div class="row">
                                            <p class="text">${category} : $${amount.toFixed(2)}</p>
                                        </div>
                                    `
                                ).join("")}
                            </div>
                            ` 
                            : ""}

                        <!-- AI Insights -->
                        ${data?.insights
                            ? `
                            <div class="section">
                                <h2 class="heading">Wealth Insights</h2>
                                ${data.insights.map(insight => `
                                    <p class="text">• ${insight}</p>
                                `).join("")}
                            </div>
                            `
                            : ""}

                        <p class="footer">
                            Thank you for using Wealth. Keep tracking your finances for better financial health!
                        </p>
                    </div>
                </body>
                </html>
                `
            )
        }

        if (type === "budget-alert") {
            return (
                `
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Budget Alert</title>
                        <style>
                            body {
                                background-color: #f6f9fc;
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 20px;
                            }
                            .container {
                                background-color: #ffffff;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                            }
                            .title {
                                color: #1f2937;
                                font-size: 32px;
                                font-weight: bold;
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .text {
                                color: #4b5563;
                                font-size: 16px;
                                margin-bottom: 16px;
                            }
                            .stats-container {
                                margin: 32px 0;
                                padding: 20px;
                                background-color: #e9edf2;
                                border-radius: 5px;
                            }
                            .stat {
                                margin-bottom: 16px;
                                padding: 12px;
                                background-color: #fff;
                                border-radius: 4px;
                                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                                text-align: center;
                            }
                            .stat-heading {
                                color: #1f2937;
                                font-size: 20px;
                                font-weight: 600;
                                margin-bottom: 8px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1 class="title">Budget Alert</h1>
                            <p class="text">Hello <strong>${userName},</strong>,</p>
                            <p class="text">You&rsquo;ve used <strong>${data?.percentageUsed.toFixed(1)}%</strong> of your monthly budget.</p>
                            <div class="stats-container">
                                <div class="stat">
                                    <p class="text">Budget Amount</p>
                                    <p class="stat-heading">$${data?.budgetAmount}</p>
                                </div>
                                <div class="stat">
                                    <p class="text">Spent So Far</p>
                                    <p class="stat-heading">$${data?.totalExpenses}</p>
                                </div>
                                <div class="stat"> 
                                    <p class="text">Remaining</p>
                                    <p class="stat-heading">$${(data?.budgetAmount - data?.totalExpenses).toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
                `
            )
        }
    
    }
    