import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // Common
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

    // Student specific
  role: {type: String, enum: ['student', 'admin'], required: true},
  studentData: {
    phoneNumber: String,
    birthday: Date,
    department: String,
    program: String
  },
  createdAt: { type: Date, default: Date.now }
})

export default userSchema;