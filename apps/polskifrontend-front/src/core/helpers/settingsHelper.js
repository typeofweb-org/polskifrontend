import * as cookies from './cookieHelper';

const cookieName = 'PL_FRONT_END_USER_SETTINGS';
const initialSettings = {
  tiles: true,
  clickedLinks: [],
  lastNewsVisit: new Date(1900, 1, 1)
};

export function saveSettings(settings) {
  cookies.set(settings, cookieName, { path: '/', expires: new Date(2050, 1, 1) });
}

export function getSettings() {
  const data = cookies.get(cookieName);
  return data || initialSettings;
}

export function clearSettings() {
  cookies.remove(cookieName);
}
