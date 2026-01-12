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
    <div className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl group">

      {/* IMAGE */}
      <img
        src={universityImage}
        alt={universityName}
        className="h-[380px] w-full object-cover group-hover:scale-105 transition duration-500"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* CONTENT */}
      <div className="absolute bottom-0 p-5 text-white w-full space-y-3">

        {/* TOP TAGS */}
        <div className="flex gap-2 text-xs">
          <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full">
            {scholarshipCategory}
          </span>

          {universityWorldRank && (
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full">
              🌍 #{universityWorldRank}
            </span>
          )}
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-semibold leading-tight">
          {universityName}
        </h3>

        {/* LOCATION */}
        <p className="text-sm text-gray-200">
          {universityCity ? `${universityCity}, ` : ""}
          {universityCountry}
        </p>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between pt-3">
          <div className="text-sm">
            <p className="text-gray-300">Application Fee</p>
            <p className="text-lg font-bold">
              {applicationFees === 0 ? "Free" : `$${applicationFees}`}
            </p>
          </div>

          <Link
            to={`/scholarships/${_id}`}
            className="bg-white text-black px-6 py-2 rounded-full 
                       text-sm font-semibold shadow 
                       hover:scale-105 transition hover:bg-primary hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
