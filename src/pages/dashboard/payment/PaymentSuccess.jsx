import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .patch(`/verify-payment?session_id=${sessionId}`)
      .then((res) => {
        setMessage(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Payment verification failed");
        setLoading(false);
      });
  }, [sessionId, axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium animate-pulse text-gray-500">
          Verifying payment...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#e7fafc] px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-8 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <button
          onClick={() => navigate("/dashboard/my-applications")}
          className="bg-secondary text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-primary hover:text-white transition-transform hover:scale-105"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
