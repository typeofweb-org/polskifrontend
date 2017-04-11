import cookie from 'react-cookie';

const cookieName = 'PL_FRONT_END_USER_SETTINGS';
const initialSettings = {
  tiles: true,
  clickedLinks: []
};

export function saveSettings(settings) {
  cookie.save(cookieName, settings, { path: '/' });
}

export function getSettings() {
  const data = cookie.load(cookieName);
  return data || initialSettings;
}

export function clearSettings() {
  cookie.remove(cookieName, { path: '/' });
}
