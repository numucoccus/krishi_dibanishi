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
import http from "http";
import { Server } from "socket.io";

dotenv.config(); // ⬅ Load .env before using it

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); // ✅ socket.io

app.use(cors());
app.use(express.json());

// ---------------- Multer setup ----------------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- MongoDB ----------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ---------------- User Schema ----------------
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

// ---------------- Product Schema ----------------
const productSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

// ---------------- Post Schema ----------------
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  headline: { type: String, required: true },
  content: { type: String, required: true },
  topic: { 
    type: String, 
    required: true,
    enum: ["ফসল চাষ", "মৎস্য চাষ", "প্রাণিসম্পদ", "পোল্ট্রি", "জৈব চাষ", "কৃষি প্রযুক্তি", "বাজার তথ্য", "অন্যান্য"]
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

// ---------------- Auth Middleware ----------------
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district,
        upazila: user.upazila,
        village: user.village
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- Profile --------------------
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
    if (req.file) updates.profileImage = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(req.userId, updates, { new: true, runValidators: true }).select("-password");
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});

// Change Password
app.put("/api/change-password", authenticateUser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "বর্তমান এবং নতুন পাসওয়ার্ড প্রয়োজন" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "ব্যবহারকারী পাওয়া যায়নি" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "বর্তমান পাসওয়ার্ড ভুল" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hash;
    await user.save();

    res.json({ success: true, message: "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে" });
  }
});

// -------------------- Products --------------------

// Add new product (supplier only)
app.post("/api/products", authenticateUser, upload.single("image"), async (req, res) => {
  try {
    const { title, category, price, quantity, description } = req.body;
    const newProduct = new Product({
      supplierId: req.userId,
      title,
      category,
      price,
      quantity,
      description,
      image: req.file ? req.file.filename : null
    });
    await newProduct.save();

    // Populate supplier info before emitting
    const populatedProduct = await Product.findById(newProduct._id).populate("supplierId", "name email role");

    // Emit live update to all clients
    io.emit("new-product", populatedProduct);

    res.status(201).json({ success: true, product: populatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().populate("supplierId", "name email role");
    res.json({ success: true, products: Array.isArray(products) ? products : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

// -------------------- Posts --------------------

// Create new post
app.post("/api/posts", authenticateUser, async (req, res) => {
  try {
    const { headline, content, topic } = req.body;
    
    if (!headline || !content || !topic) {
      return res.status(400).json({ success: false, message: "Headline, content, and topic are required" });
    }

    const newPost = new Post({
      userId: req.userId,
      headline,
      content,
      topic
    });
    
    await newPost.save();
    const populatedPost = await Post.findById(newPost._id).populate("userId", "name role district");
    
    // Emit real-time update
    io.emit("new-post", populatedPost);
    
    res.status(201).json({ success: true, post: populatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create post" });
  }
});

// Get all posts with filters
app.get("/api/posts", async (req, res) => {
  try {
    const { topic } = req.query;
    let filter = {};
    if (topic && topic !== "all") {
      filter.topic = topic;
    }
    
    const posts = await Post.find(filter)
      .populate("userId", "name role district")
      .sort({ createdAt: -1 });
    
    res.json({ success: true, posts: Array.isArray(posts) ? posts : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
});

// Get single post by ID
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name role district")
      .populate("comments.userId", "name role");
    
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    
    res.json({ success: true, post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch post" });
  }
});

// Like/unlike post
app.put("/api/posts/:id/like", authenticateUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const hasLiked = post.likes.includes(req.userId);
    
    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.userId.toString());
    } else {
      post.likes.push(req.userId);
    }
    
    await post.save();
    const updatedPost = await Post.findById(req.params.id)
      .populate("userId", "name role district")
      .populate("likes", "name");
    
    // Emit real-time update
    io.emit("post-updated", updatedPost);
    
    res.json({ success: true, post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update like" });
  }
});

// Add comment
app.post("/api/posts/:id/comments", authenticateUser, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    
    post.comments.push({
      userId: req.userId,
      text
    });
    
    await post.save();
    const updatedPost = await Post.findById(req.params.id)
      .populate("userId", "name role district")
      .populate("comments.userId", "name role");
    
    // Emit real-time update
    io.emit("post-updated", updatedPost);
    
    res.json({ success: true, post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add comment" });
  }
});

// Delete post (only by author)
app.delete("/api/posts/:id", authenticateUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this post" });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    // Emit real-time update
    io.emit("post-deleted", req.params.id);
    
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete post" });
  }
});

// Get user's posts
app.get("/api/users/:userId/posts", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate("userId", "name role district")
      .sort({ createdAt: -1 });
    
    res.json({ success: true, posts: Array.isArray(posts) ? posts : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch user posts" });
  }
});

// -------------------- Socket.io Connection Handling --------------------
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join-community", (userId) => {
    socket.join("community");
    console.log(`User ${userId} joined community`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// -------------------- Health Check --------------------
app.get("/api/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  });
});

// -------------------- Start Server --------------------
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.io ready for real-time updates`);
  console.log(`🌍 Community features enabled`);
});