"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddressForm() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:3000/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }), // Fix: Send object, not string
      });

      const data = await response.json(); // Fix: Use `await response.json()`

      if (response.ok) {
        alert(data.message);
        setAddress(""); // Fix: Reset correctly
      } else {
        alert(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Can't save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Enter Your Address</h2>
      <Input
        name="address"
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button className="mt-3" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Address"}
      </Button>
    </div>
  );
}
