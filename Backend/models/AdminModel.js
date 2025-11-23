import mongoose from "mongoose";

// Program Schema
const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  terms: [{ type: String }],
  active: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  fees: {
    domestic: { type: Number, default: 0 },
    international: { type: Number, default: 0 }
  },
  department: { 
    type: String, 
    default: "Software Development",
    enum: ["Software Development"]
  },
  totalEnrolledStudents: { type: Number, default: 0 }
}, { timestamps: true });

// Course Schema
const courseSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  credit: { type: Number, required: true },
  terms: [{ type: String }],
  maxStudents: { type: Number, required: true },
  status: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date },
  schedule: { type: String },
  fees: {
    domestic: { type: Number, default: 0 },
    international: { type: Number, default: 0 }
  },
  totalEnrollment: { type: Number, default: 0 },
  prerequisites: [{ type: String }] // <-- Add this
}, { timestamps: true });

// Enrollment Schema
const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  enrolledAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Models (SAFE VERSIONS)
const Program = mongoose.models.Program || mongoose.model("Program", programSchema);
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export { Program, Course, Enrollment };
