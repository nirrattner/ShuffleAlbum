export function authenticate(response) {
  if (response.status === 401) {
    throw new Error('AUTHENTICATION_ERROR');
  }
  return response;
}
