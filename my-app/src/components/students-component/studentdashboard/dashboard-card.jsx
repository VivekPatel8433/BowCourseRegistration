import React,{useEffect} from "react";
import { FaIdBadge, FaGraduationCap, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import api from '../../../services/api'
import { useStudent } from "../../../context/StudentContext";
const cards = [
  {
    title: "Student ID",
    value: "SD2025001",
    icon: <FaIdBadge />,
    status: "Active",
    statusColor: "#D1FAE5",
    statusTextColor: "#065F46",
    class: "blue"
  },
  {
    title: "Program",
    value: "Software Development",
    subtitle: "Diploma (2 years)",
    icon: <FaGraduationCap />,
    status: null,
    class: "green"
  },
  {
    title: "Department",
    value: "Software Development",
    subtitle: "SD Department",
    icon: <FaBuilding />,
    status: null,
    class: "purple"
  },
  {
    title: "Current Term",
    value: "Winter 2025",
    subtitle: "Jan - Mar",
    icon: <FaCalendarAlt />,
    status: null,
    class: "orange"
  }
];

const iconColors = {
  blue: "rgb(39, 101, 235)",
  green: "#16a34a",
  gray: "rgb(147, 51, 234)",
  red: "rgb(234, 88, 12)",
  purple: "#7c3aed",
  orange: "#f97316"
};

const backgroundColors = {
  blue: "bg-blue-100",
  green: "bg-green-100", 
  gray: "bg-gray-200",
  red: "bg-red-100",
  purple: "bg-purple-100",
  orange: "bg-orange-100"
};

function Card({ children }) {
  return (
    <div className="flex-1 min-w-[10vw] bg-blue-50 bg-opacity-85 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1.5 cursor-pointer border border-gray-300 border-opacity-10">
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div className="p-6 flex flex-col items-start">{children}</div>;
}
// Get current date
const now = new Date();
const month = now.getMonth() + 1; // JS months: 0-11
const year = now.getFullYear();
let term = "";
let termSubtitle = "";
// Determine term
if (month >= 9 && month <= 12) {
  term = "Fall";
  termSubtitle = "Sep-Dec";
} else if (month >= 1 && month <= 6) {
  term = "Winter";
  termSubtitle = "Jan-Jun";
} else if (month >= 6 && month <= 9) {
  term = "Summer";
  termSubtitle = "Jun-Sep";
}
const DashboardCards = () => {
   const {studentInfo,setStudentInfo}= useStudent();// student custom hook

   useEffect(() => {
  const fetchStudentData = async () => {
    try {
      const res = await api.get(""); // replace with your data and api
      setStudentInfo(res.data);
     
      // Update cards dynamically
      cards[1].value = res?.data?.deptName || cards[1].value;
      cards[1].subtitle = `${res?.data?.programName} (${parseInt(res?.data?.duration)})`;
      cards[2].value = res?.data?.deptName || cards[2].value;

      // Current Term card
      cards[3].value = `${term} ${year}`;
      cards[3].subtitle = termSubtitle;
      console.log({ updatedCards: cards });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  fetchStudentData();
}, []);

  return (
    <div className="flex flex-col gap-5 mt-5 relative left-[5vw] w-[50vw]">
      {/* Header */}
      <div className="header">
        <h1 className="m-0 text-3xl text-gray-900">Student Dashboard</h1>
        <p className="text-base text-gray-500 mt-1 mb-0">
        {/*   Welcome back, Sarah! Here's your academic overview.*/}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 w-[70vw]">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardContent>
              {/* Icon Row */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${backgroundColors[card.class]}`}>
                <div style={{ color: iconColors[card.class] }} className="text-xl">
                  {card.icon}
                </div>
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between w-full mt-2.5">
                <h4 className="m-0 text-base font-semibold text-gray-900">{card.title}</h4>
                {card.status && (
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: card.statusColor,
                      color: card.statusTextColor
                    }}
                  >
                    {card.status}
                  </span>
                )}
              </div>

              {/* Card Value */}
              <p className={`mt-2 font-bold ${
                index === 0 ? 'text-xl text-blue-600' : 'text-gray-900'
              }`}>
                {card.value}
              </p>
              
              {/* Subtitle */}
              {card.subtitle && (
                <p className="mt-0.5 text-sm text-gray-500 mb-0">
                  {card.subtitle}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;