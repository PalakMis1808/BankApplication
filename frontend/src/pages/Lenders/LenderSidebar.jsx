import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaUser,
  FaEnvelope,
  FaDollarSign,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = ({ userRole, unreadCount }) => {
  const location = useLocation();

  const navItems = [
    { to: "/lender/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/lender/investing-loan", label: "My Investments", icon: <FaDollarSign /> },
    { to: "/lender/loan-list", label: "Loan List", icon: <FaTasks /> },
    { to: "/lender/repayment", label: "Repayments", icon: <FaChartBar /> },
    { to: "/lender/profile", label: "Profile", icon: <FaUser /> },
    { to: "/lender/support", label: "Support Requests", icon: <FaEnvelope /> },
  ];

  return (
    <div className="bg-[#10291E] text-white w-60 min-h-screen flex flex-col shadow-lg">
      {/* Branding */}
      <div className="flex items-center justify-center h-16 bg-[#0B1E14] shadow-md opacity-90">
        <h1 className="text-xl font-semibold">SheLend</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          {userRole === "lender" &&
            navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`flex items-center p-3 rounded-lg mx-3 transition-all duration-300
                    ${
                      location.pathname === item.to
                        ? "bg-[#183D2B] opacity-90"
                        : "hover:bg-[#1F4A33] opacity-80"
                    }
                  `}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
