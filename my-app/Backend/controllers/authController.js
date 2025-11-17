import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Signup/ Login Controller with password hash and JWT. 
const register = async (req, res) => {

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

    // Generate JWT
    const token = jwt.sign(
        {id: newUser._id, role: newUser.role},
        JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export default register;