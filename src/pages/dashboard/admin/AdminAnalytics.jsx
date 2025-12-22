import React, { useEffect, useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Register chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/dashboard/analytics")
      .then(res => setAnalytics(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  // ---------- BAR CHART ----------
  const barData = useMemo(() => {
    const data = analytics?.applicationsPerUniversity || {};
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Applications",
          data: Object.values(data),
          backgroundColor: "#6366F1",
          borderRadius: 8,
          barThickness: 30,
        },
      ],
    };
  }, [analytics]);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Applications per University",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  // ---------- PIE CHART ----------
  const pieData = useMemo(() => {
    const data = analytics?.applicationsPerCategory || {};
    const colors = [
      "#6366F1",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#0EA5E9",
    ];

    return {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    };
  }, [analytics]);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Applications by Category",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  if (loading) return <p className="text-center mt-10">Loading analytics...</p>;
  if (!analytics) return <p className="text-center mt-10">No analytics data</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Total Users</p>
          <h3 className="text-3xl font-bold text-indigo-600">
            {analytics.totalUsers}
          </h3>
        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Total Scholarships</p>
          <h3 className="text-3xl font-bold text-green-600">
            {analytics.totalScholarships}
          </h3>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Fees Collected</p>
          <h3 className="text-3xl font-bold text-yellow-600">
            ${analytics.totalFeesCollected}
          </h3>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR */}
        <div className="bg-white rounded-xl shadow p-4 h-[320px]">
          {barData.labels.length ? (
            <Bar data={barData} options={barOptions} />
          ) : (
            <p className="text-center mt-20 text-gray-500">
              No application data
            </p>
          )}
        </div>

        {/* PIE */}
        <div className="bg-white rounded-xl shadow p-4 h-[320px]">
          {pieData.labels.length ? (
            <Pie data={pieData} options={pieOptions} />
          ) : (
            <p className="text-center mt-20 text-gray-500">
              No category data
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
