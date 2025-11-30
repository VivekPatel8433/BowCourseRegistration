import React, { useEffect } from "react";
import {
  FaIdBadge,
  FaGraduationCap,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../../services/api";
import { useStudent } from "../../../context/StudentContext";

// Base card definition
const cards = [
  {
    title: "Student ID",
    value: "SD2025001",
    icon: <FaIdBadge />,
    status: "Active",
    statusColor: "#D1FAE5",
    statusTextColor: "#065F46",
    class: "blue",
  },
  {
    title: "Program",
    value: "Software Development",
    subtitle: "Diploma (2 years)",
    icon: <FaGraduationCap />,
    status: null,
    class: "green",
  },
  {
    title: "Department",
    value: "Software Development",
    subtitle: "SD Department",
    icon: <FaBuilding />,
    status: null,
    class: "purple",
  },
  {
    title: "Current Term",
    value: "Winter 2025",
    subtitle: "Jan - Mar",
    icon: <FaCalendarAlt />,
    status: null,
    class: "orange",
  },
];

// Icon and background colors
const iconColors = {
  blue: "text-blue-600",
  green: "text-green-600",
  gray: "text-gray-700",
  red: "text-red-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
};

const backgroundColors = {
  blue: "bg-blue-100",
  green: "bg-green-100",
  gray: "bg-gray-200",
  red: "bg-red-100",
  purple: "bg-purple-100",
  orange: "bg-orange-100",
};

// Determine current term dynamically
const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();
let term = "";
let termSubtitle = "";

if (month >= 9 && month <= 12) {
  term = "Fall";
  termSubtitle = "Sep - Dec";
} else if (month >= 1 && month <= 4) {
  term = "Winter";
  termSubtitle = "Jan - Apr";
} else if (month >= 5 && month <= 8) {
  term = "Spring / Summer";
  termSubtitle = "May - Aug";
}

export default function DashboardCards() {
  const { studentInfo, setStudentInfo } = useStudent();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await api.get("/auth/user/loggedIn");

        setStudentInfo(res.data.user);

        // Update cards dynamically
        cards[1].value = res?.data?.programName || cards[1].value;
        cards[1].subtitle = `${res?.data?.programName} (${parseInt(
          res?.data?.duration
        )})`;

        cards[2].value = res?.data?.deptName || cards[2].value;

        cards[3].value = `${term} ${year}`;
        cards[3].subtitle = termSubtitle;
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-500 text-sm">
          {/* Optional welcome message */}
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
          >
            {/* ICON */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${backgroundColors[card.class]}`}
            >
              <div className={`text-xl ${iconColors[card.class]}`}>
                {card.icon}
              </div>
            </div>

            {/* TITLE + STATUS */}
            <div className="flex items-center justify-between mt-4">
              <h3 className="text-base font-semibold text-gray-900">
                {card.title}
              </h3>

              {card.status && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: card.statusColor,
                    color: card.statusTextColor,
                  }}
                >
                  {card.status}
                </span>
              )}
            </div>

            {/* VALUE */}
            <p
              className={`mt-2 font-bold ${
                index === 0 ? "text-xl text-blue-600" : "text-gray-900"
              }`}
            >
              {card.value}
            </p>

            {/* SUBTITLE */}
            {card.subtitle && (
              <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
