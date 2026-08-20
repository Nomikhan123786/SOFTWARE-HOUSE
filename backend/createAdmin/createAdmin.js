import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import dns from "dns";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

(async () => {
  await connectDB();
  const email = (process.env.ADMIN_EMAIL || "admin@gmail.com").toLowerCase();

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
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
})();
