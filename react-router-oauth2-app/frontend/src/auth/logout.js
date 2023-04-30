import { redirect } from "react-router-dom";
import { revokeUrl, clientId, clientSecret } from "./URLs";

export function action() {
  // invalidate tokens
  const revokePayload = {
    token: localStorage.getItem("refresh_token"),
    client_id: clientId,
    client_secret: clientSecret,
  };
  (async () => {
    try {
      const response = await fetch(revokeUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(revokePayload)
      });
    } catch (err) {
      console.error(err);
    }
  })();

  localStorage.clear();

  return redirect("/");
}
