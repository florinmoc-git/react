import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authorizeURL } from "../auth/URLs";
import { getAccessTokenWithCode } from "../auth/auth";
import { useAuth } from "../contexts/AuthContext";

export default function RedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsLoggedIn, setTokenExpiration } = useAuth();

  useEffect(() => {
    const code = searchParams?.get("code");
    if (!code) {
      window.location.href = authorizeURL();
    } else {
      (async () => {
        try {
          const resp = await getAccessTokenWithCode(code);
          if (resp?.access_token) {
            localStorage.setItem("accessToken", resp.access_token);
            localStorage.setItem("refreshToken", resp.refresh_token);
            localStorage.setItem("expiresIn", resp.expires_in);
            localStorage.setItem("isLoggedIn", true);
            setTokenExpiration(resp.expires_in);
            setIsLoggedIn(true);
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching token: " + error);
        }
      })();

    }
  }, [navigate, searchParams]);

  return <p>Redirecting...</p>;
}
