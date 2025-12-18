import React from 'react';
import useAuth from '../../hooks/useAuth';
import { motion } from "framer-motion";

const MyProfile = () => {
    const {user} = useAuth()
    return (
 <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6 flex justify-center"
    >
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center border border-gray-200">
        <img 
          src={user?.photoURL} 
          alt="Profile" 
          className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500"
        />
        <h3 className="text-2xl font-bold mt-4 text-gray-800">{user?.displayName}</h3>
        <p className="text-gray-500">{user?.email}</p>
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold capitalize">
          {user?.role}
        </span>
      </div>
    </motion.div>
    );
};

export default MyProfile;