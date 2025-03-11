import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/Mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { address } = await req.json();
    if (!address) {
      return NextResponse.json({ error: "Missing address" }, { status: 400 });
    }

    await dbConnect();

    // Update user instead of creating a new one
    const user = await User.findOneAndUpdate(
      { user_id: session.user.id },
      { address },
      { new: true } // Return updated user
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Address saved", address: user.address }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
