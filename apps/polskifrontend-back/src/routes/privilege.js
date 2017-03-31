import { User } from 'models';

export async function ensureLogin(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    req.user = await User.findOne({ token });
  }
  if (req.user) {
    next();
  } else {
    const excludeUrls = ['/user/create', '/user/login'];
    for (const excludeUrl of excludeUrls) {
      if (req.url.indexOf(excludeUrl) === 0) {
        return next();
      }
    }
    next({ status: 401, msg: 'not authorized' });
  }
}
