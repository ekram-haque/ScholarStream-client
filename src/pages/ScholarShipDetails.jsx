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
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id,axiosSecure]);

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
    console.log('user',user)

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
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-96 object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {universityName}
          </h1>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
              {scholarshipCategory}
            </span>
            
            {universityWorldRank && (
              <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                World Rank #{universityWorldRank}
              </span>
            )}
          
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">About this Scholarship</h2>
          <p className="text-gray-700 leading-relaxed">{scholarshipDescription}</p>
        </div>

        <div className="space-y-6 p-6 border rounded-xl bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Quick Info</h3>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Application Fee:</span>
            <span className="font-bold text-gray-900">
              {applicationFees === 0 ? "Free" : `$${applicationFees}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Service Charge:</span>
            <span className="font-bold text-gray-900">${serviceCharge}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Degree:</span>
            <span className="font-bold text-gray-900">{degree}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Country:</span>
            <span className="font-bold text-gray-900">{universityCountry}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">subject:</span>
            <span className="font-bold text-gray-900">{subjectCategory}</span>
          </div>
         
          <button
            onClick={handleApply}
            className="w-full bg-secondary  font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transition transform"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
