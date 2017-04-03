import cookie from 'react-cookie';

const cookieName = 'PL_FRONT_END';

export function saveLoginToken(token) {
  cookie.save(cookieName, token, { path: '/' });
}

export function getLoginToken() {
  return cookie.load(cookieName);
}

export function clearLoginToken() {
  cookie.remove(cookieName, { path: '/' });
}
