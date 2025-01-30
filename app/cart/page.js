"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/redux/CartSlice";
import Image from "next/image";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen py-10 flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItem.length === 0 ? (
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="w-24 h-24 text-slate-300 animate-pulse" strokeWidth={1} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Your cart is empty</h2>
          <p className="text-slate-500">Looks like you haven’t added anything yet. Start shopping to fill it up!</p>
          <Link href="/">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            {cartItem.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <Image src={item.image} alt={item.title} height={"70"} width={"70"}  className=" object-cover rounded-md" />
                  <div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => dispatch(remove(item.id))}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold">Total: ${cartItem.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
            <Button className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-md">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
