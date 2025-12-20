import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCheckCircle, FaUserShield, FaStar } from "react-icons/fa";
import heroImg from "../../../public/banner-img.png";

const Banner = () => {
    return (
         <section className="w-full bg-[#e7fafc] py-20 px-6 my-3 mb-20 rounded-2xl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Find <span className="text-secondary">Scholarships</span>  
            <br /> Easily & Quickly
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Get matched scholarships verified by trusted institutions.
            Save time, apply faster.
          </p>

          {/* BULLET POINTS */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-800">
              <FaStar className="text-indigo-600" />
              Scholarships for every type of student
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <FaCheckCircle className="text-green-600" />
              100% Free to explore
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <FaUserShield className="text-yellow-600" />
              Vetted & verified opportunities
            </div>
          </div>

          <Link
            to="/all-scholarships"
            className="inline-block mt-8 bg-secondary text-black px-7 py-4 rounded-xl text-lg shadow-md hover:bg-primary hover:text-white transition"
          >
            Find Scholarships Now
          </Link>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <img
            src={heroImg}
            alt="hero img here"
            className="w-100 h-100 object-cover rounded-3xl shadow-md"
          />

         
        </motion.div>
      </div>
    </section>
    );
};

export default Banner;