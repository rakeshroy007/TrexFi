'use client'

import { updateDefaultAccount } from '@/actions/accounts'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import useFetch from '@/hooks/use-fetch'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AccountCard = ({ account }) => {
    if (!account) return null;  // Ensure account is defined
    const { name, type, balance, id, isDefault } = account
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        loading: updateDefaultLoading,
        fn: updateDefaultFn,
        data: updateAccount,
        error,
    } = useFetch(updateDefaultAccount) 

    const handleDefaultChange = async(event) => {
        event.preventDefault()

        if (isDefault) {
            toast.warning("You need atleast 1 default account")
            return;      // Don't allow toggling off the default account
        }

        await updateDefaultFn(id)
    }

    useEffect(()=> {
        if (updateAccount?.success) {
            toast.success("Default account updated successfully")
        }
    }, [updateAccount, updateDefaultLoading])

    useEffect(()=> {
        if (error) {
            toast.error(error.message || "Failed to update default account")
        }
    }, [error])

    const handleClick = (e) => {
        e.preventDefault(); // Prevents instant navigation
        if (!loading) {
            setLoading(true);
            try {
                router.push(`/account/${id}`);
            } catch (error) {
                console.error("Navigation failed:", error);
                toast.error("Failed to navigate.");
            } finally {
                setLoading(false)
            }
        }
    }

  return (
    <div className='space-y-4'>
        <Card className="hover:shadow-md transition-shadow group relative">
            <Link href={`/account/${id}`} onClick={handleClick} className={`block ${loading ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
                    <Switch 
                        checked={isDefault}
                        onClick={handleDefaultChange}
                        disabled={updateDefaultLoading}
                    />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>
                        ${parseFloat(balance).toFixed(2)}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                        {type.charAt(0) + type.slice(1).toLowerCase()} Account
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                    <div className='flex items-center'>
                        <ArrowUpRight className='mr-1 h-4 w-4 text-green-500' />
                        Income
                    </div>
                    <div className='flex items-center'>
                        <ArrowDownRight className='mr-1 h-4 w-4 text-red-500' />
                        Expense
                    </div>
                </CardFooter>
            </Link>
        </Card>
    </div>
  )
}

export default AccountCard
