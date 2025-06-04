'use client'

import { LayoutDashboard, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export const AddDashboardButton = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    
    const handleClick = () => {
        if (pathname !== '/dashboard') {
            setIsLoading(true)
            router.push('/dashboard')
        }
    }
    
    useEffect(() => {
        // Reset loading state when route changes
        setIsLoading(false)
    }, [pathname])

    return (
         <Button 
            variant="outline"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-gray-200"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin items-center" />
            ) : (
                <>
                    <LayoutDashboard size={18} />
                    <span className='hidden md:inline'>Dashboard</span>
                </>
            )}
        </Button>
    )
}