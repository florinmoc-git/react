const redirectUri = 'http://localhost:3000/authorized';
const grantType = 'authorization_code';
const responseType = 'code';
const scope = 'openid';
const codeChallengeMethod = 'S256';

export const clientSecret = 'secret';
export const clientId = 'client';
export const authServer = 'http://localhost:8080';
export const revokeUrl = `${authServer}/oauth2/revoke`;

export const tokenURL = (code) => {
  const codeVerifier = localStorage.getItem("codeVerifier");
  return `${authServer}/oauth2/token?client_id=${clientId}&redirect_uri=${redirectUri}&grant_type=${grantType}&code=${code}&code_verifier=${codeVerifier}`;
};

export const authorizeURL = () => {
  const codeChallenge = localStorage.getItem("codeChallenge");
  return `${authServer}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
};

// export const resourceServerURL = () => { 
//   return 'http://localhost:9000/demo';
// }