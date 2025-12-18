import React from 'react';
import { motion } from "framer-motion";

const AddScholarship = () => {
    return (
 <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Scholarship</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <input type="text" placeholder="Scholarship Name" className="input input-bordered w-full"/>
        <input type="text" placeholder="University Name" className="input input-bordered w-full"/>
        <input type="text" placeholder="Country" className="input input-bordered w-full"/>
        <input type="text" placeholder="City" className="input input-bordered w-full"/>
        <input type="number" placeholder="World Rank" className="input input-bordered w-full"/>
        <input type="text" placeholder="Subject Category" className="input input-bordered w-full"/>
        <input type="text" placeholder="Scholarship Category" className="input input-bordered w-full"/>
        <input type="text" placeholder="Degree" className="input input-bordered w-full"/>
        <input type="number" placeholder="Tuition Fees (optional)" className="input input-bordered w-full"/>
        <input type="number" placeholder="Application Fees" className="input input-bordered w-full"/>
        <input type="number" placeholder="Service Charge" className="input input-bordered w-full"/>
        <input type="date" className="input input-bordered w-full"/>
        <button className="btn btn-indigo col-span-full mt-2">Add Scholarship</button>
      </form>
    </motion.div>
    );
};

export default AddScholarship;