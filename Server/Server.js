const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
const authRoutes = require("./Src/Routes/userRoutes");

// Import error handler middleware
const errorHandler = require("./Src/Utils/errorHandler");

// Load environment variables
dotenv.config();

// Initialize Express app
const Server = express();

// Middleware
Server.use(express.json()); // Parse JSON requests
Server.use(express.urlencoded({ extended: false })); // Parse URL Encoded requests
Server.use(cookieParser()); // Handle cookies
Server.use(
  cors({
    origin: "http://localhost:5173", // ✅ Specific frontend origin
    credentials: true, // ✅ Allow cookies
  })
);
// Enable CORS

// Routes
Server.use("/api/v1/user/", authRoutes);

// Default route
Server.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handler
Server.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
Server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
