import { Link } from "react-router";
import { FaHome, FaTachometerAlt } from "react-icons/fa";

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e7fafc] px-4">
      <div className="max-w-xl text-center bg-white rounded-2xl shadow-2xl p-8">

        {/* 404 Title */}
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn bg-secondary text-black hover:bg-primary hover:text-white gap-2"
          >
            <FaHome />
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white gap-2"
          >
            <FaTachometerAlt />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
