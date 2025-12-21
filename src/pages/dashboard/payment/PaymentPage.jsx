import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaUniversity, FaUser, FaMoneyBillWave } from "react-icons/fa";

const PaymentPage = () => {
  const { id } = useParams(); // application id
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/applications/${id}`)
      .then((res) => {
        setApplication(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-semibold animate-pulse">
        Loading payment info...
      </p>
    );
  }

  if (!application) {
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">
        Application not found
      </p>
    );
  }

  const totalAmount =
    application.applicationFees + application.serviceCharge;

const handlePayment = async () => {
  try {
    const paymentInfo = {
      email: user.email,
      scholarshipName: application.universityName,
      applicationId: application._id, // <-- database record _id
      applicationFees: application.applicationFees,
      serviceCharge: application.serviceCharge,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    window.location.replace(res.data.url);
  } catch (error) {
    console.error(error);
    alert("Payment initiation failed");
  }
};
  return (
    <div className="min-h-screen bg-[#e7fafc] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-primary p-6 text-white">
          <h2 className="text-3xl font-bold">Secure Payment</h2>
          <p className="text-sm opacity-90 mt-1">
            Complete your scholarship application payment
          </p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">

          {/* User Info */}
          <div className="bg-[#e7fafc] rounded-xl p-5 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUser className="text-secondary" />
              Applicant Information
            </h3>
            <p className="text-sm text-gray-700">
              <strong>Name:</strong> {user?.displayName}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {user?.email}
            </p>
          </div>

          {/* Application Info */}
          <div className="bg-[#e7fafc] rounded-xl p-5 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUniversity className="text-secondary" />
              Application Details
            </h3>
            <p className="text-sm text-gray-700">
              <strong>University:</strong> {application.universityName}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Subject:</strong> {application.subjectCategory}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Degree:</strong> {application.degree}
            </p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="px-6 pb-6">
          <div className="bg-[#e7fafc] border border-indigo-200 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-secondary" />
              Payment Summary
            </h3>

            <div className="flex justify-between text-sm mb-2">
              <span>Application Fee</span>
              <span>${application.applicationFees}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Service Charge</span>
              <span>${application.serviceCharge}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold text-secondary">
              <span>Total Amount</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          {/* Pay Button */}
          <button
          onClick={ handlePayment}
            className="w-full mt-6 bg-secondary text-black py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-primary hover:text-white hover:scale-[1.02] transition-transform"
          >
            Proceed to Secure Payment
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            🔒 Your payment is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
