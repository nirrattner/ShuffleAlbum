import * as AuthenticationFilter from './AuthenticationFilter';
import {CLIENT_ID, REDIRECT_URI} from '../library/AuthConstants';

export function get(code) {
  const codeVerifier = localStorage.getItem('code_verifier');
  return fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    }).then(AuthenticationFilter.authenticate);
}
