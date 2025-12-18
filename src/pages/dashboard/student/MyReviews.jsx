import { motion } from "framer-motion";

const MyReviews = ({ reviews }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map(review => (
          <div key={review._id} className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="font-semibold text-gray-700">{review.scholarshipName}</h3>
            <p className="text-gray-500 text-sm">{review.universityName}</p>
            <p className="text-gray-600 mt-2">{review.reviewComment}</p>
            <p className="text-yellow-500 font-semibold mt-1">Rating: {"⭐".repeat(review.ratingPoint)}</p>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-xs btn-info hover:scale-105 transition-transform">Edit</button>
              <button className="btn btn-xs btn-error hover:scale-105 transition-transform">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyReviews;
