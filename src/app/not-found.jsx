export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[100vh] px-4 text-center'>
      <h1 className='text-6xl font-bold gradient-title mb-4'>404</h1>
      <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
      <p className='text-gray-600 mb-8'>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href={"/"}>
            <Button>Return Home</Button>
      </Link>
    </div>
  )
}

export default NotFound

/*
🟢 So why can't not-found be '○' instead of 'ƒ'?
==> Because Next.js doesn't know at build time which URLs users will mistype or guess. It can't pre-render /asdfjkl or /foo/bar/baz ahead of time — there are infinite possibilities. So it keeps the 404 page dynamic and renders it fresh whenever an unmatched route is hit.
*/