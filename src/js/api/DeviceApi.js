import * as AuthenticationFilter from './AuthenticationFilter';

export function get(token) {
  return fetch(
    `https://api.spotify.com/v1/me/player/devices`,
    {
      headers: { Authorization : `Bearer ${token}` },
    })
    .then(AuthenticationFilter.authenticate);
};
