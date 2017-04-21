import { getBasicAuthToken } from '../utils/authHelper';

export default async function basicAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token && token === getBasicAuthToken()) {
    next();
  } else {
    const excludeUrls = [''];
    for (const excludeUrl of excludeUrls) {
      if (req.url.indexOf(excludeUrl) === 0) {
        return next();
      }
    }
    next({ status: 401, msg: 'not authorized' });
  }
}
