import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all"); // default: show all
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/dashboard/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Change role of a user
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/dashboard/users/${userId}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error(err);
      alert("Failed to change role");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosSecure.delete(`/dashboard/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  // Filter users by role
  const filteredUsers = filterRole === "all" ? users : users.filter(u => u.role === filterRole);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-[#e7fafc]"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Manage Users</h2>

      {/* Filter dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by role:</label>
        <select 
          className="select select-bordered"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto  ">
        <table className="table w-full text-gray-700 bg-white shadow-lg rounded-xl border border-gray-200">
          <thead className="bg-primary text-secondary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">No users found</td>
              </tr>
            )}
            {filteredUsers.map(user => (
              <tr key={user._id} className="hover:bg-[#e7fafc] transition-all">
                <td>{user.displayName || user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="space-x-2 ">
                  {/* Promote/Demote Buttons */}
                  {user.role === "student" && (
                    <>
                      <button 
                        className="btn btn-xs btn-success hover:scale-105  transition-transform"
                        onClick={() => handleRoleChange(user._id, "moderator")}
                      >
                        Promote to Moderator
                      </button>
                      <button 
                        className="btn btn-xs btn-primary hover:scale-105 transition-transform"
                        onClick={() => handleRoleChange(user._id, "admin")}
                      >
                        Promote to Admin
                      </button>
                    </>
                  )}
                  {user.role === "moderator" && (
                    <>
                      <button 
                        className="btn btn-xs btn-success hover:scale-105 transition-transform"
                        onClick={() => handleRoleChange(user._id, "admin")}
                      >
                        Promote to Admin
                      </button>
                      <button 
                        className="btn btn-xs btn-warning hover:scale-105 transition-transform"
                        onClick={() => handleRoleChange(user._id, "student")}
                      >
                        Demote to Student
                      </button>
                    </>
                  )}
                  {user.role === "admin" && (
                    <>
                      <button 
                        className="btn btn-xs btn-warning hover:scale-105 transition-transform"
                        onClick={() => handleRoleChange(user._id, "moderator")}
                      >
                        Demote to Moderator
                      </button>
                      <button 
                        className="btn btn-xs btn-error hover:scale-105 transition-transform"
                        onClick={() => handleRoleChange(user._id, "student")}
                      >
                        Demote to Student
                      </button>
                    </>
                  )}
                  <button 
                    className="btn btn-xs btn-error hover:scale-105 transition-transform"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageUsers;
