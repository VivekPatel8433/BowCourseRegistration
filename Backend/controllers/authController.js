import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import generateToken from "../utils.js/generateToken.js";


// Signup/ Login Controller with password hash and JWT. 
export const register = async (req, res) => {

    try {
       const { firstName, lastName, email, username, password, role, studentData } = req.body;
 
       if (!email || !password || !role) {
       return res.status(400).json({message: "Please provide all required fields"})
      }

      // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

     const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
          firstName,
          lastName,
          email,
          username,
          password: hashedPassword,
          role
    })

       // Add studentData only if role is student
    if (role === "student" && studentData) {
      newUser.studentData = studentData;
    }

    // Save User
    await newUser.save();
    res.status(201).json({ message: "User registered successfully",  });

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token for the authenticated user
      const token= generateToken(user);
    
      // Set the token in a cookie with httpOnly option for security
     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ message: "Login success", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const userId = req.user.id; // already decoded from JWT by middleware from cookie for profile data
    console.log("Fetching user:", userId);

    const user = await User.findById(userId).select("-password -__v"); // exclude sensitive info
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   console.log({user});
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
