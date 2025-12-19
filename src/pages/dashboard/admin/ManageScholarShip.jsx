import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/scholarships");
      setScholarships(res.data.scholarships || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch scholarships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Delete scholarship
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this scholarship?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/scholarships/${id}`);
      toast.success("Scholarship deleted successfully");
      fetchScholarships(); // Refresh table
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete scholarship");
    }
  };

  

 

useEffect(() => {
  axiosSecure.get("/scholarships")
    .then(res => setScholarships(res.data.scholarships))
    .catch(err => console.log(err));
}, []);

if (loading) {
    return <p className="text-center mt-10">Loading scholarships...</p>;
  }


// const handleUpdateScholarship = async (id, data) => {
//   const res = await axiosSecure.patch(`/scholarships/${id}`, data);
//   setScholarships(prev => prev.map(s => s._id === id ? res.data : s));
// };

// const handleDeleteScholarship = async (id) => {
//   await axiosSecure.delete(`/scholarships/${id}`);
//   setScholarships(prev => prev.filter(s => s._id !== id));
// };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Scholarships</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>University</th>
              <th>Scholarship Name</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Application Fee</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch, index) => (
              <tr key={sch._id}>
                <th>{index + 1}</th>
                <td>{sch.universityName}</td>
                <td>{sch.scholarshipName}</td>
                <td>{sch.scholarshipCategory}</td>
                <td>{sch.degree}</td>
                <td>${sch.applicationFees}</td>
                <td>{new Date(sch.applicationDeadline).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-warning">Edit</button>
                  <button
                    onClick={() => handleDelete(sch._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {scholarships.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
