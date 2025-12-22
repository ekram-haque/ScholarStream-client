import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTimes, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal states
  const [detailsModal, setDetailsModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  // Fetch user applications
  useEffect(() => {
    if (!user) return;
    axiosSecure
      .get("/applications", { params: { email: user.email } })
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  // Delete application
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await axiosSecure.delete(`/applications/${id}`);
      if (res.data.deletedCount > 0) {
        alert("Application deleted successfully!");
        setApplications((prev) => prev.filter((app) => app._id !== id));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete");
    }
  };

  // Edit application modal
  const handleEdit = (app) => {
    setSelectedApp(app);
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axiosSecure.patch(`/applications/${selectedApp._id}`, selectedApp);
      setApplications((prev) =>
        prev.map((app) => (app._id === selectedApp._id ? res.data : app))
      );
      setEditModal(false);
      alert("Application updated!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update");
    }
  };

  // Payment redirect
 const handlePay = (appId) => {
  navigate(`/dashboard/payment/${appId}`);
};
  // Details modal
  const handleDetails = (app) => {
    setSelectedApp(app);
    setDetailsModal(true);
  };

  // Add Review modal
  const handleAddReview = (app) => {
    setSelectedApp(app);
    setReviewData({ rating: 5, comment: "" });
    setReviewModal(true);
  };

const handleSubmitReview = async () => {
  try {
    await axiosSecure.post("/reviews", {
      applicationId: selectedApp._id,
      ratingPoint: Number(reviewData.rating),
      reviewComment: reviewData.comment,
    });

    alert("Review submitted successfully!");
    setReviewModal(false);
    setReviewData({ rating: 5, comment: "" });

  } catch (error) {
    alert(error.response?.data?.message || "Failed to submit review");
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
      </div>
    );
  }

  if (applications.length === 0) {
    return <p className="text-center p-10 text-gray-500">No applications found.</p>;
  }

  return (
    <div className="p-6 bg-[#e7fafc]">
      <h2 className="text-3xl font-bold mb-6 ">My Applications</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">
        <table className="table w-full text-gray-700">
          <thead className="bg-primary text-secondary ">
            <tr>
              <th className="px-4 py-2 text-left">University</th>
              
              <th className="px-4 py-2 text-left">Feedback</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Fees</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-[#e7fafc] transition">
                <td className="px-4 py-2">{app.universityName}</td>
                <td className="px-4 py-2">{app.feedback || "-"}</td>
                <td className="px-4 py-2">{app.subjectCategory}</td>
                <td className="px-4 py-2">${app.applicationFees + app.serviceCharge}</td>
                <td className="px-4 py-2">{app.applicationStatus}</td>
                <td className="px-4 py-2 flex flex-wrap gap-1">
                  <button
                    onClick={() => handleDetails(app)}
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                  >
                    Details
                  </button>

                  {app.applicationStatus === "pending" && (
                    <>
                      <Link
                        onClick={() => handleEdit(app)}
                        className="px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition"
                      >
                        Edit
                      </Link>
                      {app.paymentStatus === "unpaid" && (
                        <Link
                          onClick={() => handlePay(app._id)}
                          className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
                        >
                          Pay
                        </Link>
                      )}
                      <Link
                        onClick={() => handleDelete(app._id)}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </Link>
                    </>
                  )}

                  {app.applicationStatus === "approved" && (
                    <Link
                      onClick={() => handleAddReview(app)}
                      className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                    >
                      Add Review
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {detailsModal && selectedApp && (
        <Modal title="Application Details" onClose={() => setDetailsModal(false)}>
          <DetailsContent app={selectedApp} />
        </Modal>
      )}

      {/* Edit Modal */}
      {editModal && selectedApp && (
        <Modal title="Edit Application" onClose={() => setEditModal(false)}>
          <div className="space-y-3">
            <label className="block">
              University Name:
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedApp.universityName}
                onChange={(e) => setSelectedApp({ ...selectedApp, universityName: e.target.value })}
              />
            </label>
            <label className="block">
              Subject:
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedApp.subjectCategory}
                onChange={(e) => setSelectedApp({ ...selectedApp, subjectCategory: e.target.value })}
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setEditModal(false)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition">Cancel</button>
              <button onClick={handleSaveEdit} className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">Save</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Review Modal */}
      {reviewModal && selectedApp && (
        <Modal title="Add Review" onClose={() => setReviewModal(false)}>
          <div className="space-y-3">
            <label className="block">
              Rating (1-5):
              <input
                type="number"
                min="1"
                max="5"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={reviewData.rating}
                onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
              />
            </label>
            <label className="block">
              Comment:
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setReviewModal(false)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition">Cancel</button>
              <button onClick={handleSubmitReview} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Submit</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-lg">
          <FaTimes />
        </button>
      </div>
      {children}
    </div>
  </div>
);

// Details content
const DetailsContent = ({ app }) => (
  <div className="space-y-2 text-sm text-gray-700">
    <p><strong>University:</strong> {app.universityName}</p>
    <p><strong>Address:</strong> {app.universityAddress || "-"}</p>
    <p><strong>Subject:</strong> {app.subjectCategory}</p>
    <p><strong>Fees:</strong> ${app.applicationFees}</p>
    <p><strong>Status:</strong> {app.applicationStatus}</p>
    <p><strong>Payment:</strong> {app.paymentStatus}</p>
    <p><strong>Feedback:</strong> {app.feedback || "-"}</p>
  </div>
);

export default MyApplications;
