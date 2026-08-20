import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import projectRoute from "./routes/projectRoute.js";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://software-house-kappa.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
