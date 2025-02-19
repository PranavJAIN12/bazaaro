// cart/page.js
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { remove, increaseQuantity, decreaseQuantity } from "@/redux/CartSlice";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

// Store the promise outside the component to avoid recreating it on each render
const stripePromise = loadStripe('pk_test_51QA76WJoWb85sJGHtXw2wOSeixOmwmGD3U6naA3KBwsQnsEAE40KZcXwiIfYtql3AUWueEZPMx8hs4xsFR7LTWsX00SBOIrPtr');
// console.log("Stripe key available:", !!process.env.STRIPE_PUBLISHABLE_KEY);
// console.log("Stripe key type:", typeof process.env.STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  const totalPrice = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    try {
     
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to initialize");
        alert("Payment system is unavailable. Please try again later.");
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItem }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Checkout error:", errorData);
        alert("Checkout failed: " + (errorData.error || "Unknown error"));
        return;
      }
  
      const { sessionId } = await res.json();
  
      if (sessionId) {
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.error("Redirect to checkout failed:", result.error);
          alert(`Payment Error: ${result.error.message}`);
        }
      }
    } catch (error) {
      console.error("Checkout process failed:", error);
      alert("Checkout process failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-10 flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItem.length === 0 ? (
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="w-24 h-24 text-slate-300 animate-pulse" strokeWidth={1} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Your cart is empty</h2>
          <p className="text-slate-500">Looks like you havent added anything yet. Start shopping to fill it up!</p>
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
                  <Image src={item.image} alt={item.title} height={"70"} width={"70"} className="object-cover rounded-md" />
                  <div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <Button size="icon" variant="outline" onClick={() => dispatch(decreaseQuantity(item.id))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button size="icon" variant="outline" onClick={() => dispatch(increaseQuantity(item.id))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Remove Item */}
                <Button variant="destructive" size="icon" onClick={() => dispatch(remove(item.id))}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold">
              Total: ${totalPrice}
            </p>
            <Button className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-md" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;