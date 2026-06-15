import {Inter} from 'next/font/google'
import "./globals.css";
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

export const dynamic = 'force-dynamic';

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: "TrexFi",
  description: "One stop Finance Platform",
  manifest: "/site.webmanifest",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>     {/* 👈 THIS is making everything dynamic */}
    <html lang="en">
      <body className={`${inter.className}`} >
        <Header />
        <main className='min-h-screen'>
          {children}
        </main>

        <Toaster richColors />
        
        <footer className='bg-blue-100 py-12'>
          <div className='container mx-auto px-4 text-center text-gray-600'>
            <p>Designed and Developed with &#128420; </p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}



/*
NOTES: 
💠 ClerkProvider reads cookies and request headers on every request to check the user's auth state (logged in / logged out). This is a dynamic operation.

💠 Next.js works on a "if the layout is dynamic, all children are dynamic" rule.

💠 For an auth-based app. Clerk needs to know per-request who the user is, so it can:
    * Show different UI in <Header /> (logged in vs logged out)
    * Protect routes
    * Provide auth() / currentUser() in server components
*/

