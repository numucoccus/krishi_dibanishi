// server/server.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 1) Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// 2) User schema (keep extra fields optional)
const userSchema = new mongoose.Schema({
  role: { type: String, default: "Farmer" },
  name: { type: String, required: true },
  district: String,
  upazila: String,
  village: String,
  email: { type: String, required: true, unique: true },
  mobile: String,
  password: { type: String, required: true },
  // role-specific
  farmingTypes: [String],
  farmSize: String,
  organization: String,
  expertise: String,
  experience: String,
  areaOfResponsibility: String,
  startupName: String,
  idea: String,
  supplyProducts: String,
  companyName: String,
  investmentSector: String,
  investmentAmount: String,
  agreedToTerms: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema);

// 3) Registration route
app.post("/api/register", async (req, res) => {
  try {
    const data = req.body;
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ ...data, password: hash });
    await user.save();

    return res.status(201).json({
      message: "User created",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(400).json({ message: "Email already exists" });
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
