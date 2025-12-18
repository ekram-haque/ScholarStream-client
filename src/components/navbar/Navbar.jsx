import React from "react";
import Logo from "../logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {

  const {user,logOutUser} = useAuth();

  const handleLogout = () =>{
    logOutUser()
     .then((result) => {
        console.log(result.user)
    }).catch((err) => {
        console.log(err)
    });
  }

 


  const links = (
    <>
      <li>
       <NavLink to={'/'} >Home</NavLink>
      </li>
      <li>
        <NavLink to={'all-scholarships'}>All ScholarShip</NavLink>
      </li>
      
      {
        user && <>
        <li>
        <NavLink to={'/dashboard/my-profile'}>Dashboard</NavLink>
      </li>
        </>
      }
    </>
  );
  return (
    <div className="navbar bg-primary text-secondary shadow-sm rounded-lg mt-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn  lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={`/`} className="  text-xl">
         <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">

      {
        user? 
        <Link  onClick={handleLogout} className=" px-3 py-2 rounded-xl bg-secondary text-primary">Log out</Link>
        :<Link to={`/authentication/login`} className=" px-3 py-2 rounded-xl bg-secondary text-primary">Login</Link>
      }
      </div>
    </div>
  );
};

export default Navbar;
