import cookie from 'react-cookie';

const cookieName = 'PL_FRONT_END_USER_SETTINGS';
const initialSettings = {
  tiles: true,
  clickedLinks: [],
  lastNewsVisit: new Date(1900, 1, 1)
};

export function saveSettings(settings) {
  cookie.save(cookieName, settings, { path: '/', expires: new Date(2050, 1, 1) });
}

export function getSettings() {
  const data = cookie.load(cookieName);
  return data || initialSettings;
}

export function clearSettings() {
  cookie.remove(cookieName, { path: '/' });
}
