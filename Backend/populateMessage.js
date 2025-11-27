import mongoose from "mongoose";
import StudentMessage from "./models/StudentMessage.js";

const studentMessages = {
  messages: [
    {
      _id: "67901a111aaa111111111111",
      studentId: "67901b111aaa111111111111",
      email: "alice.j@student.ca",
      subject: "Login Issue",
      message: "I can't access my student portal.",
      category: "technical",
      priority: "high",
      status: "unread",
      submissionDate: "2025-02-01T10:20:00",
      attachments: [],
      responses: [
        {
          adminId: "65f9d5147c1b8a35bc111111",
          responseText: "Reset completed. Try logging in again.",
          responseDate: "2025-02-01T11:00:00Z"
        }
      ]
    },
    {
      _id: "67901a222aaa111111111111",
      studentId: "67901b222aaa111111111111",
      email: "brian.smith@student.ca",
      subject: "Grade Inquiry - SODV1202",
      message: "My grade might be incorrect.",
      category: "academic",
      priority: "medium",
      status: "unread",
      submissionDate: "2025-02-01T12:45:00",
      attachments: ["grade_sheet.pdf"],
      responses: [
        {
          adminId: "65f9d5147c1b8a35bc222222",
          responseText: "You are correct. Grade updated to A-.",
          responseDate: "2025-02-01T14:20:00Z"
        }
      ]
    },
    {
      _id: "67901a333aaa111111111111",
      studentId: "67901b333aaa111111111111",
      email: "carla.m@student.ca",
      subject: "Assignment Extension",
      message: "Requesting extension for assignment 3.",
      category: "academic",
      priority: "low",
      status: "unread",
      submissionDate: "2025-02-02T08:30:00",
      attachments: [],
      responses: []
    },
    {
      _id: "67901a444aaa111111111111",
      studentId: "67901b444aaa111111111111",
      email: "david.c@student.ca",
      subject: "WiFi Access",
      message: "School WiFi not connecting.",
      category: "technical",
      priority: "medium",
      status: "unread",
      submissionDate: "2025-02-02T09:50:00",
      attachments: [],
      responses: [
        {
          adminId: "65f9d5147c1b8a35bc111111",
          responseText: "Issue resolved. Network rebooted.",
          responseDate: "2025-02-02T10:15:00Z"
        }
      ]
    },
    {
      _id: "67901a555aaa111111111111",
      studentId: "67901b555aaa111111111111",
      email: "emma.w@student.ca",
      subject: "Missing Grade",
      message: "Grade for Lab 2 is missing.",
      category: "academic",
      priority: "high",
      status: "unread",
      submissionDate: "2025-02-02T11:30:00",
      attachments: [],
      responses: []
    },
    {
      _id: "67901a666aaa111111111111",
      studentId: "67901b666aaa111111111111",
      email: "farah.a@student.ca",
      subject: "Account Locked",
      message: "My school account is locked.",
      category: "technical",
      priority: "high",
      status: "unread",
      submissionDate: "2025-02-02T12:00:00",
      attachments: [],
      responses: [
        {
          adminId: "65f9d5147c1b8a35bc222222",
          responseText: "Account unlocked.",
          responseDate: "2025-02-02T12:40:00Z"
        }
      ]
    },
    {
      _id: "67901a777aaa111111111111",
      studentId: "67901b777aaa111111111111",
      email: "george.l@student.ca",
      subject: "Transcript Request",
      message: "Need an official transcript.",
      category: "administrative",
      priority: "medium",
      status: "unread",
      submissionDate: "2025-02-03T08:15:00",
      attachments: [],
      responses: []
    },
    {
      _id: "67901a888aaa111111111111",
      studentId: "67901b888aaa111111111111",
      email: "helen.p@student.ca",
      subject: "Software License",
      message: "Adobe license expired.",
      category: "technical",
      priority: "low",
      status: "unread",
      submissionDate: "2025-02-03T10:30:00",
      attachments: [],
      responses: [
        {
          adminId: "65f9d5147c1b8a35bc111111",
          responseText: "License renewed.",
          responseDate: "2025-02-03T11:00:00Z"
        }
      ]
    },
    {
      _id: "67901a999aaa111111111111",
      studentId: "67901b999aaa111111111111",
      email: "ian.b@student.ca",
      subject: "Email Help",
      message: "Can't send emails from student account.",
      category: "technical",
      priority: "medium",
      status: "unread",
      submissionDate: "2025-02-03T14:00:00",
      attachments: [],
      responses: []
    },
    {
      _id: "67901aaaaaaa111111111111",
      studentId: "67901baaaaaa111111111111", // Fixed: Changed to 24 characters
      email: "julia.m@student.ca",
      subject: "Password Reset",
      message: "Forgot password.",
      category: "technical",
      priority: "high",
      status: "unread",
      submissionDate: "2025-02-03T16:00:00",
      attachments: [],
      responses: [
        {
          adminId: "65f9d5147c1b8a35bc222222",
          responseText: "Password reset email sent.",
          responseDate: "2025-02-03T16:10:00Z"
        }
      ]
    }
  ]
};

export async function seedStudentMessages() {
  try {
    const formattedMessages = studentMessages.messages.map(msg => ({
      ...msg,
      _id: new mongoose.Types.ObjectId(msg._id),
      studentId: new mongoose.Types.ObjectId(msg.studentId),
      submissionDate: new Date(msg.submissionDate),
      responses: msg.responses.map(res => ({
        adminId: new mongoose.Types.ObjectId(res.adminId),
        responseText: res.responseText,
        responseDate: new Date(res.responseDate)
      }))
    }));

    await StudentMessage.deleteMany({}); // Clear old messages
    await StudentMessage.insertMany(formattedMessages);

    console.log("All 10 student messages seeded successfully with 'unread' status!");
  } catch (error) {
    console.error("Error seeding student messages:", error);
    console.error("Problematic ID might be:", error.message);
  }
}