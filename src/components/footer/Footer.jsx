import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../../public/scholarstrem-logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-secondary mt-24">
      
      {/* MAIN FOOTER */}
      <div className="w-11/12 mx-auto py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* BRAND */}
        <div>
          <img src={logo} alt="ScholarStream logo" className="w-20 mb-4" />
          <p className="text-sm leading-relaxed">
            ScholarStream is a trusted platform for discovering global
            scholarships, empowering students worldwide since 1992.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-2 rounded-full bg-secondary text-primary hover:bg-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary text-primary hover:bg-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary text-primary hover:bg-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h6 className="font-semibold mb-4">Services</h6>
          <ul className="space-y-2 text-sm">
            <li><Link to="/all-scholarships" className="hover:underline">Browse Scholarships</Link></li>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/blog" className="hover:underline">Scholarship Blog</Link></li>
            <li><Link to="/help" className="hover:underline">Help Center</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h6 className="font-semibold mb-4">Company</h6>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            <li><Link to="/press" className="hover:underline">Press</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h6 className="font-semibold mb-4">Contact</h6>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope /> support@scholarstream.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt /> +880 1234 567 890
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-secondary/30">
        <div className="w-11/12 mx-auto py-5 text-center text-sm">
          © {new Date().getFullYear()} <strong>ScholarStream</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
