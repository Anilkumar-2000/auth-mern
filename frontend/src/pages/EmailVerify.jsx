import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const EmailVerify = () => {
  const inputRefs = useRef([]);

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const inputHandler = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    console.log(paste);
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      console.log("OTP Array", otpArray);
      const otp = otpArray.join("");
      console.log("OTP", otp);

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    userData && isLoggedIn && userData.isAccountVerified && navigate("/");
  }, [userData, isLoggedIn]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 px-7">
      <img
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        src={assets.logo}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-xl shadow-lg  text-indigo-300 w-full sm:w-96 text-sm "
      >
        <h1 className="text-3xl font-semibold text-center text-white mb-3">
          Email Verify
        </h1>
        <p className="text-center text-sm mb-6">
          {" "}
          Enter the 6-digit code send to your email
        </p>
        <div className="flex justify-between" onPaste={(e) => handlePaste(e)}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                className="w-12 h-12 rounded-md bg-[#333A5C] text-center text-xl"
                maxLength={1}
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onChange={(e) => inputHandler(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button
          type="submit"
          className="bg-gradient-to-br from-indigo-500 to-indigo-900 rounded-full px-5 py-2.5 w-full mt-10 transition-transform duration-300 hover:scale-105 hover:shadow-lg  text-white"
        >
          Verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
