export function extract() {
  if (!window.location.hash) {
    return null;
  }
  const fragmentString = window.location.hash.substring(1);
  const fragmentMap = JSON.parse(
    '{"' + fragmentString.replace(/&/g, '","').replace(/=/g,'":"') + '"}', 
    (key, value) => key === '' ? value : decodeURIComponent(value));
  return 'access_token' in fragmentMap
    ? fragmentMap.access_token
    : null;
};
