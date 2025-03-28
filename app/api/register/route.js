import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";

import bcrypt from "bcryptjs"
import { dbConnect } from "@/lib/Mongodb";

export const POST = async (request) => {
    const {name,email,password} = await request.json();
    console.log(name, email, password);


    await dbConnect();
    const hashedPassword = await bcrypt.hash(password,5)

    const newUser = {
        name,
        password: hashedPassword,
        email
      }

      try {
        await createUser(newUser)
      } catch (error) {
        return new NextResponse(error.mesage, {
            status: 500,
          });
      }

    return new NextResponse("User has been created", {
        status: 201,
      });
}