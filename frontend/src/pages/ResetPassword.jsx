import React from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
const ResetPassword = () => {
  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const handleSubmitEmail = async (e) => {
    try {
      e.preventDefault();
      console.log(email);

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    setOtp(otp);
    setIsOtpSubmitted(true);
  };

  const handleSubmitNewPassword = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 px-7 ">
        <img
          onClick={() => navigate("/")}
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
          src={assets.logo}
        />
        {!isEmailSent && (
          <form
            onSubmit={handleSubmitEmail}
            className="bg-slate-900 p-10 rounded-xl shadow-lg  text-indigo-300 w-full sm:w-96 text-sm "
          >
            <h2 className="text-3xl font-semibold text-center text-white mb-3">
              Reset Password
            </h2>
            <p className="text-center text-sm mb-6">
              Enter your registered mail address
            </p>
            <div className="bg-[#333A5C] rounded-full w-full flex items-center gap-3 px-5 py-2.5">
              <img src={assets.mail_icon} alt="" className="" />
              <input
                className="bg-transparent outline-none"
                placeholder="Email id"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-br from-indigo-500 to-indigo-900 rounded-full px-5 py-2.5 w-full  transition-transform duration-300 hover:scale-105 hover:shadow-lg  text-white mt-5 "
            >
              Reset Password
            </button>
          </form>
        )}
        {/* OTP Verification Form */}
        {!isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={handleSubmitOtp}
            className="bg-slate-900 p-10 rounded-xl shadow-lg  text-indigo-300 w-full sm:w-96 text-sm mt-5 mb-5 "
          >
            <h1 className="text-3xl font-semibold text-center text-white mb-3">
              Email Verify
            </h1>
            <p className="text-center text-sm mb-6">
              {" "}
              Enter the 6-digit code send to your email
            </p>
            <div
              className="flex justify-between"
              onPaste={(e) => handlePaste(e)}
            >
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
        )}

        {/* New Password Form */}
        {isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={handleSubmitNewPassword}
            className="bg-slate-900 p-10 rounded-xl shadow-lg  text-indigo-300 w-full sm:w-96 text-sm "
          >
            <h2 className="text-3xl font-semibold text-center text-white mb-3">
              New Password
            </h2>
            <p className="text-center text-sm mb-6">
              Enter the new password below
            </p>
            <div className="bg-[#333A5C] rounded-full w-full flex items-center gap-3 px-5 py-2.5">
              <img src={assets.lock_icon} alt="" className="" />
              <input
                className="bg-transparent outline-none"
                placeholder="Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-br from-indigo-500 to-indigo-900 rounded-full px-5 py-2.5 w-full  transition-transform duration-300 hover:scale-105 hover:shadow-lg  text-white mt-5 "
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
