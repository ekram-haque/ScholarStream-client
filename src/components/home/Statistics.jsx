import React from "react";

const statsData = [
  { label: "Scholarships Available", value: 1200 },
  { label: "Universities Partnered", value: 150 },
  { label: "Students Benefited", value: 4500 },
  { label: "Countries Covered", value: 50 },
];

const Statistics = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <div key={idx} className="bg-[#E3F8F8] hover:bg-secondary rounded-2xl p-8 shadow hover:shadow-lg transition">
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
