import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
// import { auth } from '@/auth'
// import { signOut } from '@/auth'

export default async function Header ()  {

  // const session = await auth(); // Get the session data
  // const user = session?.user;
  return (
    <div className='max-w-7xl mx-auto px-4 mt-5'>
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Bazaaro</h1>
          <p className="text-lg mb-6">Discover amazing products at great prices</p>
          <Link href='/'>
          <Button variant="secondary">Shop Now</Button>
          </Link>
        </div>
        {/* <div className="flex flex-col items-center gap-4">
          <div className="text-lg font-semibold">
            {user ? `Welcome, ${user.name || user.email}!` : "Hello, Guest!"}
          </div>
          {user && (
            <form action={async () => { 'use server'; await signOut(); }}>
              <button
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm h-10 px-4"
                type="submit"
              >
                Sign Out
              </button>
            </form>
          )}
        </div> */}
    </div>
  )
}


