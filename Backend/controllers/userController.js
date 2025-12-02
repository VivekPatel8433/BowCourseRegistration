import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils.js/generateToken.js";

// Helper function to validate fields
const validateUserInput = ({ firstName, lastName, email, username, password, role }) => {
  const errors = [];

  // Required fields
  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!email) errors.push("Email is required.");
  if (!username) errors.push("Username is required.");
  if (!password) errors.push("Password is required.");
  if (!role) errors.push("Role is required.");

  // Email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (email && !emailRegex.test(email)) errors.push("Email is invalid.");

  // Password strength
  if (password && password.length < 6) errors.push("Password must be at least 6 characters.");

  // Role check
  const validRoles = ["student", "admin"];
  if (role && !validRoles.includes(role)) errors.push("Role must be either 'student' or 'admin'.");

 

  return errors;
};

// ---------------- REGISTER ---------------- //
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, role, studentData } = req.body;

   
    // Validate input
    const errors = validateUserInput({ firstName, lastName, email, username, password, role });
    if (errors.length > 0) return res.status(400).json({ message: errors.join(" ") });

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      role,
    });

    if (role === "student") {
      newUser.studentData = studentData;
    }

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// ---------------- LOGIN ---------------- //
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found." });

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password." });

    // Generate token
    const token = generateToken(user);

    // Set token in httpOnly cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.json({ message: "Login success", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// ---------------- GET USER BY ID ---------------- //
export const getUserById = async (req, res) => {
  try {
    const userId = req.user.id; // extracted from JWT middleware

    const user = await User.findById(userId).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ success: true, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const profileData = req.body;
    console.log({profileData})
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      profileData,
      { new: true, runValidators: true }
    ).select("-password -__v");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
