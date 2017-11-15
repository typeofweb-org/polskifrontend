import Cookies from 'universal-cookie';

let cookies;

export function setUpCookie(cookieInstance) {
  if (cookieInstance) {
    cookies = cookieInstance;
  } else {
    cookies = new Cookies();
  }
}

export function set(value, name, settings = { path: '/', maxAge: 1800 }) {
  if (!cookies) {
    return;
  }

  cookies.set(name, value, settings);
}

export function get(name) {
  if (!cookies) {
    return null;
  }

  return cookies.get(name);
}

export function remove(name, settings = { path: '/' }) {
  if (!cookies) {
    return;
  }

  cookies.remove(name, settings);
}
