import { useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";

const useTokenValidation = () => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    const validateTokens = () => {
      const accessToken = cookies.get("accessToken");
      const refreshToken = cookies.get("refreshToken");

      if (accessToken && refreshToken) {
        try {
          const decodedAccessToken = jwtDecode(accessToken);
          const decodedRefreshToken = jwtDecode(refreshToken);
          const currentTime = Math.floor(Date.now() / 1000);

          if (
            (decodedAccessToken.exp && decodedAccessToken.exp > currentTime) ||
            (decodedRefreshToken.exp && decodedRefreshToken.exp > currentTime)
          ) {
            setIsValid(true);
          }
        } catch (err) {
          console.error("Token validation error:", err);
        }
      }

      setLoading(false);
    };

    validateTokens();
  }, [cookies]);
  return { loading, isValid };
};

export default useTokenValidation;
