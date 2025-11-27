import mongoose from "mongoose";
import { Program } from "./models/AdminModel.js";
// Array of programs to populate
const programs = [
  {
    name: "Diploma",
    code: "DIP",
    description: "Comprehensive program covering Full-Stack Development, Databases, and Software Engineering Principles.",
    duration: 2, // could use years as number
    terms: ["Fall", "Winter", "Summer"],
    totalEnrolledStudents: 89,
    active: true,
    startDate: new Date("2024-09-01"),
    endDate: new Date("2026-06-30"),
    fees: {
      domestic: 9254,
      international: 27735
    },
    department: "Software Development"
  },
  {
    name: "Post-Diploma",
    code: "PDP",
    description: "1-year incentive program for career advancement in software development and emerging methodologies.",
    duration: 1,
    terms: ["Fall", "Winter", "Summer"],
    totalEnrolledStudents: 45,
    active: true,
    startDate: new Date("2024-09-01"),
    endDate: new Date("2025-06-30"),
    fees: {
      domestic: 7895,
      international: 23675
    },
    department: "Software Development"
  },
  {
    name: "Certificate Program",
    code: "CERT",
    description: "6-month focused program covering essential programming skills and web development fundamentals.",
    duration: 0.5,
    terms: ["Fall", "Winter", "Summer"],
    totalEnrolledStudents: 22,
    active: true,
    startDate: new Date("2024-09-01"),
    endDate: new Date("2025-03-31"),
    fees: {
      domestic: 4500,
      international: 12000
    },
    department: "Software Development"
  }
];

// Seed function
export const seedPrograms = async () => {
  try {
    // Optional: Remove existing programs first
    await Program.deleteMany({});
    console.log("Existing programs removed.");

    // Insert new programs
    const created = await Program.insertMany(programs);
    console.log("Programs seeded successfully:", created);

    process.exit(); // Exit after seeding
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};


