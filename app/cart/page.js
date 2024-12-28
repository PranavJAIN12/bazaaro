"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-1 mt-0">
      <div className="text-center space-y-1 max-w-md mx-auto">
        {/* Shopping Bag Icon Animation */}
        <div className="relative w-40 h-40 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag 
              className="w-24 h-24 text-slate-200 animate-pulse" 
              strokeWidth={1}
            />
          </div>
          
         
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            Your cart is empty
          </h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            Looks like you havent added anything to your cart yet. Start shopping to fill it with amazing products!
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <Link href="/">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-full">
              Start Shopping
            </Button>
          </Link>
        </div>

        {/* Additional Options */}
        <div className="pt-8 space-y-2 text-sm">
          <p className="text-slate-500">
            Have an account? <Link href="/login" className="text-slate-900 underline underline-offset-2">Sign in</Link> to see your saved items
          </p>
          <p className="text-slate-500">
            Need help? <Link href="/support" className="text-slate-900 underline underline-offset-2">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;