import * as AuthenticationFilter from './AuthenticationFilter';

export function get(token, offset=0, limit=1) {
  return fetch(
    `https://api.spotify.com/v1/me/albums?offset=${offset}&limit=${limit}`,
    {
      headers: { Authorization : `Bearer ${token}` },
    })
    .then(AuthenticationFilter.authenticate);
};
