import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    universityImage,
    universityName,
    scholarshipCategory,
    universityCountry,
    universityCity,
    universityWorldRank,
    applicationFees,
  } = scholarship;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">

      {/* Image Section */}
      <div className="relative">
        <img
          src={universityImage}
          alt={universityName}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

       
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        <div className="flex gap-4 mb-4">



         {/* Scholarship Category */}
        <span className="  bg-secondary   text-xs font-semibold px-3 py-1 rounded-lg shadow">
          {scholarshipCategory}
        </span>

        {/* World Rank */}
        {universityWorldRank && (
          <span className="  bg-secondary text-gray-900 text-xs font-semibold px-3 py-1 rounded-lg shadow">
            🌍 Rank #{universityWorldRank}
          </span>
        )}
        </div>

        {/* University Name */}
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {universityName}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500 mt-1">
          {universityCity ? `${universityCity}, ` : ""}
          {universityCountry}
        </p>

        

        {/* Divider */}
        <div className="my-4 border-t border-secondary"></div>

        {/* Fee */}
        <div className="flex  items-center text-sm mb-4">
          <span className="text-gray-600 mr-2">Application Fee :  </span>
          <span className={`font-semibold ${applicationFees === 0 ? "text-green-600" : "text-gray-900"}`}>
            {applicationFees === 0 ? "Free" : `$${applicationFees}`}
          </span>
        </div>

        {/* CTA */}
        <Link
          to={`/scholarships/${_id}`}
          className="mt-auto inline-flex justify-center items-center px-4 py-2 rounded-lg text-sm font-medium border border-secondary text-primary hover:bg-secondary hover:scale-105 transition transform"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
