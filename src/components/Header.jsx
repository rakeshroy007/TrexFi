import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { checkUser } from '@/lib/checkUser'
import { AddTransactionButton} from './AddTransactionButton'
import {AddDashboardButton} from './AddDashboardButton'

const Header = async() => {

    try {
        await checkUser()
    } catch (error) {
        console.error("Error in checkUser:", error)
    }

  return (
    <div className='fixed top-0 w-full bg-white/60 backdrop-blur-md z-50 border-b '>
        <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link href='/'>
                <Image src={"/logo-1.png"}
                alt='TrexFi logo'
                width={80}
                height={200}
                className="h-8 w-auto object-contain md:h-12"
                sizes="(max-width: 767px) 40px, 80px" // It is only for optimization...
                 />
            </Link>

            <div className='flex items-center space-x-4'>
                <SignedIn>
                    {/* <Link href="/dashboard" className='text-gray-600 hover:text-blue-600 flex items-center gap-2' >
                        <Button variant="outline">
                            <LayoutDashboard size={18} />
                            <span className='hidden md:inline'>Dashboard</span>
                        </Button>
                    </Link> */}
                    <AddDashboardButton />
                    <AddTransactionButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton forceRedirectUrl='/dashboard'>
                        <Button variant="outline">Login</Button>
                    </SignInButton> 
                </SignedOut>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: 'w-10 h-10'
                            } 
                        }} 
                    />
                </SignedIn>
            </div>
        </nav>
    </div>
  )
}

export default Header
