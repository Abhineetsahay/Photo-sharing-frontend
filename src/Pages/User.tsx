import { useEffect } from "react";
import useTokenValidation from "../hooks/TokenValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../utils/Url";
import UserDetails from "../components/User/UserDetails";
import Navbar from "../components/User/Navbar";

const User = () => {
  const { loading, isValid } = useTokenValidation();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["refreshToken", "accessToken"]);

  useEffect(() => {
    if (!loading && !isValid) {
      console.warn("User is not authenticated or tokens are invalid.");
      navigate("/authorise");
    }
  }, [loading, isValid, navigate]);

  const logOutHandler = async () => {
    try {
      const res = await axios.post(`${url}/logout`, null, {
        withCredentials: true,
      });

      if (res.status === 200) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        navigate("/authorise");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div><h1>Loading...</h1></div>;
  }

  return (
    <div className="h-screen bg-gray-900">
      <Navbar logOutHandler={logOutHandler} />
      <UserDetails />
    </div>
  );
};

export default User;
