import React from "react";
import { FaShieldAlt, FaClock, FaUserGraduate, FaGlobe } from "react-icons/fa";

const WhyChooseUs = () => {
  const benefits = [
    { icon: <FaShieldAlt />, title: "Verified Scholarships", desc: "All opportunities are vetted by our team." },
    { icon: <FaClock />, title: "Apply Quickly", desc: "Fast & easy online application process." },
    { icon: <FaUserGraduate />, title: "Support Students", desc: "Guidance at every step of your journey." },
    { icon: <FaGlobe />, title: "Global Opportunities", desc: "Scholarships from 50+ countries worldwide." },
  ];

  return (
    <section className="w-full mb-24 py-20 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose ScholarStream</h2>
        <p className="text-gray-600 mb-10">Trusted by students worldwide for global scholarships</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-[#E3F8F8] to-black shadow-lg p-6 rounded-2xl hover:bg-secondary hover:shadow-xl transition">
              <div className="text-4xl text-primary mb-4">{b.icon}</div>
              <h3 className="font-semibold text-primary text-lg mb-2">{b.title}</h3>
              <p className="text-primary text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
