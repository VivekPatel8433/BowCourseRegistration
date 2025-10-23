import React from "react";
import { FaIdBadge, FaGraduationCap, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import "./DashboardCards.css";

const cards = [
  {
    title: "Student ID",
    value: "SD2025001",
    icon: <FaIdBadge className="blue"/>,
    status: "Active",
    statusColor: "#D1FAE5", // green background
    statusTextColor: "#065F46",
    class:"blue"
  },
  {
    title: "Program",
    value: "Software Development",
    subtitle: "Diploma (2 years)",
    icon: <FaGraduationCap className="green"/>,
    status: null,
     class:"gray"
  },
  {
    title: "Department",
    value: "Software Development",
    subtitle: "SD Department",
    icon: <FaBuilding className="purple" />,
    status: null,
     class:"green"
  },
  {
    title: "Current Term",
    value: "Winter 2025",
    subtitle: "Jan - Mar",
    icon: <FaCalendarAlt className="orange"/>,
    status: null,
     class:"red"
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

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

const DashboardCards = () => {
  return (
    <div className=" dashboard-cards-container">
      <div className="header">
        <h1 className="header-title">Student Dashboard</h1>
        <p className="header-subtitle">
          Welcome back, Sarah! Here's your academic overview.
        </p>
      </div>

     <div className="cards-grid">
  {cards.map((card, index) => (
    <Card key={index}>
      <CardContent>
       <div className={`icon-row ${card.class}`}>
            <div className="icon-wrapper" style={{ color: iconColors[card.class] }}>
               {card.icon}
            </div>
         </div>


        <div className="card-header">
          <h4>{card.title}</h4>
          {card.status && (
            <span
              className="status-badge"
              style={{
                backgroundColor: card.statusColor,
                color: card.statusTextColor
              }}
            >
              {card.status}
            </span>
          )}
        </div>

        <p className="card-value">{card.value}</p>
        {card.subtitle && <p className="card-subtitle">{card.subtitle}</p>}
      </CardContent>
    </Card>
  ))}
</div>

    </div>
  );
};

export default DashboardCards;
