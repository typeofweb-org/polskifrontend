import { UserRole } from '@prisma/client';
import Mailgun from 'mailgun-js';

import { getConfig } from '../config';

import type { Blog, PrismaClient } from '@prisma/client';

const sendEmail = (
  recepients: readonly string[],
  subject: string,
  text: string,
  replyTo?: string,
) => {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN || !process.env.MAILGUN_FROM) {
    throw new Error(`Missing env MAILGUN_API_KEY, MAILGUN_DOMAIN or MAILGUN_FROM`);
  }

  const mg = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    host: 'api.eu.mailgun.net',
  });

  return mg.messages().send({
    from: process.env.MAILGUN_FROM,
    to: recepients.join(', '),
    subject,
    text,
    'h:Reply-To': replyTo,
  });
};

const getNewCreatorEmail = (blog: {
  readonly id: string;
  readonly name: string;
  readonly href: string;
  readonly rss: string;
  readonly creatorEmail: string;
}) => {
  return `
Nowy wniosek o dodanie serwisu!

Dane:
${Object.entries(blog)
  .map(([key, value]) => `${key}: ${value.trim()}`)
  .join('\n')
  .trim()}

https://${getConfig('NEXT_PUBLIC_URL')}/admin/blogs/${blog.id}
`;
};

export const sendNewCreatorNotification = async (
  { id, name, href, rss, creatorEmail }: Blog,
  prisma: PrismaClient,
) => {
  const admins = await prisma.member.findMany({
    where: {
      role: UserRole.ADMIN,
    },
    select: {
      email: true,
    },
  });

  await sendEmail(
    admins.map((a) => a.email),
    `Polski Frontend | Nowy serwis | ${name}`,
    getNewCreatorEmail({ id, name, href, rss, creatorEmail: creatorEmail || '' }),
    creatorEmail || undefined,
  );
};
