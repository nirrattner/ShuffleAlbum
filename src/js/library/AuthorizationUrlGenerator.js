import { CLIENT_ID, REDIRECT_URI } from './AuthConstants'

const SCOPES = [
  'streaming',
  'user-library-read',
  'user-modify-playback-state',
  'user-read-birthdate',
  'user-read-email',
  'user-read-playback-state',
  'user-read-private',
];

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((accumulator, value) => accumulator + possible[value % possible.length], "");
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}

export async function generate()  {
  const codeVerifier  = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  window.localStorage.setItem('code_verifier', codeVerifier);

  const redirectUri = REDIRECT_URI;
  const authorizeUrl = new URL('https://accounts.spotify.com/authorize');
  const searchParameters = new URLSearchParams({
      client_id: CLIENT_ID,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: SCOPES.join(' '),
  });

  authorizeUrl.search = new URLSearchParams(searchParameters).toString();
  return authorizeUrl.toString();
}
