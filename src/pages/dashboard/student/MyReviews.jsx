import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTimes, FaStar } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal states
  const [editModal, setEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  // Fetch reviews
  useEffect(() => {
    if (!user) return;

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews", {
          params: { email: user.email },
        });
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, axiosSecure]);

  // Open edit modal
  const handleEdit = (review) => {
    setSelectedReview(review);
    setReviewData({
      rating: Number(review.ratingPoint), // 🔥 IMPORTANT
      comment: review.reviewComment || "",
    });
    setEditModal(true);
  };

  // Save edited review
  const handleSaveEdit = async () => {
  try {
    // Ensure rating is a number
    const ratingNum = Number(reviewData.rating);

    await axiosSecure.patch(`/reviews/${selectedReview._id}`, {
      ratingPoint: ratingNum,
      reviewComment: reviewData.comment,
    });

    // Update UI instantly
    setReviews((prev) =>
      prev.map((r) =>
        r._id === selectedReview._id
          ? {
              ...r,
              ratingPoint: ratingNum,
              reviewComment: reviewData.comment,
            }
          : r
      )
    );

    setEditModal(false);
    alert("Review updated successfully!");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to update review");
  }
};

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axiosSecure.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      alert("Review deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p className="p-6 text-center text-gray-500">No reviews found.</p>;
  }

  return (
    <div className="p-6 bg-[#e7fafc]">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full min-w-[700px] border border-gray-200 rounded-lg">
          <thead className="bg-primary text-secondary">
            <tr>
              <th className="px-4 py-2 text-left">Scholarship</th>
              <th className="px-4 py-2 text-left">University</th>
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((r) => (
              <tr
                key={r._id}
                className="border-b hover:bg-[#e7fafc] transition"
              >
                <td className="px-4 py-2">{r.scholarshipName}</td>
                <td className="px-4 py-2">{r.universityName}</td>
                <td className="px-4 py-2">{r.reviewComment}</td>
                <td className="px-4 py-2">
                  {new Date(r.reviewDate || r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        className={
                          value <= Number(r.ratingPoint)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600"
                      onClick={() => handleEdit(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      onClick={() => handleDelete(r._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModal && selectedReview && (
        <Modal title="Edit Review" onClose={() => setEditModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="font-medium">Rating</label>
              <StarInput
                rating={reviewData.rating}
                setRating={(val) =>
                  setReviewData((prev) => ({ ...prev, rating: val }))
                }
              />
            </div>

            <div>
              <label className="font-medium">Comment</label>
              <textarea
                className="w-full border rounded px-3 py-2 mt-1"
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 bg-indigo-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyReviews;

/* ---------------- Components ---------------- */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <FaTimes />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const StarInput = ({ rating, setRating }) => {
  const currentRating = Number(rating);

  return (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          className={`cursor-pointer transition ${
            value <= currentRating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(value)}
        />
      ))}
    </div>
  );
};
