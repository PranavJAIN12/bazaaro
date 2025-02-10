"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex">
        <Input
          type="search"
          placeholder="Search for products..."
          className="w-full pl-4 pr-10 h-10 rounded-l-md border-gray-700 focus:ring-1 focus:ring-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button 
          className="rounded-l-none h-10"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};