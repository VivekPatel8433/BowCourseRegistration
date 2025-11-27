import mongoose from "mongoose";

// Subdocument for responses
const responseSchema = new mongoose.Schema(
  {
    adminId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,},
    responseText: { type: String, required: true, },
    responseDate: { type: Date, default: Date.now,},
  },
  { _id: false }
);

const studentMessageSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,},
    email: String,
    subject: String,
    message: String,
    category: String,
    priority: {type: String,default: "normal" },
    status: { type: String,default: "unread" },
    submissionDate: { type: Date, default: Date.now},
    attachments: [String],
    // multiple admin responses
    responses: [responseSchema],
  },
  { timestamps: true }
);

const StudentMessage = mongoose.model("StudentMessage", studentMessageSchema);

export default StudentMessage;