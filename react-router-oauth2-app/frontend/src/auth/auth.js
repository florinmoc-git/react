import { redirect } from "react-router-dom";
import { Buffer } from "buffer";
import { authorizeWithRefreshTokenURL, tokenURL } from "./URLs";

// function jwtDecode(jwtToken) {
//   return JSON.parse(
//     Buffer.from(jwtToken.split(".")[1], "base64").toString("binary")
//   );
// }

export function getTokenDuration() {
  return localStorage.getItem("expiresIn");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function checkAuthLoader() {
  const token = getAccessToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}

export async function getAccessTokenWithCode(code) {
  const client = "client";
  const secret = "secret";
  const url = tokenURL(code);

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
  return resp;
}

export function getAccessTokenWithRefreshToken() {
  const client = "client";
  const secret = "secret";
  const url = authorizeWithRefreshTokenURL();

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
        localStorage.setItem("accessToken", resp.access_token);
        localStorage.setItem("refreshToken", resp.refresh_token);
        localStorage.setItem("expiresIn", resp.expires_in);
      }
      console.log("Refreshed token....");
    } catch (err) {
      console.error(err);
    }
  })();
}
