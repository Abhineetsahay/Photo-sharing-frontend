import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
  logOutHandler: () => void;
}

const Navbar = ({ logOutHandler }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      className="bg-[#183D3D] text-white p-4 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* For Big Screen */}
        <div className="flex items-center space-x-4">
          <motion.h1
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Photo Share
          </motion.h1>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/userprofile"
            className="hover:text-gray-300 text-lg transition-colors duration-300"
          >
            User Profile
          </Link>
          <Link
            to="/upload"
            className="hover:text-gray-300 text-lg transition-colors duration-300"
          >
            Upload Photo
          </Link>
          <Link
            to="/upload"
            className="hover:text-gray-300 text-lg transition-colors duration-300"
          >
            Search People
          </Link>
        </div>

        <motion.div
          className="hidden md:flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={logOutHandler}
            className="bg-[#93B1A6] hover:bg-white text-white hover:text-[#93B1A6] font-semibold py-2 px-4 rounded focus:outline-none"
          >
            Logout
          </button>
        </motion.div>

        {/* For Small Screen */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={toggleMenu}
            className="text-white text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ☰
          </motion.button>
        </div>
      </div>

      {/* Small Screen Dropdown Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden mt-4 space-y-4 bg-[#183D3D] p-4 rounded-lg shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/userprofile"
            className="block hover:text-gray-300 text-lg text-white"
            onClick={toggleMenu}
          >
            User Profile
          </Link>
          <Link
            to="/upload"
            className="block hover:text-gray-300 text-lg text-white"
            onClick={toggleMenu}
          >
            Upload Photo
          </Link>
          <button
            onClick={() => {
              logOutHandler();
              toggleMenu();
            }}
            className="block w-full bg-[#93B1A6] hover:bg-white text-white hover:text-[#93B1A6] font-semibold py-2 px-4 rounded focus:outline-none"
          >
            Logout
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
