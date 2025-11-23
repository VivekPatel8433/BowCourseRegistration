// scripts/populateCourses.js
import mongoose from 'mongoose';
import { Course, Program } from './models/AdminModel.js';
import User from './models/user.js'

// Sample course data from your SQL export
const courseData = [
  {
    id: 1, instructorId: 1, programId: 1, code: "SODV1201", 
    name: "Intro to Programming", 
    description: "Fundamental programming concepts and logic", 
    credit: 3, maxStudents: 60, status: true, 
    startDate: "2025-01-06", endDate: "2025-04-15", 
    schedule: "Mon, Wed 10:00-11:30",
    terms: ["Winter 2025"]
  },
  {
    id: 2, instructorId: 2, programId: 1, code: "SODV1202", 
    name: "Database Fundamentals", 
    description: "Introduction to database design and SQL", 
    credit: 3, maxStudents: 45, status: true, 
    startDate: "2025-01-06", endDate: "2025-04-15", 
    schedule: "Tue, Thu 13:00-14:30",
    terms: ["Winter 2025"]
  },
  {
    id: 3, instructorId: 3, programId: 1, code: "SODV1203", 
    name: "Web Development Fundamentals", 
    description: "HTML, CSS, and JavaScript for web development", 
    credit: 4, maxStudents: 50, status: true, 
    startDate: "2025-01-06", endDate: "2025-04-15", 
    schedule: "Mon, Wed, Fri 09:00-10:30",
    terms: ["Winter 2025"]
  },
  {
    id: 4, instructorId: 1, programId: 1, code: "SODV1204", 
    name: "Object-Oriented Programming", 
    description: "Advanced OOP concepts and design patterns", 
    credit: 3, maxStudents: 45, status: true, 
    startDate: "2025-05-06", endDate: "2025-08-15", 
    schedule: "Tue, Thu 10:00-11:30",
    terms: ["Spring 2025"]
  },
  {
    id: 5, instructorId: 2, programId: 1, code: "SODV1205", 
    name: "Data Structures & Algorithms", 
    description: "Fundamental data structures and algorithm analysis", 
    credit: 4, maxStudents: 40, status: true, 
    startDate: "2025-05-06", endDate: "2025-08-15", 
    schedule: "Mon, Wed, Fri 13:00-14:30",
    terms: ["Spring 2025"]
  },
  {
    id: 6, instructorId: 3, programId: 1, code: "SODV1206", 
    name: "Full-Stack Development", 
    description: "Complete web application development with modern frameworks", 
    credit: 4, maxStudents: 35, status: true, 
    startDate: "2025-09-06", endDate: "2025-12-15", 
    schedule: "Tue, Thu 14:00-16:30",
    terms: ["Fall 2025"]
  },
  {
    id: 7, instructorId: 1, programId: 1, code: "SODV1207", 
    name: "Software Engineering Principles", 
    description: "Software development methodologies and best practices", 
    credit: 3, maxStudents: 50, status: true, 
    startDate: "2026-01-06", endDate: "2026-04-15", 
    schedule: "Mon, Wed 11:00-12:30",
    terms: ["Winter 2026"]
  },
  {
    id: 8, instructorId: 2, programId: 1, code: "SODV1208", 
    name: "Capstone Project", 
    description: "Final project demonstrating comprehensive software development skills", 
    credit: 6, maxStudents: 30, status: true, 
    startDate: "2026-05-06", endDate: "2026-08-15", 
    schedule: "Flexible",
    terms: ["Spring 2026"]
  },
  {
    id: 9, instructorId: 3, programId: 2, code: "SODV2201", 
    name: "Advanced Web Technologies", 
    description: "Modern web frameworks and cloud technologies", 
    credit: 4, maxStudents: 35, status: true, 
    startDate: "2025-01-06", endDate: "2025-04-15", 
    schedule: "Mon, Wed 14:00-16:00",
    terms: ["Winter 2025"]
  },
  {
    id: 10, instructorId: 1, programId: 2, code: "SODV2202", 
    name: "Mobile App Development", 
    description: "Cross-platform mobile application development", 
    credit: 4, maxStudents: 40, status: true, 
    startDate: "2025-01-06", endDate: "2025-04-15", 
    schedule: "Tue, Thu 09:00-11:00",
    terms: ["Winter 2025"]
  },
  {
    id: 11, instructorId: 2, programId: 2, code: "SODV2203", 
    name: "Cloud Computing & DevOps", 
    description: "Cloud infrastructure and DevOps practices", 
    credit: 4, maxStudents: 30, status: true, 
    startDate: "2025-05-06", endDate: "2025-08-15", 
    schedule: "Mon, Wed, Fri 10:00-11:30",
    terms: ["Spring 2025"]
  },
  {
    id: 12, instructorId: 3, programId: 2, code: "SODV2204", 
    name: "Machine Learning Fundamentals", 
    description: "Introduction to ML algorithms and applications", 
    credit: 4, maxStudents: 30, status: true, 
    startDate: "2025-05-06", endDate: "2025-08-15", 
    schedule: "Tue, Thu 13:00-15:00",
    terms: ["Spring 2025"]
  },
  {
    id: 13, instructorId: 1, programId: 2, code: "SODV2205", 
    name: "Software Architecture", 
    description: "Design and implementation of scalable software systems", 
    credit: 3, maxStudents: 25, status: true, 
    startDate: "2025-09-06", endDate: "2025-12-15", 
    schedule: "Mon, Wed 16:00-17:30",
    terms: ["Fall 2025"]
  },
  {
    id: 14, instructorId: 2, programId: 2, code: "SODV2206", 
    name: "Advanced Project Management", 
    description: "Agile methodologies and project leadership", 
    credit: 3, maxStudents: 25, status: true, 
    startDate: "2025-09-06", endDate: "2025-12-15", 
    schedule: "Tue, Thu 11:00-12:30",
    terms: ["Fall 2025"]
  },
  {
    id: 15, instructorId: 1, programId: 3, code: "SODV3101", 
    name: "Programming Essentials", 
    description: "Rapid introduction to programming concepts", 
    credit: 3, maxStudents: 25, status: true, 
    startDate: "2025-06-01", endDate: "2025-08-15", 
    schedule: "Mon, Wed, Fri 09:00-10:30",
    terms: ["Summer 2025"]
  },
  {
    id: 17, instructorId: 2, programId: 3, code: "SODV3103", 
    name: "Database Applications", 
    description: "Practical database implementation and management", 
    credit: 3, maxStudents: 20, status: true, 
    startDate: "2025-09-01", endDate: "2025-11-15", 
    schedule: "Mon, Wed 18:00-19:30",
    terms: ["Fall 2025"]
  },
  {
    id: 20, instructorId: null, programId: 1, code: "TC0123", 
    name: "Test Course", 
    description: "This is a test course", 
    credit: 3, maxStudents: 30, status: true, 
    startDate: "2025-11-30", endDate: "2026-01-21", 
    schedule: "",
    terms: ["Winter 2026"]
  },
  {
    id: 21, instructorId: null, programId: 2, code: "CS0456", 
    name: "Advanced Algorithms", 
    description: "Advanced topics in algorithms and data structures, including practical coding exercises and project work.", 
    credit: 4, maxStudents: 40, status: true, 
    startDate: "2025-09-10", endDate: "2026-04-15", 
    schedule: "Mon/Wed 10:00-12:00",
    terms: ["Fall 2025", "Winter 2026"]
  }
];

export default async function populateCourses() {
  try {
   
    // First, let's check if we have the required programs
    const programs = await Program.find();
    console.log('Available programs:', programs.map(p => ({ id: p._id, name: p.name })));

    // Check if we have instructors
    const instructors = await User.find({ role: 'instructor' });
    console.log('Available instructors:', instructors.map(i => ({ id: i._id, name: `${i.firstName} ${i.lastName}` })));

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Create courses
    const createdCourses = [];
    
    for (const course of courseData) {
      // Find the actual program ObjectId
      let programId;
      if (course.programId === 1) {
        const program = await Program.findOne({ code: 'SD1' }); // Adjust based on your program codes
        programId = program?._id;
      } else if (course.programId === 2) {
        const program = await Program.findOne({ code: 'SD2' }); // Adjust based on your program codes
        programId = program?._id;
      } else if (course.programId === 3) {
        const program = await Program.findOne({ code: 'SD3' }); // Adjust based on your program codes
        programId = program?._id;
      }

      if (!programId) {
        console.warn(`Program not found for course ${course.code}, using first available program`);
        const firstProgram = await Program.findOne();
        programId = firstProgram?._id;
      }

      // Find instructor ObjectId if specified
      let instructorId = null;
      if (course.instructorId) {
        // Map SQL instructor IDs to actual MongoDB User IDs
        // You might need to adjust this based on your actual instructor data
        const instructorIndex = (course.instructorId - 1) % instructors.length;
        instructorId = instructors[instructorIndex]?._id;
      }

      const courseDoc = new Course({
        instructorId,
        programId,
        code: course.code,
        name: course.name,
        description: course.description,
        credit: course.credit,
        terms: course.terms,
        maxStudents: course.maxStudents,
        status: course.status,
        startDate: new Date(course.startDate),
        endDate: new Date(course.endDate),
        schedule: course.schedule,
        fees: {
          domestic: 0, // Set default fees
          international: 0
        },
        totalEnrollment: 0
      });

      const savedCourse = await courseDoc.save();
      createdCourses.push(savedCourse);
      console.log(`Created course: ${savedCourse.code} - ${savedCourse.name}`);
    }

    console.log(`Successfully created ${createdCourses.length} courses`);
    
    // Display summary
    const courseSummary = await Course.aggregate([
      {
        $group: {
          _id: '$programId',
          count: { $sum: 1 },
          courses: { $push: '$code' }
        }
      },
      {
        $lookup: {
          from: 'programs',
          localField: '_id',
          foreignField: '_id',
          as: 'program'
        }
      },
      {
        $unwind: '$program'
      }
    ]);

    console.log('\nCourse Population Summary:');
    courseSummary.forEach(summary => {
      console.log(`Program: ${summary.program.name} - ${summary.count} courses`);
    });

  } catch (error) {
    console.error('Error populating courses:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

