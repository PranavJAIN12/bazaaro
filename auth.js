import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import { dbConnect } from "./lib/mongodb";
import User from "./models/user";
import { dbConnect } from "./lib/Mongodb";

console.log("🔥 auth.js is executing...");

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) throw new Error("Invalid email or password");

          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions);
