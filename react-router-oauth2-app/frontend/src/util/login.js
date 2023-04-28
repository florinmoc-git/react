import { redirect } from "react-router-dom";
import { generateCodeChallenge, generateCodeVerifier } from "../pkce/pkce";

export function action() {
  const verifier = generateCodeVerifier();
  localStorage.setItem("codeVerifier", verifier);
  const codeChallenge = generateCodeChallenge();
  localStorage.setItem("codeChallenge", codeChallenge);

  return redirect("/redirect");
}
