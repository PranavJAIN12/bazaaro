"use client";
import { Menu, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-black text-white">
          <div className="flex flex-col space-y-4 mt-8">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 bg-gray-900 text-white border-gray-700 focus:ring-1 focus:ring-gray-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};