import React, { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaBookOpen,
  FaUniversity,
  FaGlobeAmericas,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const iconMap = {
  "Undergraduate": <FaGraduationCap />,
  "Masters": <FaLaptopCode />,
  "PhD / Doctorate": <FaBookOpen />,
  "Fully Funded": <FaUniversity />,
  "Partial Funded": <FaGlobeAmericas />,
};

const ScholarshipCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    
    axiosSecure
      .get("/categories-scholarship")
      .then((res) => {
        const data = res.data.categories || [];
        
        const mapped = data.map((cat) => ({
          title: cat,
          icon: iconMap[cat] || <FaGraduationCap />,
          description: `Explore scholarships in ${cat}`,
          link: `/scholarships?category=${encodeURIComponent(cat)}`,
        }));
        setCategories(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full py-20 px-6 bg-[#f5faff]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Scholarship Categories</h2>
        <p className="text-gray-600 mb-12">
          Browse scholarships by study level and funding type
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {categories.map((cat, idx) => (
            <Link
              to={cat.link}
              key={idx}
              className="bg-white shadow-lg hover:shadow-xl rounded-3xl p-6 flex flex-col items-center text-center transition transform hover:-translate-y-2"
            >
              <div className="text-5xl text-secondary mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{cat.title}</h3>
              <p className="text-gray-600 text-sm">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipCategories;
