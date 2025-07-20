import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("🔍 Checking authentication...");
    console.log("📦 All cookies:", req.cookies);
    console.log("🎫 JWT token:", token ? "Present" : "Missing");
    
    if (!token) {
      console.log("❌ No JWT token found in cookies");
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("✅ Token verified, userId:", decoded.userId);

    if (!decoded) {
      console.log("❌ Invalid token structure");
      return res.status(401).json({ error: "Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log("👤 User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("❌ No user found with ID:", decoded.userId);
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    console.log("✅ Authentication successful for user:", user.fullname);
    next();
  } catch (error) {
    console.log("❌ Error in secureRoute:", error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;
