import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const success = () => {
  return (
    <div className='w-full m-auto text-center my-8'>
      <h1 >Order placed successfully</h1>
      <Link href={'/'}>

      <Button>Back to Home page</Button>
      </Link>
    </div>
  )
}

export default success

