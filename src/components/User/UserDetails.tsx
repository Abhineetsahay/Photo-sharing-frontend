import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { url } from "../../utils/Url";
import { motion } from "framer-motion";

interface UserDetailsType {
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  _id: string;
}

const UserDetails = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = cookies.get("accessToken");
        const refreshToken = cookies.get("refreshToken");

        if (!accessToken || !refreshToken) {
          setError("Tokens not found in cookies.");
          setLoading(false);
          return;
        }

        const { id } = jwtDecode<{ id: string }>(accessToken);

        const response = await axios.get(`${url}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Refresh-Token": refreshToken,
          },
          withCredentials: true,
        });

        setUserDetails(response.data.user);
        setError("");
      } catch (error) {
        setError("Error while fetching user details.");
        console.error("Error while fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [cookies]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-5/6 bg-gray-900 text-gray-300">
        <motion.h1
          className="text-xl font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-gray-300">
        <motion.h1
          className="text-xl font-medium text-red-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Error: {error}
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[88%] bg-gray-900">
      <motion.div
        className="w-full max-w-md bg-[#040D12] shadow-lg rounded-lg p-6 text-gray-300"
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{
          duration: 1.25,
          ease: [1, 0.6, 0.6, 1],
          delay: 0.5,
        }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={userDetails?.profilePicture || "default-profile-picture-url"}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md mb-4"
          />
          <h1 className="text-2xl font-semibold text-white">
            {userDetails?.username}
          </h1>
          <p className="text-sm text-gray-400">{userDetails?.email}</p>
        </motion.div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-medium text-white">Profile Details</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-400">
              <strong>Joined:</strong>{" "}
              {new Date(userDetails?.createdAt || "").toDateString()}
            </p>
          </div>
        </motion.div>
        <motion.button
          className="mt-6 w-full bg-[#183D3D] text-gray-300  font-semibold py-2 px-4 rounded focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Edit Profile
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UserDetails;
