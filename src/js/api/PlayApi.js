import * as AuthenticationFilter from './AuthenticationFilter';

export function play(token, album, deviceId) {
  return fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ 
        context_uri: album,
      }),
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      }
    })
    .then(AuthenticationFilter.authenticate);
};

export function transfer(token, deviceId) {
  return fetch(
    `https://api.spotify.com/v1/me/player?play=false`,
    {
      method: 'PUT',
      body: JSON.stringify({ 
        device_ids: [deviceId],
      }),
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      }
    })
    .then(AuthenticationFilter.authenticate);
}
