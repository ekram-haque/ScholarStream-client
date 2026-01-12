import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/scholarships/${id}`)
      .then((res) => {
        setScholarship(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-semibold animate-pulse">
        Loading scholarship...
      </p>
    );
  }

  if (!scholarship) {
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-semibold">
        Scholarship not found!
      </p>
    );
  }

  const {
    universityImage,
    universityName,
    scholarshipCategory,
    universityCountry,
    degree,
    applicationFees,
    serviceCharge,
    scholarshipDescription,
    universityWorldRank,
    subjectCategory,
  } = scholarship;

  const handleApply = async () => {
    if (!user) return navigate("/authentication/login");

    const applicationData = {
      scholarshipId: scholarship._id,
      userName: user.displayName,
      universityName,
      subjectCategory,
      degree,
      applicationFees,
      serviceCharge,
    };

    try {
      const res = await axiosSecure.post("/applications", applicationData);
      if (res.data.insertedId) {
        alert("Application submitted successfully!");
        navigate("/dashboard/my-applications");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-25">
      <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-2xl shadow-2xl p-20">
        {/* LEFT IMAGE */}
        <div className="relative">
          <img
            src={universityImage}
            alt={universityName}
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-5">
          <p className="uppercase tracking-wide  ">
            <span
              className="border border-gray-300 
                   px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-primary hover:text-white"
            >
              {" "}
              {scholarshipCategory}
            </span>
          </p>

          <h1 className="text-3xl font-bold text-gray-800">{universityName}</h1>

          <p className="text-gray-600 leading-relaxed">
            {scholarshipDescription}
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <span
              className="flex items-center gap-1 border border-gray-300 
                   px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-primary hover:text-white"
            >
              Degree: <span className="font-semibold">{degree}</span>
            </span>

            <span
              className="flex items-center gap-1 border border-gray-300 
                   px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-primary hover:text-white"
            >
              Subject: <span className="font-semibold">{subjectCategory}</span>
            </span>

            <span
              className="flex items-center gap-1 border border-gray-300 
                   px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-primary hover:text-white"
            >
              Country:{" "}
              <span className="font-semibold ">{universityCountry}</span>
            </span>

            {universityWorldRank && (
              <span
                className="flex items-center gap-1 border border-gray-300 
                     px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-primary hover:text-white"
              >
                World Rank:{" "}
                <span className="font-semibold">{universityWorldRank}</span>
              </span>
            )}
          </div>

          {/* PRICE STYLE SECTION */}
          <div className="flex items-center justify-between pt-6 border-t">
            {/* LEFT INFO */}
            <div className="space-y-2">
              <div className="flex justify-between gap-8 text-sm text-gray-500">
                <span>Application Fee</span>
                <span className="font-medium text-gray-800">
                  {applicationFees === 0 ? "Free" : `$${applicationFees}`}
                </span>
              </div>

              <div className="flex justify-between gap-8 text-sm text-gray-500">
                <span>Service Charge</span>
                <span className="font-medium text-gray-800">
                  ${serviceCharge}
                </span>
              </div>

              <div className="flex justify-between gap-8 pt-2 border-t">
                <span className="text-sm font-semibold text-gray-700">
                  Total
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${Number(applicationFees || 0) + Number(serviceCharge || 0)}
                </span>
              </div>
            </div>

            {/* RIGHT BUTTON */}
            <button
              onClick={handleApply}
              className="bg-secondary text-black px-10 py-3 rounded-full 
               font-semibold shadow-md 
               hover:shadow-lg hover:scale-105 transition hover:bg-primary hover:text-white"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
