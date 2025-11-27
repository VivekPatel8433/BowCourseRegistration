import React from "react";
import { Mail, BookOpen, Users, GraduationCap } from "lucide-react";
import { useAdmin } from '../../../../context/AdminContext';

function Card({ children }) { 
  return (
    <div className="bg-[#E5EAF6] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1.5 cursor-pointer">
      {children}
    </div>
  );
}

function CardContent({ children }) { 
  return (
    <div className="p-6 flex flex-col items-start">
      {children}
    </div>
  );
}

export default function Dashboard() {
  const { admin, programs, courses, students, messages, unreadMessages } = useAdmin();
  console.log({admin,programs,courses,students,messages,unreadMessages})
  const programNames = (programs ?? []).map(p => p.name).join(", ");

  return (
    <div className="p-8 font-['Inter',Arial,sans-serif] w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-medium mb-5">
          Administrator Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          {/* Welcome back, {admin?.firstName ?? "Admin"}! Manage courses and monitor student activities. */}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Courses Card */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2.5 justify-between w-full">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-600">
                Active
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold">Total Courses</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {courses?.length ?? 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Across all terms</p>
          </CardContent>
        </Card>

        {/* Total Students Card */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2.5 justify-between w-full">
              <Users className="w-6 h-6 text-green-600" />
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-600">
                Active
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold">Total Students</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {students ?? 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Enrolled students</p>
          </CardContent>
        </Card>

        {/* Programs Card */}
        <Card>
          <CardContent>
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h2 className="mt-4 text-lg font-semibold">Programs</h2>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {programs?.length ?? 0}
            </p>
            <p className="text-sm text-gray-500 mt-1 truncate w-full">
              {programNames || "No programs"}
            </p>
          </CardContent>
        </Card>

        {/* Messages Card */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2.5 justify-between w-full">
              <Mail className="w-6 h-6 text-orange-600" />
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-600">
                {unreadMessages?.length ?? 0} New
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold">Messages</h2>
            <p className="mt-2 text-3xl font-bold text-orange-600">
              {messages?.length ?? 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Student inquiries</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}