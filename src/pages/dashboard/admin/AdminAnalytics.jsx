import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

const AdminAnalytics = () => {
  const data = {
    labels: ["Scholarship A", "Scholarship B", "Scholarship C"],
    datasets: [
      { label: "Applications", data: [12, 19, 8], backgroundColor: "#6366F1" },
    ],
  };

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      className="p-6"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Platform Analytics</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <Bar data={data} />
      </div>
    </motion.div>
  );
};
export default AdminAnalytics;
