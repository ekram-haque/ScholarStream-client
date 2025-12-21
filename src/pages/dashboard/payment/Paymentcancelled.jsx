import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <FaTimesCircle className="text-red-600 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again.
        </p>
        <Link
          to="/dashboard/my-applications"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          Back to My Applications
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
