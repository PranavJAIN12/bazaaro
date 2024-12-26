import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const PopularProd = ({ image, title, price }) => {
  return (
    <Card className="group h-[400px] w-full">
      {/* Make the CardContent a flex container with full height */}
      <CardContent className="p-6 h-full flex flex-col">
        {/* Top content section - uses flex-1 to push bottom content down */}
        <div className="flex-1">
          {/* Image container */}
          <div className="h-48 mb-4 relative overflow-hidden rounded-lg  p-4 flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              width={150}
              height={150}
              className="object-contain max-h-full transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-center line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Bottom content section - will stay at bottom */}
        <div className="mt-auto space-y-3">
          {/* Price */}
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold">
              ${parseFloat(price).toFixed(2)}
            </span>
          </div>
          
          {/* Button */}
          <Button className="w-full  transition-colors duration-300">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularProd;