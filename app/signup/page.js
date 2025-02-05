import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

const signup = () => {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 ">
         <Card className="w-full max-w-md shadow-xl">
           <CardHeader className="space-y-1">
             <div className="flex items-center justify-between">
               <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              
             </div>
             <CardDescription>
               Please sign in to access your account
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
           <div className="space-y-2">
               <Label htmlFor="name">Name</Label>
               <Input
               name="name"
                 id="name"
                 placeholder="Your name here"
                 type="text"
                //  autoComplete="email"
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="email">Email</Label>
               <Input
               name="email"
                 id="email"
                 placeholder="hello@example.com"
                 type="email"
                 autoComplete="email"
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="password">Password</Label>
               <Input
               name="password"
                 id="password"
                 type="password"
                 autoComplete="current-password"
                 required
               />
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-2">
                 <input
                   type="checkbox"
                   id="remember"
                   className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                 />
                 <Label htmlFor="remember" className="text-sm">Remember me</Label>
               </div>
               <Button variant="link" className="text-sm">
                 Forgot password?
               </Button>
             </div>
           </CardContent>
           <CardFooter className="flex flex-col space-y-4">
             <Button className="w-full">Sign up</Button>
             <div className="relative">
               <div className="absolute inset-0 flex items-center">
                 <span className="w-full border-t border-gray-300 dark:border-gray-600" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                 <span className="bg-card px-2 text-muted-foreground">
                   Or continue with
                 </span>
               </div>
             </div>
             <div className="flex space-x-2">
               <Button variant="outline" className="w-full">
                 <Github className="mr-2 h-4 w-4" />
                 Github
               </Button>
               <Button variant="outline" className="w-full">
                 <Twitter className="mr-2 h-4 w-4" />
                 Twitter
               </Button>
             </div>
             <p className="text-center text-sm text-gray-600 dark:text-gray-400">
               Already have an account?{' '}
               <Link href={"/login"}>

               <Button variant="link" className="text-sm">
                 Sign in
               </Button>
               </Link>
             </p>
           </CardFooter>
         </Card>
       </div>
  )
}

export default signup
