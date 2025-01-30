import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { add } from "@/redux/CartSlice";

const PopularProd = ({ image, title, price, id, product }) => {
  const dispatch = useDispatch();

  const handleCartAdd = (product) => {
    console.log("cart add btn");
    dispatch(add(product));
  };

  return (
    <Card className="group h-[400px] w-full">
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
            <span className="text-xl font-bold">
              ${parseFloat(price).toFixed(2)}
            </span>
          </div>

          {/* Button */}
          <div className="btndata flex mr-2 ml-2 pl-2 pr-2">
            <Button
              className="w-full transition-colors duration-300"
              variant="outline"
              onClick={() => handleCartAdd({ image, title, price, id })}
            >
              Add to Cart
            </Button>

            <Link href={`/products/${encodeURIComponent(id)}`}>
              <Button onClick={() => handleCartAdd(product)}>
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularProd;
