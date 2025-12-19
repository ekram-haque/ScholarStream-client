import React, { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Chart.js register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure()

  const data = useMemo(() => {
    return {
      labels: ["Scholarship A", "Scholarship B", "Scholarship C"],
      datasets: [
        {
          label: "Applications",
          data: [12, 19, 8],
          backgroundColor: "#6366F1",
        },
      ],
    };
  }, []);

  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Platform Analytics",
        },
      },
    };
  }, []);

  const [analytics, setAnalytics] = useState({});

useEffect(() => {
  axiosSecure.get("/dashboard/analytics")
    .then(res => setAnalytics(res.data))
    .catch(err => console.log(err));
}, []);

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="p-6"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <Bar key={data.labels.join("-")} data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
