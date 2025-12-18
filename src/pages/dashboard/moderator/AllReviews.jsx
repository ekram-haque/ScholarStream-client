import { motion } from "framer-motion";

const AllReviews = ({ reviews }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map(review => (
          <div key={review._id} className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-2">
              <img src={review.userImage} alt="user" className="w-12 h-12 rounded-full"/>
              <div>
                <h3 className="font-semibold text-gray-700">{review.userName}</h3>
                <p className="text-gray-500 text-sm">{review.reviewDate}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{review.reviewComment}</p>
            <p className="text-yellow-500 font-semibold">Rating: {"⭐".repeat(review.ratingPoint)}</p>
            <button className="btn btn-xs btn-error mt-2 hover:scale-105 transition-transform">Delete</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllReviews;
