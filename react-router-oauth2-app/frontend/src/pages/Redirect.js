import { useEffect } from "react";
import { useNavigate, useSearchParams, redirect } from "react-router-dom";
import { authorizeURL } from "../auth/URLs";
import { getAccessTokenWithCode } from "../auth/auth";
import { generateCodeChallenge, generateCodeVerifier } from "../auth/pkce";

export default function RedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams?.get("code");
    if (!code) {
      window.location.href = authorizeURL();
    } else {
      getAccessTokenWithCode(code);
      navigate("/");
    }
  }, [navigate, searchParams]);

  return <p>Redirecting...</p>;
}

export function action() {
  localStorage.setItem("codeVerifier", generateCodeVerifier());
  localStorage.setItem("codeChallenge", generateCodeChallenge());

  return redirect("/redirect");
}
