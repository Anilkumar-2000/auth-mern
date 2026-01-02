import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  
  const submitForm = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          toast.success(data.message);
          getUserData();
          navigate("/");
        } else {
          toast.error(error.response?.data?.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          toast.success(data.message);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 px-7 ">
      <img
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        src={assets.logo}
      />
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg  text-indigo-300 w-full sm:w-96 text-sm ">
        <h2 className="text-3xl font-semibold text-center text-white mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6 ">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login to your Account"}
        </p>
        <form onSubmit={submitForm}>
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 bg-[#333A5C] rounded-full w-full px-5 py-2.5 mb-4">
              <img src={assets.person_icon} alt="" className="" />
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                placeholder="Full Name"
                className="bg-transparent outline-none"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-3 bg-[#333A5C] rounded-full w-full px-5 py-2.5 mb-4">
            <img src={assets.mail_icon} alt="" className="" />
            <input
              type="email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email id"
              value={formData.email}
              className="bg-transparent outline-none"
              required
            />
          </div>
          <div className="flex items-center gap-3 bg-[#333A5C] rounded-full w-full px-5 py-2.5 mb-4 ">
            <img src={assets.lock_icon} alt="" className="" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              className="bg-transparent outline-none"
              required
            />
            <button
              type="button"
              className="pl-6"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p
            className="text-sm text-indigo-500 mb-5 cursor-pointer"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password
          </p>
          <button
            type="submit"
            className="bg-gradient-to-br from-indigo-500 to-indigo-900 rounded-full px-5 py-2.5 w-full  transition-transform duration-300 hover:scale-105 hover:shadow-lg  text-white"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-500 mt-3 text-center ">
            Already have an account{" "}
            <span
              className="cursor-pointer text-blue-400"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-500 mt-3 text-center ">
            Don't have an account{" "}
            <span
              className="cursor-pointer text-blue-400"
              onClick={() => setState("Sign Up")}
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
