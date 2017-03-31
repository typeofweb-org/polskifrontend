// TODO: move it to some kind of config
const username = 'burczu';
const password = 'abcdfrbk340341fdsfvds';

export function getBasicAuthToken() {
  // Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==
  const token = new Buffer(`${username}:${password}`).toString('base64');
  return `Basic ${token}`;
}
