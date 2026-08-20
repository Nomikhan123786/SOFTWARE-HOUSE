import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db";
import User from "../models/User";

async () => {
  await connectDB();
  const email = (
    process.env.ADMIN_EMAIL || "admin@gmail.com"
  ).toLocaleLowerCase();
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists", email);
    process.exist(0);
  }
  const admin = await User.create({
    name: process.env.ADMIN_NAME || "Super Admin",
    email,
    password: process.env.ADMIN_PASSWORD || "Admin@12345",
    role: "admin",
  });
  console.log("Admin account created:");
  console.log("  Email:", admin.email);
  console.log("  Password:", process.env.ADMIN_PASSWORD || "Admin@12345");
  console.log("  (change this password after first login)");

  await mongoose.disconnect();
  process.exit(0);
};
