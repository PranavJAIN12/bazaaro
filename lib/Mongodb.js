import mongoose from "mongoose";

let isConnected = false; // To prevent multiple connections

export async function dbConnect() {
  if (isConnected) {
    console.log("MongoDB already connected ✅");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB Connected ✅");
    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error ❌", error);
    throw new Error(error);
  }
}
