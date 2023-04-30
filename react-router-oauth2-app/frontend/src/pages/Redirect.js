import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authorizeURL } from "../auth/URLs";
import { getAccessTokenWithCode } from "../auth/auth";
import { useAuth } from "../contexts/AuthContext";


export default function RedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const code = searchParams?.get("code");
    if (!code) {
      window.location.href = authorizeURL();
    } else {
      getAccessTokenWithCode(code);
      localStorage.setItem('isLoggedIn', true)
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [navigate, searchParams]);

  return <p>Redirecting...</p>;
}
