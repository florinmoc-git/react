import React, { useState, useEffect, useContext } from "react";
import { generateCodeChallenge, generateCodeVerifier } from "../auth/pkce";
import { useNavigate } from "react-router-dom";
import { revokeUrl, clientId, clientSecret } from "../auth/URLs";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function logIn(e) {
    e.preventDefault();
    localStorage.setItem("codeVerifier", generateCodeVerifier());
    localStorage.setItem("codeChallenge", generateCodeChallenge());
    navigate("/redirect");
  }

  function logOut(e) {
    e.preventDefault();
    (async () => {
      try {
        await fetch(revokeUrl, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("refresh_token"),
            client_id: clientId,
            client_secret: clientSecret,
          }),
        });
      } catch (err) {
        console.error(err);
      }
    })();

    localStorage.clear();
    setIsLoggedIn(false);
  }

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logIn,
    logOut,
  };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn'));
    }, [])


  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
