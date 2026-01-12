import React from "react";
import { Link } from "react-router";

const blogPosts = [
  { title: "How to Apply for Scholarships Abroad", date: "2025-12-01", link: "#" },
  { title: "Top 10 Scholarships for Masters Students", date: "2025-11-20", link: "#" },
  { title: "Tips for Writing Scholarship Essays", date: "2025-11-10", link: "#" },
];

const Blogs = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog, idx) => (
            <Link key={idx} to={blog.link} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
              <p className="text-gray-400 text-sm mb-2">{new Date(blog.date).toDateString()}</p>
              <h3 className="font-semibold text-xl">{blog.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
