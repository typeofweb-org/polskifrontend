import Crypto from 'crypto';

import Boom from '@hapi/boom';
import type { Request } from '@hapi/hapi';
import Bcrypt from 'bcrypt';
import ms from 'ms';
import Zxcvbn from 'zxcvbn';

import type { Models } from '../../models';

import { sessionInclude } from './includes';

const SESSION_VALIDITY = ms('2 weeks');

export async function loginUser(request: Request, user: Models['user']) {
  const session = await request.server.app.db.session.create({
    data: {
      id: Crypto.randomBytes(32).toString('hex'),
      validUntil: new Date(Date.now() + SESSION_VALIDITY),
      user: {
        connect: { id: user.id },
      },
    },
    include: sessionInclude,
  });

  request.cookieAuth.set(session);
  return session;
}

export function isPasswordStrongEnough(password: string) {
  const result = Zxcvbn(password);
  return result.score >= 3;
}

export async function createUser(
  request: Request,
  { email, password }: { readonly email: string; readonly password: string },
) {
  if (!isPasswordStrongEnough(password)) {
    throw Boom.badRequest('TOO_EASY');
  }

  const passwordHash = await Bcrypt.hash(password, 10);

  const user = await request.server.app.db.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });

  request.server.events.emit('auth:user:registered', user);

  return user;
}
