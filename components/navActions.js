"use client";
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSelector } from 'react-redux';
// import { signOut } from '@/auth';
import { ModeToggle } from './theme-btn';

export const NavActions = ({ user }) => {
  const item = useSelector((state) => state.cart);

  return (
    <div className="flex items-center space-x-4">
      <Link href="/cart" className="relative">
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {item.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {item.length}
            </span>
          )}
        </Button>
      </Link>

      
      
      <ModeToggle />
    </div>
  );
};
