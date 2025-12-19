import React, { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
const Sidebar = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role?email=${user.email}`)
        .then((res) => setRole(res.data?.role || ""))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  if (loading) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  return (
    <div>
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <Link
            to={"/"}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Homepage"
          >
            {/* Home icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>

        <li>
          <Link
            to={"/dashboard/my-profile"}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Profile"
          >
            {/* profile icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
              <path d="M6 20v-2c0-2.21 3.58-4 6-4s6 1.79 6 4v2"></path>
            </svg>
            <span className="is-drawer-close:hidden">Profile</span>
          </Link>
        </li>

        {role === "admin" && (
          <>
            <li>
              <Link
                to={"/dashboard/add-scholarship"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="add-scholarship"
              >
                {/* Add Scholarship icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M22 10L12 5 2 10l10 5 10-5z" />
                  <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
                  <path d="M12 8v4" />
                  <path d="M10 10h4" />
                </svg>
                <span className="is-drawer-close:hidden">Add Scholarship</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/manage-scholarship"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="manage-scholarship"
              >
                {/* manage-scholarship icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M9 2H15a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                  <path d="M9 6h6" />
                  <path d="M9 10h6" />
                  <path d="M9 14h6" />
                </svg>

                <span className="is-drawer-close:hidden">
                  Manage-Scholarship
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/manage-users"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Users"
              >
                {/* Manage Users icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="is-drawer-close:hidden">Manage Users</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/analytics"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="analytics"
              >
                {/* Analytics icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M3 3v18h18" />
                  <path d="M9 17v-6" />
                  <path d="M13 17v-10" />
                  <path d="M17 17v-4" />
                </svg>
                <span className="is-drawer-close:hidden">Analytics</span>
              </Link>
            </li>
          </>
        )}

        {role === "moderator" && (
          <>
            <li>
              <Link
                to={"/dashboard/manage-applications"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip=" Manage Applications"
              >
                {/*  Manage Applications icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M3 4h18v2H3z" />
                  <path d="M3 10h18v2H3z" />
                  <path d="M3 16h18v2H3z" />
                </svg>
                <span className="is-drawer-close:hidden">
                  {" "}
                  Manage Applications
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/all-reviews"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip=" All Reviews"
              >
                {/*  All Reviews icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>

                <span className="is-drawer-close:hidden"> All Reviews</span>
              </Link>
            </li>
          </>
        )}

        {role === "student" && (
          <>
            <li>
              <Link
                to={"/dashboard/my-applications"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Applications"
              >
                {/* My Applications icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                <span className="is-drawer-close:hidden">My Applications</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/my-reviews"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Reviews"
              >
                {/* My Reviews icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span className="is-drawer-close:hidden">My Reviews</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
