const TOKEN_KEY = 'access-token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}
