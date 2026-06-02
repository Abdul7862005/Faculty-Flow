const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 1. IMPORT YOUR MODELS FIRST
const Profile = require("./models/Profile.js"); 
console.log("DEBUG: Is Profile a function?", typeof Profile.findOneAndUpdate === 'function');
console.log("DEBUG: What is Profile?", Profile);
const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://faculty-flow-frontend.onrender.com"], // Allow both local and production
  credentials: true
}));
app.use(express.json());

// Health check / root route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Faculty Flow backend is up and running' });
});

// Routes Links
const authRoutes = require("./routes/authRoutes"); 
const marksRoutes = require("./routes/marksRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

// 2. DEFINE PROFILE ROUTES CLEARLY
app.get("/api/profile", async (req, res) => {
  try {
    const profile = await Profile.findOne(); 
    res.json({ success: true, data: profile || { skills: [] } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
app.post("/api/profile/update", async (req, res) => {
  try {
    const { skills } = req.body;
    console.log("Saving skills to DB:", skills); // Check terminal
    
    // Test: try finding and replacing the document
    const updatedProfile = await Profile.findOneAndUpdate(
      {}, 
      { $set: { skills: skills } }, // Use $set explicitly
      { upsert: true, new: true, runValidators: true }
    );
    
    res.json({ success: true, data: updatedProfile });
  } catch (err) {
    console.error("CRITICAL BACKEND ERROR:", err); // CHECK TERMINAL FOR THIS
    res.status(500).json({ success: false, error: err.message });
  }
});


// 3. MOUNT OTHER ROUTES
app.use("/api/auth", authRoutes); 
app.use("/api/marks", marksRoutes); 
app.use("/api/leave", leaveRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("DB Connection Error:", err));

const PORT = 5001; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});