import React, { useState, useEffect, useContext } from "react";
import { generateCodeChallenge, generateCodeVerifier } from "../auth/pkce";
import { useNavigate } from "react-router-dom";
import { revokeUrl, clientId, clientSecret } from "../auth/URLs";
import { getAccessTokenWithRefreshToken } from "../auth/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState();
  const inactivityTimoutLength = 5000; //millis
  const inactivityCheckLength = 1000; //millis
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("codeVerifier", generateCodeVerifier());
    localStorage.setItem("codeChallenge", generateCodeChallenge());
    navigate("/redirect");
  }

  function handleLogout() {
    setIsLoggedIn(false);
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
  }

  // auto-logout on inactivity
  function autoLogoutIfInactive() {
    const expireTime = localStorage.getItem("expireTime");
    if (expireTime < Date.now()) {
      console.log("Logging out...");
      handleLogout();
    }
  }

  function updateExpireTime() {
    const expireTime = Date.now() + inactivityTimoutLength;
    console.log("Updating expire time to: " + expireTime);
    localStorage.setItem("expireTime", expireTime);
  }

  // load login state from storage; for when user reloads page
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  // auto-refresh token when it expires
  useEffect(() => {
    let intervalId;
    if (isLoggedIn) {
      let tokenRefreshingInterval = tokenExpiration * 1000;
      intervalId = setInterval(() => {
        getAccessTokenWithRefreshToken();
      }, tokenRefreshingInterval);
    }
    return () => clearInterval(intervalId);
  }, [isLoggedIn, tokenExpiration]);

  // check if user has been inactive
  useEffect(() => {
    if (isLoggedIn) {
      const intervalId = setInterval(() => {
        autoLogoutIfInactive();
      }, inactivityCheckLength);
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

  // add/remove window listeners
  useEffect(() => {
    if (isLoggedIn) {
      updateExpireTime();
      Object.values(events).forEach((event) => {
        window.addEventListener(event, updateExpireTime);
      });
      return () => {
        Object.values(events).forEach((event) => {
          window.removeEventListener(event, updateExpireTime);
        });
      };
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setTokenExpiration,
        handleLogin,
        handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
