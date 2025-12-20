import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ModeratorReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/moderator/reviews");
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      alert("Review deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  if (loading) return <p className="p-6">Loading reviews...</p>;

  return (
    <div className="p-6 bg-[#e7fafc]">
      <h2 className="text-3xl font-bold mb-6">All Reviews</h2>

      <table className="overflow-x-auto w-full bg-white shadow-lg rounded-xl ">
        <thead>
          <tr className="bg-primary text-secondary">
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Student Email</th>
            <th className="px-4 py-2">Scholarship</th>
            <th className="px-4 py-2">University</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id} className="hover:bg-[#e7fafc] transition-all border border-gray-200 p-4">
              <td className="px-4 py-2">{r.userName || r.displayName}</td>
              <td className="px-4 py-2">{r.userEmail}</td>
              <td className="px-4 py-2">{r.scholarshipName}</td>
              <td className="px-4 py-2">{r.universityName}</td>
              <td className="px-4 py-2">{r.reviewComment}</td>
              <td className="px-4 py-2">{r.ratingPoint}</td>
              <td className="px-4 py-2">{new Date(r.reviewDate || r.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorReviews;
