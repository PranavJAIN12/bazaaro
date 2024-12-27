"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Category = ({ title }) => {
  return (
    <div className="border-2 p-6 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold capitalize">{title}</h2>
      <br />
      <Link href={`/products?category=${encodeURIComponent(title)}`} passHref>
        <Button variant="outline">Click Here</Button>
      </Link>
    </div>
  );
};

export default Category;
