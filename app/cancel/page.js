import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const cancel = () => {
  return (
    <div  className='w-full m-auto text-center my-8'>
      <h1>Order not placed</h1>
      <Link href={'/'}>

      <Button>Back to Home page</Button>
      </Link>
    </div>
  )
}

export default cancel
