import { Enrollment, Course, Program } from "../models/AdminData.js";
import StudentMessage from "../models/StudentMessage.js";

export const getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId")
      .populate("programId");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const newEnrollment = new Enrollment({
      studentId,
      courseId,
      programId: course.programId,
    });

    await newEnrollment.save();

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const dropCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courseId = req.params.id;

    await Enrollment.findOneAndDelete({ studentId, courseId });

    res.status(200).json({ message: "Course dropped" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addStudentMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const msg = new StudentMessage({ name, email, message });
    await msg.save();

    res.status(201).json({
      message: "Message saved successfully",
      data: msg,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStudentMessages = async (req, res) => {
  try {
    const messages = await StudentMessage.find().sort({ createdAt: -0 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
