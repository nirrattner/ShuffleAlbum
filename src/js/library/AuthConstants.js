export const CLIENT_ID = '470e16e6c69f4223846a629b70207b92';

const LOCAL_REDIRECT_URI = 'http://localhost:3000';
const DEPLOYED_REDIRECT_URI = 'https://nirrattner.github.io/ShuffleAlbum/';
export const REDIRECT_URI = window.location.hostname.includes('local')
    ? LOCAL_REDIRECT_URI
    : DEPLOYED_REDIRECT_URI;
