import React from "react";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import useRole from "../../hooks/useRole";
import { FaCheckCircle } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const createdDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "N/A";

  const profileCompletion = user?.photoURL ? 100 : 85;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#e7fafc] p-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex flex-col md:flex-row items-center md:items-start gap-6 hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Left: Profile Image */}
        <div className="shrink-0 text-center md:text-left">
          <div className="w-32 h-32 rounded-full border-4 border-secondary overflow-hidden mx-auto md:mx-0 shadow-md">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Role Badge */}
          {role && (
            <div className="mt-4">
              <span className="inline-block px-4 py-1 rounded-full bg-secondary text-primary font-semibold capitalize shadow-sm">
                {role}
              </span>
            </div>
          )}

          {/* Verified Badge */}
          <div className="mt-2 flex justify-center md:justify-start items-center gap-1 text-primary font-semibold text-sm">
            <FaCheckCircle />
            Verified Account
          </div>
        </div>

        {/* Right: User Info */}
        <div className="flex-1 w-full md:pl-6 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Name</span>
            <span className="text-gray-800">{user?.displayName || user?.name || "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Email</span>
            <span className="text-gray-800">{user?.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Account Created</span>
            <span className="text-gray-800">{createdDate}</span>
          </div>

          {/* Profile Completion */}
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm font-medium">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-secondary h-3 rounded-full transition-all"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>

      
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
