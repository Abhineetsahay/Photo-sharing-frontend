import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { url } from "../../utils/Url";

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-medium text-gray-700">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-medium text-red-500">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={userDetails?.profilePicture || "default-profile-picture-url"}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            {userDetails?.username}
          </h1>
          <p className="text-sm text-gray-500">{userDetails?.email}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700">Profile Details</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <strong>Joined:</strong>{" "}
              {new Date(userDetails?.createdAt || "").toDateString()}
            </p>        
          </div>
        </div>
        <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
