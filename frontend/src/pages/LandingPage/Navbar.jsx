import React from "react";
import { Link } from "react-router-dom";
import SVGLOGO from "../../assets/SVGLOGO.jpeg";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  return (
    <nav className="bg-[#050606] opacity-90 text-white fixed w-full z-10 shadow-lg">
      <div className="flex justify-between items-center max-w-full px-8 md:px-16 py-4">
        
        {/* Logo Section */}
        <div>
          <Link to="/" className="hover:opacity-85 transition-all duration-300">
            <div className="w-[200px] h-[72px] overflow-hidden">
              <img
                src={SVGLOGO}
                alt="Logo"
                className="w-[260px] h-[90px] object-cover object-center -mt-2"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg mr-16 font-medium tracking-wide">
          <Link to="/" onClick={() => scrollToSection("hero")} className="hover:text-[#2E3736] transition-all duration-300">
            Home
          </Link>
          <Link to="/" onClick={() => scrollToSection("services")} className="hover:text-[#2E3736] transition-all duration-300">
            Services
          </Link>
          <Link to="/" onClick={() => scrollToSection("about")} className="hover:text-[#2E3736] transition-all duration-300">
            About
          </Link>
          <Link to="/" onClick={() => scrollToSection("contact")} className="hover:text-[#2E3736] transition-all duration-300">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
