import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 mt-5'>
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Bazaaro</h1>
          <p className="text-lg mb-6">Discover amazing products at great prices</p>
          <Link href='/'>
          <Button variant="secondary">Shop Now</Button>
          </Link>
        </div>
    </div>
  )
}

export default Header
