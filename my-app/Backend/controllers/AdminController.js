import { Program, Course, } from '../models/AdminData.js';
import {seedPrograms} from '../PopulateData.js'
import populateCourses from '../populateCourse.js'
// ---------------------------------------------------
// GET ALL PROGRAMS
// ---------------------------------------------------
export async function getAllPrograms() {
  try {
    // console.log("seeding a programs");
    // await seedPrograms();

    const programs = await Program.aggregate([
      {
        $match: { department: "Software Development" }
      },
      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "programId",
          as: "enrollments"
        }
      },
      {
        $addFields: {
          totalEnrolledStudents: { $size: "$enrollments" }
        }
      },
      {
        $project: {
          enrollments: 0
        }
      }
    ]);
    console.log("programs",programs)
    return programs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------------
// GET COURSE BY ID
// ---------------------------------------------------
export async function getCourseById(id) {
  try {
    const course = await Course.findById(id);
    return course;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------------
// GET COURSE BY CODE
// ---------------------------------------------------
export async function getCourseByCode(code) {
  try {
    const course = await Course.findOne({ code });
    return course;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------------
// GET COURSE BY NAME
// ---------------------------------------------------
export async function getCourseByName(name) {
  try {
    const course = await Course.findOne({ name });
    return course;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------------
// GET ALL COURSES
// ---------------------------------------------------
export async function getAllCourses() {
  try {
   /* console.log("Seeding all courses");
    await populateCourses();*/ // to populate for first
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "programs",
          localField: "programId",
          foreignField: "_id",
          as: "program"
        }
      },
      {
        $unwind: "$program"
      },
      {
        $match: {
          "program.department": "Software Development"
        }
      },
      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "courseId",
          as: "enrollments"
        }
      },
      {
        $addFields: {
          totalEnrollment: { $size: "$enrollments" }
        }
      },
      {
        $project: {
          enrollments: 0,
          "program.__v": 0
        }
      }
    ]);
   console.log({courses})
    return courses;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------------
// ADD NEW COURSE
// ---------------------------------------------------
export async function addCourse(courseData) {
  try {
    // Find program by name
    const program = await Program.findOne({ name: courseData.program });
    if (!program) {
      throw new Error(`Program '${courseData.program}' not found`);
    }

    const course = new Course({
      instructorId: courseData.instructorId || null,
      programId: program._id,
      code: courseData.code,
      name: courseData.name,
      description: courseData.description,
      credit: courseData.credits,
      terms: courseData.term || [], // Array of terms
      maxStudents: courseData.maxStudents,
      status: courseData.status,
      startDate: courseData.startDate,
      endDate: courseData.endDate,
      schedule: courseData.schedule || "",
      fees: {
        domestic: courseData.domestic,
        international: courseData.international
      }
    });

    const savedCourse = await course.save();
    
    return { 
      id: savedCourse._id, 
      message: "Course created successfully" 
    };

  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
}

// ---------------------------------------------------
// UPDATE COURSE (PUT)
// ---------------------------------------------------
export async function updateCourse(id, courseData) {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        instructorId: courseData.instructorId,
        programId: courseData.programId,
        code: courseData.code,
        name: courseData.name,
        description: courseData.description,
        credit: courseData.credit,
        terms: courseData.term ? [courseData.term] : undefined,
        maxStudents: courseData.maxStudents,
        status: courseData.status,
        startDate: courseData.startDate,
        endDate: courseData.endDate,
        schedule: courseData.schedule
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      throw new Error('Course not found');
    }

    return updatedCourse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------------
// PATCH COURSE (Dynamic partial update)
// ---------------------------------------------------
export async function patchCourse(id, patchData) {
  try {
    const fields = Object.keys(patchData);
    if (fields.length === 0) throw new Error("Nothing to update");

    // Handle term conversion from string to array if needed
    if (patchData.term && typeof patchData.term === 'string') {
      patchData.terms = [patchData.term];
      delete patchData.term;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: patchData },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      throw new Error('Course not found');
    }

    return updatedCourse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------------
// DELETE COURSE
// ---------------------------------------------------
export async function deleteCourse(id) {
  try {
    const result = await Course.findByIdAndDelete(id);
    
    if (!result) {
      throw new Error('Course not found');
    }

    return { deletedCount: 1 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

