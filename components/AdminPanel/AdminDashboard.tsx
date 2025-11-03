'use client'
import { useState } from "react";
import Link from "next/link";
import StudentPanel from "./StudentPanel";
import RegistrationForm from "./RegistrationForm";
import EditStudentDetail from "./EditStudentDetail";
import { TbSquareToggle } from "react-icons/tb";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const tabs = [
    { id: "students", label: "Student Details" },
    { id: "registerstudent", label: "Register Student" },
    { id: "editstudentdetails", label: "Edit Details" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentPanel />;
      case "registerstudent":
        return <RegistrationForm />;
      case "editstudentdetails":
        return <EditStudentDetail />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="w-64 bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold my-4 px-4">RK Technical</h1>
          <hr className="my-6" />
          <nav>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg mb-2 hover:bg-gray-700 transition-all ${activeTab === tab.id ? "bg-gray-700" : ""
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 flex items-center gap-2"
          >
            <TbSquareToggle />
            {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
          </button>
          <span>
            <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
            <p className="text-gray-600 text-center">Welcome to the Admin Dashboard</p>
          </span>
          <Link href='/' className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 flex items-center gap-2">Home</Link>
        </div>
        <div className="bg-white shadow rounded-lg p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;