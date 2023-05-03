import PageContent from "../components/PageContent";
import { generateCodeChallenge, generateCodeVerifier } from "../auth/pkce";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  function handleLogin() {
    localStorage.setItem("codeVerifier", generateCodeVerifier());
    localStorage.setItem("codeChallenge", generateCodeChallenge());
    navigate("/redirect");
  }
  
  return (
    <PageContent title="Welcome!">
      {!isLoggedIn ? (
        <>
          <p>Log in to app to access events.</p>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <p>Browse all our amazing events!</p>
      )}
    </PageContent>
  );
}

export default HomePage;
