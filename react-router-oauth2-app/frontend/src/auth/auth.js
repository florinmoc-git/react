import { redirect } from "react-router-dom";
import { Buffer } from "buffer";
import { tokenURL } from "./URLs";

function jwtDecode(jwtToken) {
  return JSON.parse(
    Buffer.from(jwtToken.split(".")[1], "base64").toString("binary")
  );
}

export function getTokenDuration() {
  return localStorage.getItem("expires_in");
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function tokenLoader() {
  return getAccessToken();
}

export function checkAuthLoader() {
  const token = getAccessToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}

export function getAccessTokenWithCode(code) {
  const client = "client";
  const secret = "secret";
  const url = tokenURL(code);

  (async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Basic ${Buffer.from(`${client}:${secret}`).toString(
            "base64"
          )}`,
        },
      });
      const resp = await response.json();
      if (resp?.access_token) {
        localStorage.setItem("access_token", resp.access_token);
        localStorage.setItem("refresh_token", resp.refresh_token);
        localStorage.setItem("expires_in", resp.expires_in);
      }
    } catch (err) {
      console.error(err);
    }
  })();
}