import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = ({users}) => {

  const axiosSecure = useAxiosSecure()


const [user, setUsers] = useState([]);

useEffect(() => {
  axiosSecure.get("/dashboard/users")
    .then(res => setUsers(res.data))
    .catch(err => console.log(err));
}, []);

// const handleRoleChange = async (userId, newRole) => {
//   await axiosSecure.patch(`/dashboard/users/${userId}/role`, { role: newRole });
//   setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
// };

// const handleDeleteUser = async (userId) => {
//   await axiosSecure.delete(`/dashboard/users/${userId}`);
//   setUsers(prev => prev.filter(u => u._id !== userId));
// };





    return (
       <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-gray-700 bg-white shadow-lg rounded-xl border border-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-indigo-50 transition-all">
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-success hover:scale-105 transition-transform">Promote</button>
                  <button className="btn btn-xs btn-error hover:scale-105 transition-transform">Delete</button>
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