import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCheckCircle, FaUserShield, FaStar } from "react-icons/fa";
import heroImg from "../../../public/banner-img.png";

const Banner = () => {
  return (
    <section
      className="w-full py-20 px-6 my-6 mb-20 rounded-3xl
      bg-gradient-to-br from-[#e7fafc] via-white to-[#e7fafc]"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Find{" "}
            <span className="text-secondary"> Scholarships</span>
            <br /> Faster Than Ever
          </h1>

          <p className="mt-5 text-lg text-gray-700 max-w-xl">
            Discover trusted scholarships from top universities worldwide.
            Save time, apply faster, and secure your future.
          </p>

          {/* BULLET POINTS */}
          <div className="mt-7 space-y-4">
            <div className="flex items-center gap-3 text-gray-800">
              <FaStar className="text-indigo-600 text-lg" />
              Scholarships for every type of student
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <FaCheckCircle className="text-green-600 text-lg" />
              100% Free to explore
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <FaUserShield className="text-yellow-600 text-lg" />
              Vetted & verified opportunities
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/all-scholarships"
            className="inline-block mt-10 bg-secondary text-black
            px-8 py-4 rounded-xl text-lg font-semibold shadow-md
            hover:bg-primary hover:text-white hover:shadow-lg
            transition"
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
          {/* Glow Effect */}
          <div className="absolute -z-10 w-80 h-80 bg-secondary/30 blur-3xl rounded-full"></div>

          <img
            src={heroImg}
            alt="Scholarship banner illustration"
            className="w-full max-w-lg object-contain drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
