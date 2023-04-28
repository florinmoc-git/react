const authorize = () => {
  const codeChallenge = localStorage.getItem("codeChallenge");
  return `http://localhost:8080/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://localhost:3000/authorized&code_challenge=${codeChallenge}&code_challenge_method=S256`;
};

export default authorize;
