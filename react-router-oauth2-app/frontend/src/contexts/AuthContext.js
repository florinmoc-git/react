import React, { useState, useEffect, useContext } from "react";
import { generateCodeChallenge, generateCodeVerifier } from "../auth/pkce";
import { useNavigate } from "react-router-dom";
import { revokeUrl, clientId, clientSecret } from "../auth/URLs";
import { getTokenDuration, getAccessTokenWithRefreshToken } from "../auth/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState();
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
            token: localStorage.getItem("refreshToken"),
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
    setTokenExpiration,
    logIn,
    logOut,
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);



  useEffect(() => {
    let intervalId;
    if(isLoggedIn){
      console.log('Expires in - auth context - storage: ' + localStorage.getItem('expiresIn'))        
      console.log('Expires in - auth context - state: ' + tokenExpiration)        

      let tokenRefreshingInterval = tokenExpiration * 1000;
      console.log('Refresh interval outside: ' + tokenRefreshingInterval);
      intervalId = setInterval(() => {
        console.log('Refresh interval: ' + tokenRefreshingInterval);
        console.log("Getting new token....");
        getAccessTokenWithRefreshToken();
      }, tokenRefreshingInterval);
    } else {
      console.log('Clearing interval......')
      // clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isLoggedIn, tokenExpiration]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
