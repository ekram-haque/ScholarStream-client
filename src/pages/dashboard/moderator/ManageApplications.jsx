import { motion } from "framer-motion";

const ManageApplications = ({ applications }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Applications</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">
        <table className="table w-full text-gray-700">
          <thead className="bg-indigo-50">
            <tr>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="hover:bg-indigo-50 transition-all">
                <td>{app.userName}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td>{app.feedback || "N/A"}</td>
                <td>
                  <span className={`badge ${app.applicationStatus === "pending" ? "badge-warning" : app.applicationStatus === "processing" ? "badge-info" : "badge-success"}`}>
                    {app.applicationStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${app.paymentStatus === "unpaid" ? "badge-error" : "badge-success"}`}>
                    {app.paymentStatus}
                  </span>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-primary hover:scale-105 transition-transform">Details</button>
                  <button className="btn btn-xs btn-info hover:scale-105 transition-transform">Feedback</button>
                  <button className="btn btn-xs btn-success hover:scale-105 transition-transform">Process</button>
                  <button className="btn btn-xs btn-error hover:scale-105 transition-transform">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageApplications;
