import mongoose from "mongoose";

const studentMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

const StudentMessage = mongoose.model("StudentMessage", studentMessageSchema);

export default StudentMessage;
