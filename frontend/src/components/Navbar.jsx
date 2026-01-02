import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setIsLoggedIn, setUserData } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/email-verify");
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} className="w-28 sm:w-32 border-red-500" />
      {userData ? (
        //  Avatar
        <div className="bg-black cursor-pointer h-11 w-11  rounded-full text-white flex justify-center items-center text-3xl  relative group">
          {userData.user[0].toUpperCase()}
          <div className="hidden group-hover:block text-black pt-2 text-base w-full absolute right-0 top-full min-w-[140px] ">
            <ul className="m-0 p-2 bg-gray-100 text-sm list-none">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2  hover:bg-gray-200"
                >
                  Verify Email
                </li>
              )}
              <li
                className="py-1 px-2 cursor-pointer hover:bg-gray-200 pr-10"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-full text-gray-800 hover:bg-gray-100 transition-all     "
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
