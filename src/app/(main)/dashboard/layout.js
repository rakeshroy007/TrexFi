import React, { Suspense } from 'react'
import DashboardPage from './page'
// import { BarLoader } from 'react-spinners'
import { DashboardSkeleton } from '@/components/DashboardSkeleton'

const DashboardLayout = () => {
  return (
    <div className='px-5'>
      <div className="flex items-center justify-between mb-5">
        <h1 className='text-6xl font-bold gradient-title mb-5'>Dashboard</h1>
      </div>

    {/* Dashboard Page */}
        <Suspense fallback={<DashboardSkeleton />} >
            <DashboardPage />
        </Suspense>
    </div>
  )
}

export default DashboardLayout
