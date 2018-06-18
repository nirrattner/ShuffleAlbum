const CLIENT_ID = '470e16e6c69f4223846a629b70207b92';
const SCOPES = [
  'streaming',
  'user-library-read',
  'user-modify-playback-state',
  'user-read-birthdate',
  'user-read-email',
  'user-read-playback-state',
  'user-read-private',
];
const LOCAL_REDIRECT = 'http://localhost:3000';
const DEPLOYED_REDIRECT = 'https://nirrattner.github.io/ShuffleAlbum/';

export function generate()  {
  const redirectUri = window.location.hostname.includes('local')
    ? LOCAL_REDIRECT
    : DEPLOYED_REDIRECT;
  return 'https://accounts.spotify.com/authorize' +
  '?client_id=' + CLIENT_ID +
  '&scope=' + encodeURIComponent(SCOPES.join(' ')) +
  '&redirect_uri=' + encodeURIComponent(redirectUri) +
  '&response_type=token';
};
