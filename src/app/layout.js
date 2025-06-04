import {Inter} from 'next/font/google'
import "./globals.css";
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: "TrexFi",
  description: "One stop Finance Platform",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
        >
        <Header />
        <main className='min-h-screen'>{children}</main>
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
