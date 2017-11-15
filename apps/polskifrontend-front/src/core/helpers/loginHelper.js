import * as cookies from './cookieHelper';

const cookieName = 'PL_FRONT_END';

export function saveLoginToken(token) {
  cookies.set(token, cookieName);
}

export function getLoginToken() {
  return cookies.get(cookieName);
}

export function clearLoginToken() {
  cookies.remove(cookieName);
}
