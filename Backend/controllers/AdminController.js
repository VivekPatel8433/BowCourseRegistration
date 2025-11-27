import { Program, Course, } from'../models/AdminModel.js';
import populateCourses from "../populateCourse.js"
// ---------------------------------------------------
// GET ALL PROGRAMS
// ---------------------------------------------------
export async function getAllPrograms(req,res) {
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
          enrollments: 0,
          createdAt: 0,
          updatedAt: 0,
         __v: 0
        }
      }
    ]);
     // SEND THE RESPONSE
    return res.status(200).json({
      success: true,
      programs
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
}


// ---------------------------------------------------
// GET ALL COURSES
// ---------------------------------------------------
export async function getAllCourses(req,res) {
  try {
    console.log("Seeding all courses");
   // await populateCourses(); // to populate for first time
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
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          "program.__v": 0,
          "program.createdAt": 0,
          "program.updatedAt": 0
        }
      }
    ]);

   return res.status(200).json({
      success: true,
      courses
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
}

// ---------------------------------------------------
// ADD NEW COURSE
// ---------------------------------------------------
export async function addCourse(req,res) {
  try {
    // Find program by name
    const courseData=req.body;
    console.log({courseData})
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
      status: courseData.status==="active"?true:false,
      startDate: courseData.startDate,
      endDate: courseData.endDate,
      schedule: courseData.schedule || "",
      fees: {
        domestic: courseData.domestic,
        international: courseData.international
      },
      prerequisites: courseData.prerequisites || []
    });

    const savedCourse = await course.save();
    
   return res.status(200).json({
     success: true,
     course:savedCourse,
     message:"Course created successfully"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
}

// ---------------------------------------------------
// UPDATE COURSE (PUT)
// ---------------------------------------------------
export async function updateCourse(req,res) {
  try {
    const id= req.params.id;
      const courseData= req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        instructorId: courseData.instructorId || null,
      programId: courseData.programId,
     // code: courseData.code, must be unique if it is the same during creation
      name: courseData.name,
      description: courseData.description,
      credit: courseData.credits,
      terms: courseData.term || [], // Array of terms
      maxStudents: courseData.maxStudents,
      status: courseData.status==="active"?true:false,
      startDate: courseData.startDate,
      endDate: courseData.endDate,
      schedule: courseData.schedule || "",
      fees: {
        domestic: courseData.domestic,
        international: courseData.international
      },
      prerequisites: courseData.prerequisites || []
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      throw new Error('Course not found');
    }
    return res.status(200).json({
     success: true,
     updatedCourse,
     message:"Course updated successfully"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
}

// ---------------------------------------------------
// PATCH COURSE (Dynamic partial update)
// ---------------------------------------------------
export async function patchCourse(req,res) {
  try {
    const id= req.params.id;
    const patchData= req.body;
    console.log({id,patchData})
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
    return res.status(200).json({updatedCourse})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
}

// ---------------------------------------------------
// DELETE COURSE
// ---------------------------------------------------
export async function deleteCourse(req,res) {
  try {
    const id= req.params.id;
    const result = await Course.findByIdAndDelete(id);
    
    if (!result) {
      throw new Error('Course not found');
    }
   return res.status(200).json({deleted:result})
 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
}

