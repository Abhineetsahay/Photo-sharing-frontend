import { useEffect } from "react";
import useTokenValidation from "../hooks/TokenValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../utils/Url";

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
    <div>
      <h1>In User Component</h1>
      {isValid ? <p>Welcome, authenticated user!</p> : <p>Please log in.</p>}
      <button
        onClick={logOutHandler}
        className="mt-4 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Log Out
      </button>
    </div>
  );
};

export default User;
