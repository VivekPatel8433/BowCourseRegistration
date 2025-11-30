import React, { useState } from 'react';
import { useAdmin } from "../../../../context/AdminContext";
import api from '../../../../services/api';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseCode: '',
    description: '',
    instructor: '',
    startDate: '',
    endDate: '',
    credits: 3,
    maxStudents: 30,
    department: 'Software Development',
    program: '',
    status: 'active',
    prerequisites: [],
    learningObjectives: [''],
    syllabus: '',
    domestic: 0,
    international: 0,
    term: []
  });

  const { programs, OnCourseCreation } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (e) => {
    const value = String(e.target.value);

    setCourseData((prev) => {
      if (prev.term?.includes(value)) {
        return {
          ...prev,
          term: prev.term?.filter((t) => t !== value)
        };
      }

      return {
        ...prev,
        term: [...(prev.term ?? []), value]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      code: courseData.courseCode,
      name: courseData.courseName,
      description: courseData.description,
      credits: courseData.credits,
      instructor: courseData.instructor,
      program: courseData.program,
      enrolledStudents: 0,
      maxStudents: courseData.maxStudents,
      status: courseData.status,
      startDate: courseData.startDate,
      endDate: courseData.endDate,
      schedule: '',
      prerequisites: courseData.prerequisites || [],
      domestic: courseData.domestic,
      international: courseData.international,
      term: courseData.term
    };

    try {
      console.log('Submitting course data:', submitData);
      await api.post('/courses/add', submitData);
      OnCourseCreation();
      handleReset();
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCourseData({
      courseName: '',
      courseCode: '',
      description: '',
      instructor: '',
      startDate: '',
      endDate: '',
      credits: 3,
      maxStudents: 30,
      department: 'Software Development',
      program: '',
      status: 'active',
      prerequisites: [],
      learningObjectives: [''],
      syllabus: '',
      domestic: 0,
      international: 0,
      term: []
    });
  };

  return (
    <div className="relative left-[5vw] w-[80%] max-w-none m-0">
      <div className="mb-8 text-center">
        <h1 className="text-gray-800 mb-2 text-2xl ml-[1vw]">Create New Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg w-full mx-auto">
        <div className="flex flex-col gap-6">
          {/* Basic Information Section */}
          <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
            <h3 className="text-gray-800 mb-4 text-lg border-l-4 border-blue-500 pl-3 bg-purple-100 py-3 rounded-lg -mt-8 -mx-6 mb-6">
              Basic Information
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Course Name *</label>
                <input
                  type="text"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                  placeholder="e.g., Introduction to Computer Science"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Course Code *</label>
                <input
                  type="text"
                  name="courseCode"
                  value={courseData.courseCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                  placeholder="e.g., CS101"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Instructor</label>
                <input
                  type="text"
                  name="instructor"
                  value={courseData.instructor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                  placeholder="Instructor name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Department *</label>
                <select
                  name="department"
                  value={courseData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                >
                  <option value="">Select Department</option>
                  <option value="Software Development">Software Development</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Program *</label>
                <select
                  name="program"
                  value={courseData?.program}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                >
                  <option value="">Select Program</option>
                  {programs.map((program, index) => (
                    <option key={index} value={program.name}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Credits</label>
                <select
                  name="credits"
                  value={courseData.credits}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                >
                  <option value={1}>1 Credit</option>
                  <option value={2}>2 Credits</option>
                  <option value={3}>3 Credits</option>
                  <option value={4}>4 Credits</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Schedule Section */}
          <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
            <h3 className="text-gray-800 mb-4 text-lg border-l-4 border-blue-500 pl-3 bg-purple-100 py-3 rounded-lg -mt-8 -mx-6 mb-6">
              Course Schedule
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={courseData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={courseData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Maximum Students</label>
                <input
                  type="number"
                  name="maxStudents"
                  value={courseData.maxStudents}
                  onChange={handleInputChange}
                  min="1"
                  max="500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Domestic Fee ($)</label>
                <input
                  type="number"
                  name="domestic"
                  value={courseData.domestic}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">International Fee ($)</label>
                <input
                  type="number"
                  name="international"
                  value={courseData.international}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100"
                />
              </div>

              <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-800 relative left-[6vw]">Course Terms</label>
            <div className="flex gap-12 mt-2">
              {/* First Column */}
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="term"
                    value="Fall"
                    checked={courseData.term?.includes("Fall")}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  Fall
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="term"
                    value="Winter"
                    checked={courseData.term?.includes("Winter")}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  Winter
                </label>
              </div>

              {/* Second Column */}
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="term"
                    value="Summer"
                    checked={courseData.term?.includes("Summer")}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  Summer
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="term"
                    value="Spring"
                    checked={courseData.term?.includes("Spring")}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  Spring
                </label>
              </div>
            </div>
          </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
            <h3 className="text-gray-800 mb-4 text-lg border-l-4 border-blue-500 pl-3 bg-purple-100 py-3 rounded-lg -mt-8 -mx-6 mb-6">
              Course Description
            </h3>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-800">Course Description *</label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-100 resize-vertical"
                placeholder="Provide a detailed description of the course..."
              />
            </div>
          </div>

          <button 
            className="bg-indigo-300 text-white py-2 px-6 rounded-full w-1/2 mx-auto hover:bg-green-600 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
