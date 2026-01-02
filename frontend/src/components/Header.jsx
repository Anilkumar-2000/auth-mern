import React from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData, backendUrl, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  console.log("user data", userData);

  return (
    <div className="flex flex-col items-center  gap-2 text-gray-800 ">
      <img src={assets.header_img} className="w-36 h-36  rounded-full mb-2" />
      <h1 className="flex justify-center gap-3 items-center font-semibold text-xl sm:text-3xl ">
        Hey{" "}
        {userData
          ? userData.user[0].toUpperCase() + userData.user.slice(1)
          : "Developers"}{" "}
        <img src={assets.hand_wave} alt="" className="aspect-square w-8" />
      </h1>
      <h1 className="text-3xl sm:text-5xl font-semibold ">
        Welcome to our app
      </h1>
      <p className="text-1xl font-medium text-center">
        Let's start with product tour. We will have you up and running in no
        time!.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="border border-gray-500 rounded-full px-8 py-3 mt-2.5 hover:bg-gray-100  transition-all"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
