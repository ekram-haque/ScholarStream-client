import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ScholarshipCard from "../components/card/ScholarShipCard";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const limit = 6;
  const totalPages = Math.ceil(count / limit);

  useEffect(() => {
    axiosSecure
      .get(
        `/scholarships?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        setScholarships(res.data.scholarships);
        setCount(res.data.total);
      })
      .catch((err) => console.error(err));
  }, [search, category, sort, page, axiosSecure]);

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        All Scholarships
      </h1>

      {/* Search & Filter */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, university or degree"
          className="input input-bordered md:col-span-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self Fund">Self Fund</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="fee_asc">Fee Low → High</option>
          <option value="fee_desc">Fee High → Low</option>
          <option value="date_desc">Newest</option>
        </select>
      </div>

      {/* Scholarships Grid or No Results */}
      {search.trim() !== "" && scholarships.length === 0 ? (
        <p className="p-6 text-center text-gray-500">No Scholarships found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship._id}
              scholarship={scholarship}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
