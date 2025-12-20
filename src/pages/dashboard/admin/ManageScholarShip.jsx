import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/admin/scholarships");
      setScholarships(res.data.scholarships || res.data || []);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scholarship?"
    );
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/scholarships/${id}`);
      toast.success("Scholarship deleted successfully");
      setScholarships((prev) => prev.filter((sch) => sch._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete scholarship");
    }
  };

  // Open Edit Modal
  const handleEdit = (scholarship) => {
    setSelectedScholarship(scholarship);
    setEditModal(true);
  };

  // Save edited scholarship
const handleSaveEdit = async () => {
  try {
    const { _id, ...updateData } = selectedScholarship; // remove _id
    const res = await axiosSecure.patch(`/scholarships/${_id}`, updateData);
    setScholarships((prev) =>
      prev.map((sch) => (sch._id === _id ? res.data : sch))
    );
    setEditModal(false);
    toast.success("Scholarship updated successfully");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to update");
  }
};

  if (loading) {
    return <p className="text-center mt-10">Loading scholarships...</p>;
  }

  return (
    <div className="p-6 bg-[#e7fafc]">
      <h1 className="text-2xl font-bold mb-4">Manage Scholarships</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-secondary">
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
            {scholarships.length === 0 && (
              <tr className="hover:bg-[#e7fafc] transition-all">
                <td colSpan="8" className="text-center">
                  No scholarships found
                </td>
              </tr>
            )}
            {scholarships.map((sch, index) => (
              <tr key={sch._id} className="hover:bg-[#e7fafc] transition-all">
                <th>{index + 1}</th>
                <td>{sch.universityName}</td>
                <td>{sch.scholarshipName}</td>
                <td>{sch.scholarshipCategory}</td>
                <td>{sch.degree}</td>
                <td>${sch.applicationFees}</td>
                <td>{new Date(sch.applicationDeadline).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(sch)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(sch._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Scholarship Modal */}
      {editModal && selectedScholarship && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Edit Scholarship</h3>
            <label className="block mb-2">
              University Name:
              <input
                type="text"
                className="input input-bordered w-full"
                value={selectedScholarship.universityName}
                onChange={(e) =>
                  setSelectedScholarship({
                    ...selectedScholarship,
                    universityName: e.target.value,
                  })
                }
              />
            </label>
            <label className="block mb-2">
              Scholarship Name:
              <input
                type="text"
                className="input input-bordered w-full"
                value={selectedScholarship.scholarshipName}
                onChange={(e) =>
                  setSelectedScholarship({
                    ...selectedScholarship,
                    scholarshipName: e.target.value,
                  })
                }
              />
            </label>
            <label className="block mb-2">
              Category:
              <input
                type="text"
                className="input input-bordered w-full"
                value={selectedScholarship.scholarshipCategory}
                onChange={(e) =>
                  setSelectedScholarship({
                    ...selectedScholarship,
                    scholarshipCategory: e.target.value,
                  })
                }
              />
            </label>
            <label className="block mb-2">
              Degree:
              <input
                type="text"
                className="input input-bordered w-full"
                value={selectedScholarship.degree}
                onChange={(e) =>
                  setSelectedScholarship({
                    ...selectedScholarship,
                    degree: e.target.value,
                  })
                }
              />
            </label>
            <label className="block mb-2">
              Application Fee:
              <input
                type="number"
                className="input input-bordered w-full"
                value={selectedScholarship.applicationFees}
                onChange={(e) =>
                  setSelectedScholarship({
                    ...selectedScholarship,
                    applicationFees: e.target.value,
                  })
                }
              />
            </label>
            <label className="block mb-4">
              Deadline:
              <input
  type="date"
  className="input input-bordered w-full"
  value={
    selectedScholarship.applicationDeadline
      ? new Date(selectedScholarship.applicationDeadline).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) =>
    setSelectedScholarship({
      ...selectedScholarship,
      applicationDeadline: e.target.value, // 'YYYY-MM-DD' string
    })
  }
/>

            </label>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
