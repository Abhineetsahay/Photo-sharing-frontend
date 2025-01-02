import { useState, useEffect } from "react";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import useTokenValidation from "../hooks/TokenValidation";
import { useNavigate } from "react-router-dom";

const Authorize = () => {
  const [isRegister, setIsRegister] = useState(true);
  const { loading, isValid } = useTokenValidation();
  const navigate = useNavigate();

  const toggleView = () => {
    setIsRegister((prev) => !prev);
  };

  useEffect(() => {
    if (!loading && isValid) {
      navigate("/UserProfile");
    }
  }, [loading, isValid, navigate]); 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full text-center">
        {isRegister ? <Register /> : <Login />}
        <button
          onClick={toggleView}
          className="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {isRegister ? "Switch to Login" : "Switch to Register"}
        </button>
      </div>
    </div>
  );
};

export default Authorize;
