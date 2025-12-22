import React, { useState } from "react";
import { motion } from "framer-motion";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "", // 🔹 Image URL
    country: "",
    city: "",
    worldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axiosSecure.post("/scholarships", formData);
      if (res.data?.insertedId) {
        setSuccess("Scholarship added successfully!");
        setFormData({
          scholarshipName: "",
          universityName: "",
          universityImage: "",
          country: "",
          city: "",
          worldRank: "",
          subjectCategory: "",
          scholarshipCategory: "",
          degree: "",
          tuitionFees: "",
          applicationFees: "",
          serviceCharge: "",
          deadline: "",
        });
      }
    } catch (err) {
      setError("Failed to add scholarship");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-6 bg-[#e7fafc]"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Add New Scholarship
      </h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <input
          name="scholarshipName"
          value={formData.scholarshipName}
          onChange={handleChange}
          type="text"
          placeholder="Scholarship Name"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
          required
        />
        <input
          name="universityName"
          value={formData.universityName}
          onChange={handleChange}
          type="text"
          placeholder="University Name"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
          required
        />
        <input
          name="universityImage"
          value={formData.universityImage}
          onChange={handleChange}
          type="text"
          placeholder="University Image URL"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
          type="text"
          placeholder="Country"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
          required
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          type="text"
          placeholder="City"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
          required
        />
        <input
          name="worldRank"
          value={formData.worldRank}
          onChange={handleChange}
          type="number"
          placeholder="World Rank"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="subjectCategory"
          value={formData.subjectCategory}
          onChange={handleChange}
          type="text"
          placeholder="Subject Category"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="scholarshipCategory"
          value={formData.scholarshipCategory}
          onChange={handleChange}
          type="text"
          placeholder="Scholarship Category"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          type="text"
          placeholder="Degree"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="tuitionFees"
          value={formData.tuitionFees}
          onChange={handleChange}
          type="number"
          placeholder="Tuition Fees (optional)"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="applicationFees"
          value={formData.applicationFees}
          onChange={handleChange}
          type="number"
          placeholder="Application Fees"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="serviceCharge"
          value={formData.serviceCharge}
          onChange={handleChange}
          type="number"
          placeholder="Service Charge"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <input
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          type="date"
          className="input input-bordered w-full hover:bg-[#e7fafc]"
        />
        <button
          disabled={loading}
          className="btn bg-secondary col-span-full mt-2"
        >
          {loading ? "Adding..." : "Add Scholarship"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddScholarship;
