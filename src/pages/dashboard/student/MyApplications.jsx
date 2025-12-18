import { motion } from "framer-motion";

const MyApplications = ({ applications }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Applications</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">
        <table className="table w-full text-gray-700">
          <thead className="bg-indigo-50">
            <tr>
              <th>University</th>
              <th>Feedback</th>
              <th>Subject</th>
              <th>Application Fees</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="hover:bg-indigo-50 transition-all">
                <td>{app.universityName}</td>
                <td>{app.feedback || "N/A"}</td>
                <td>{app.subjectCategory}</td>
                <td>${app.applicationFees}</td>
                <td>
                  <span className={`badge ${app.applicationStatus === "pending" ? "badge-warning" : app.applicationStatus === "completed" ? "badge-success" : "badge-info"}`}>
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
                  {app.applicationStatus === "pending" && app.paymentStatus === "unpaid" && (
                    <button className="btn btn-xs btn-success hover:scale-105 transition-transform">Pay</button>
                  )}
                  {app.applicationStatus === "pending" && (
                    <button className="btn btn-xs btn-error hover:scale-105 transition-transform">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyApplications;
