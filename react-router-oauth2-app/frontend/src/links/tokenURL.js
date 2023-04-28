const tokenURL = () => {
  const codeVerifier = localStorage.getItem("codeVerifier");
  const code = localStorage.getItem("code");
  return `http://localhost:8080/oauth2/token?client_id=client&redirect_uri=http://localhost:3000/authorized&grant_type=authorization_code&code=${code}&code_verifier=${codeVerifier}`;
};

export default tokenURL;
