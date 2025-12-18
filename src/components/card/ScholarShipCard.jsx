import { Link } from "react-router";


const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    universityImage,
    universityName,
    scholarshipCategory,
    universityCountry,
    applicationFees,
  } = scholarship;

  return (
    <div className="card bg-base-100 shadow-md h-full">
      <figure>
        <img
          src={universityImage}
          alt={universityName}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{universityName}</h2>
        <p>Category: {scholarshipCategory}</p>
        <p>Country: {universityCountry}</p>
        <p className="font-semibold">
          Application Fee: ${applicationFees}
        </p>

        <div className="card-actions justify-end">
          <Link to={`/scholarships/${_id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
