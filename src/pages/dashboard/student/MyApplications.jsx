import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [user,axiosSecure]);

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
    window.location.href = `/payment/${appId}`;
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
        scholarshipName: selectedApp.scholarshipName,
        universityName: selectedApp.universityName,
        ratingPoint: reviewData.rating,
        reviewComment: reviewData.comment,
      });
      alert("Review submitted!");
      setReviewModal(false);
      setReviewData({ rating: 5, comment: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">University</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Feedback</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Fees</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-b">
              <td className="px-4 py-2">{app.universityName}</td>
              <td className="px-4 py-2">{app.universityAddress || "-"}</td>
              <td className="px-4 py-2">{app.feedback || "-"}</td>
              <td className="px-4 py-2">{app.subjectCategory}</td>
              <td className="px-4 py-2">${app.applicationFees}</td>
              <td className="px-4 py-2">{app.applicationStatus}</td>
              <td className="px-4 py-2 space-x-1">
                <button className="btn btn-xs btn-info" onClick={() => handleDetails(app)}>Details</button>

                {app.applicationStatus === "pending" && (
                  <>
                    <button className="btn btn-xs btn-primary" onClick={() => handleEdit(app)}>Edit</button>
                    {app.paymentStatus === "unpaid" && (
                      <button className="btn btn-xs btn-success" onClick={() => handlePay(app._id)}>Pay</button>
                    )}
                    <button className="btn btn-xs btn-error" onClick={() => handleDelete(app._id)}>Delete</button>
                  </>
                )}

                {app.applicationStatus === "approved" && (
                  <button className="btn btn-xs btn-warning" onClick={() => handleAddReview(app)}>Add Review</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {detailsModal && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <p><strong>University:</strong> {selectedApp.universityName}</p>
            <p><strong>Address:</strong> {selectedApp.universityAddress || "-"}</p>
            <p><strong>Subject:</strong> {selectedApp.subjectCategory}</p>
            <p><strong>Fees:</strong> ${selectedApp.applicationFees}</p>
            <p><strong>Status:</strong> {selectedApp.applicationStatus}</p>
            <p><strong>Payment:</strong> {selectedApp.paymentStatus}</p>
            <p><strong>Feedback:</strong> {selectedApp.feedback || "-"}</p>
            <div className="mt-4 text-right">
              <button className="btn btn-sm btn-secondary" onClick={() => setDetailsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Edit Application</h3>
            <label className="block mb-2">
              University Name:
              <input type="text" className="input input-bordered w-full" value={selectedApp.universityName} onChange={(e) => setSelectedApp({...selectedApp, universityName: e.target.value})} />
            </label>
            <label className="block mb-2">
              Subject:
              <input type="text" className="input input-bordered w-full" value={selectedApp.subjectCategory} onChange={(e) => setSelectedApp({...selectedApp, subjectCategory: e.target.value})} />
            </label>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-sm btn-secondary mr-2" onClick={() => setEditModal(false)}>Cancel</button>
              <button className="btn btn-sm btn-primary" onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Add Review</h3>
            <label className="block mb-2">
              Rating (1-5):
              <input type="number" min="1" max="5" className="input input-bordered w-full" value={reviewData.rating} onChange={(e) => setReviewData({...reviewData, rating: e.target.value})} />
            </label>
            <label className="block mb-2">
              Comment:
              <textarea className="textarea textarea-bordered w-full" value={reviewData.comment} onChange={(e) => setReviewData({...reviewData, comment: e.target.value})} />
            </label>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-sm btn-secondary mr-2" onClick={() => setReviewModal(false)}>Cancel</button>
              <button className="btn btn-sm btn-primary" onClick={handleSubmitReview}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
