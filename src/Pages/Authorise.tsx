import { useState, useEffect } from "react";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import useTokenValidation from "../hooks/TokenValidation";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
      <div className="flex items-center justify-center h-screen bg-[#183D3D]">
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center h-screen bg-[#dfdcdc]"
    >
      <motion.div
        className="p-6 m-2 bg-[#183D3D] shadow-lg rounded-lg max-w-md w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isRegister ? <Register /> : <Login />}
        <motion.button
          onClick={toggleView}
          className="mt-4 px-6 py-2 text-white bg-[#21684e] rounded hover:bg-white hover:text-[#264a3d] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#93B1A6] focus:ring-opacity-75"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRegister ? "Switch to Login" : "Switch to Register"}
        </motion.button>
      </motion.div> 
    </motion.div>
      </div>
  );
};

export default Authorize;
