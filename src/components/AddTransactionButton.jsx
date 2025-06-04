'use client'

import { Loader2, PenBox } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const AddTransactionButton = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    
    const handleClick = () => {
        if (pathname !== '/transaction/create') {
            setIsLoading(true)
            router.push('/transaction/create')
        }
    }

    useEffect(() => {
        // Reset loading state when route changes
        setIsLoading(false)
    }, [pathname])

    return (
        <Button 
            className='flex items-center gap-2 hover:opacity-70'
            onClick={handleClick}
            disabled={isLoading}
        >
            { isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <>
                    <PenBox size={18} />
                    <span className='hidden md:inline'>Add Transaction</span>
                </>
                )
            }
        </Button>
    )
}