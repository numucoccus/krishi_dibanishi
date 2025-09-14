// server/server.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // ⬅ Load .env before using it

const app = express(); // ⬅ Now app is defined
app.use(cors());
app.use(express.json());


// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));





const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized - No token provided" });
  }
};


dotenv.config();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// User Schema
const userSchema = new mongoose.Schema({
  role: { type: String, default: "Farmer" },
  name: { type: String, required: true },
  district: String,
  upazila: String,
  village: String,
  email: { type: String, required: true, unique: true },
  mobile: String,
  password: { type: String, required: true },

   profileImage: String,

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// -------------------- Registration --------------------
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ ...req.body, password: hash });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- Login --------------------


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d" // You can change expiry as needed
    });

    return res.json({
      success: true,
      message: "Login successful",
      token, // 👈 return token to frontend
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district,
        upazila: user.upazila,
        village: user.village
        // Add more fields if needed
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.put("/api/profile/update", authenticateUser, upload.single("profileImage"), async (req, res) => {
  try {
    const updates = req.body;

    if (req.file) {
      updates.profileImage = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
      runValidators: true
    }).select("-password");

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});


// -------------------- Start Server --------------------
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
