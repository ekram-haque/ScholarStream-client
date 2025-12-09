import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/logo/Logo";
import authimg from "../../public/auth-img.jpg";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="w-11/12 mx-auto ">
      <div className="bg-primary my-2 rounded-lg ml-5 mr-[85%]">
        <Logo />
      </div>

      <div className="flex justify-around items-center">
        <Outlet />
        <motion.img
          src={authimg}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
