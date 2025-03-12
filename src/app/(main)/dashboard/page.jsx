import { getDashboardData, getUserAccounts } from '@/actions/dashboard'
import CreateAccountDrawer from '@/components/Create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React, { Suspense } from 'react'
import AccountCard from './_components/account-card'
import { getCurrentBudget } from '@/actions/budget'
import BudgetProgress from './_components/budget-progress'
import DashboardOverview from './_components/transaction-overview'

export default async function DashboardPage (){

  let accounts = [];
  let transactions = [];
  let budgetData = null;
  let defaultAccount = null;
  let errorOccurred = false; // Track errors
  
  try {
    accounts = (await getUserAccounts()) || []
    
    defaultAccount = accounts?.find((account) => account.isDefault)
    
    if (defaultAccount) {
      budgetData = await getCurrentBudget(defaultAccount.id)
    }
  
  
    transactions = await getDashboardData()
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    errorOccurred = true;

  }

  if (errorOccurred) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  return ( 
    <div className='space-y-8'>
       {/* Budget Progress */}
       {
        defaultAccount && (
          <BudgetProgress 
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        )
       }

       {/* Overview */}
       <Suspense fallback="Loading Overview...">
          <DashboardOverview
            accounts={accounts}
            transactions={transactions || [] }
          />
       </Suspense>


       {/* Accounts Grid */}
       <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className='h-10 w-10 mb-2'/>
                <p className='text-sm font-medium'>Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {
            Array.isArray(accounts) && accounts.length>0 && 
            accounts?.map((account)=> {
              return <AccountCard key={account.id} account={account} />
            })
          }

       </div>
    </div>
  )
}

