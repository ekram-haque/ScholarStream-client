import React from "react";
import { FaUserPlus, FaSearch, FaFileAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create an Account",
      description: "Sign up quickly with your email or social login to get started.",
    },
    {
      icon: <FaSearch />,
      title: "Find Scholarships",
      description: "Browse and filter scholarships based on country, degree, and deadlines.",
    },
    {
      icon: <FaFileAlt />,
      title: "Apply Online",
      description: "Submit your applications directly through our platform with ease.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Track Your Progress",
      description: "Monitor your applications and receive notifications on updates.",
    },
  ];

  return (
    <section className="w-full mb-24 py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Follow these simple steps to apply for scholarships efficiently
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#E3F8F8] hover:bg-secondary transition-colors shadow-lg rounded-3xl p-8 flex flex-col items-center text-center"
            >
              <div className="text-5xl text-primary mb-4">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-700 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
