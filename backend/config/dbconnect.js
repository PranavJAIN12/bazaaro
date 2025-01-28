import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Please define the MONGO_URI environment variable.");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export const dbconnect = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((conn) => conn);
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
