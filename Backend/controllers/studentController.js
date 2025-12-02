import { Enrollment, Course, Program } from "../models/AdminModel.js";
import StudentMessage from "../models/StudentMessage.js";
import mongoose from "mongoose";
export const getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.user.id;
     console.log("fetching enrolment courses",studentId)
    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId")
      .populate("programId");
     //console.log({enrollments})
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courseId = req.params.id;
    console.log({courseId})
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

      // Check if course is full
    const totalEnrollments = await Enrollment.countDocuments({ courseId });
    if (totalEnrollments >= 5) {
      return res.status(400).json({ message: "Course is full (max 5 students)" });
    }

    const newEnrollment = new Enrollment({
      studentId,
      courseId,
      programId: course.programId,
    });

    await newEnrollment.save();

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const dropCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courseId = req.params.id;
   console.log({studentId,courseId})
    await Enrollment.findOneAndDelete({ studentId, courseId });

    res.status(200).json({ message: "Course dropped" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const addStudentMessage = async (req, res) => {
  try {
    // Only extract the fields you want from request body
    const { subject, message, attachments } = req.body;
     const studentId=req.user.id;
     console.log("student id from cooki",studentId)
    // Create new StudentMessage with only required/default fields
    const newMessage = new StudentMessage({
      studentId,
      subject,
      message,
      attachments: attachments || [],
      status: "unread",             
      submissionDate: new Date(),  
      responses: [],               
    });

    // Save to DB
    await newMessage.save();

    res.status(201).json({
      message: "Message saved successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error adding student message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStudentMessages = async (req, res) => {
  try {
    const messages = await StudentMessage.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "studentId",
        select: "firstName lastName email username studentData"
      });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const msgId = req.params.id;
  console.log({msgId})
    // Delete message by ID
    const result = await StudentMessage.deleteOne({ _id: msgId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const responseMessage = async (req, res) => {
  try {
    const msgId = req.params.id;
    const { response } = req.body || {}; // <-- default to empty object
    const adminId = req.user.id; // admin id from auth middleware

    // Build update object dynamically
    const update = { $set: { status: "read" } };

    if (response) {
      // Wrap string into object matching the responseSchema
      update.$push = {
        responses: {
          adminId: new mongoose.Types.ObjectId(adminId),
          responseText: response,
          responseDate: new Date(),
        },
      };
    }

    const result = await StudentMessage.updateOne({ _id: msgId }, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({
      message: response
        ? "Message marked as read and response added"
        : "Message marked as read",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};