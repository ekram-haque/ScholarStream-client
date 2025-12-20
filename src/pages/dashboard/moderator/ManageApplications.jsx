import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Feedback modal state
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    appId: null,
    action: "",
  });
  const [feedbackText, setFeedbackText] = useState("");


useEffect(() => {
  const fetchApplications = async () => {
    try {
      const res = await axiosSecure.get("/moderator/applications");
      setApplications(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  fetchApplications();
}, [axiosSecure]);

  // Handle approve/reject with optional feedback
  const handleModeration = async (id, status, feedback = "") => {
    try {
      const res = await axiosSecure.patch(`/moderator/applications/${id}`, { status, feedback });
      if (res.data.modifiedCount > 0) {
        alert(`Application ${status} successfully!`);
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, applicationStatus: status, feedback } : app
          )
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update application");
    }
  };

  // Open feedback modal
  const openFeedbackModal = (appId, action) => {
    setFeedbackModal({ open: true, appId, action });
    setFeedbackText(""); // reset feedback
  };

  // Submit feedback from modal
  const submitFeedback = () => {
    handleModeration(feedbackModal.appId, feedbackModal.action, feedbackText);
    setFeedbackModal({ open: false, appId: null, action: "" });
  };

  if (loading) return <p className="p-6">Loading applications...</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-[#e7fafc]">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Applications</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">
        <table className="table w-full text-gray-700">
          <thead className="bg-primary text-secondary">
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
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-[#e7fafc] transition-all">
                <td>{app.userName}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td>{app.feedback || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      app.applicationStatus === "pending"
                        ? "badge-warning"
                        : app.applicationStatus === "processing"
                        ? "badge-info"
                        : "badge-success"
                    }`}
                  >
                    {app.applicationStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      app.paymentStatus === "unpaid" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>
                <td className="space-x-2">
                  {/* Details button */}
                  <button
                    onClick={() => alert(JSON.stringify(app, null, 2))}
                    className="btn btn-xs btn-primary hover:scale-105 transition-transform"
                  >
                    Details
                  </button>

                  {/* Approve / Reject buttons */}
                  {app.applicationStatus === "pending" && (
                    <>
                      <button
                        onClick={() => openFeedbackModal(app._id, "approved")}
                        className="btn btn-xs btn-success hover:scale-105 transition-transform"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openFeedbackModal(app._id, "rejected")}
                        className="btn btn-xs btn-error hover:scale-105 transition-transform"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {feedbackModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-2">Provide Feedback</h3>
            <textarea
              className="w-full border p-2 mb-4 rounded"
              placeholder="Enter feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setFeedbackModal({ open: false, appId: null, action: "" })}
                className="btn btn-xs btn-error"
              >
                Cancel
              </button>
              <button onClick={submitFeedback} className="btn btn-xs btn-success">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageApplications;
