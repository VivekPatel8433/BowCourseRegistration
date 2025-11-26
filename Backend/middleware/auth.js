import jwt from "jsonwebtoken";
import config from "../config/tokenConfig.js";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ error: "Unauthorized" });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user; // <-- Attach decoded token payload
    console.log({ user });
    next();
  });
};

export const adminAuth = (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(403).json({ error: "Unauthorized" });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    // Attach decoded token to request
    req.user = user;
    // console.log("admin",{user})
    // Check role
    if (user.userType !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    console.log({ user });
    next();
  });
};
