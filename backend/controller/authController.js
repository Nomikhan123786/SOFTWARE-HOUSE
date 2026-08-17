import jwt from "jsonwebtoken";
import User from "../models/User";

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  //Normal user register
  const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email and password are required" });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res
          .status(400)
          .json({ message: "An account with this email already exist " });
      }
      const user = await User.create({
        name,
        email,
        password,
        role: "user",
      });
      const token = signToken(user);
      res.status(201).json({ token, user: user.toSafeObject() });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Registration failed", err: err.message });
    }
  };
};
