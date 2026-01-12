import React from "react";
import Logo from "../logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOutUser } = useAuth();

  const handleLogout = () => {
    logOutUser().catch(console.error);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships">All Scholarships</NavLink>
      </li>
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-primary text-secondary shadow-md">
      <div className="navbar w-11/12 mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
              {!user && (
                <>
                  <li>
                    <NavLink to="/authentication/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/authentication/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link to="/" className="text-xl">
            <Logo />
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/authentication/login"
                className="px-4 py-2 rounded-xl bg-secondary text-primary font-medium"
              >
                Login
              </Link>
              <Link
                to="/authentication/register"
                className="px-4 py-2 rounded-xl border border-secondary text-secondary font-medium"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className=" avatar cursor-pointer"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kRrY1F/user.png"}
                    alt="profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-48 "
              >
                <li className="hover:bg-secondary hover:text-primary">
                  <NavLink to="/my-profile">
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
                    My Profile
                  </NavLink>
                </li>
                <li className="hover:bg-secondary hover:text-primary">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
