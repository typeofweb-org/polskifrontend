import type { Blog, PrismaClient } from '@prisma/client';
import { UserRole } from '@prisma/client';
import Mailgun from 'mailgun-js';

const mg = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: process.env.MAILGUN_DOMAIN!,
  host: 'api.eu.mailgun.net',
});

const sendEmail = (
  recepients: readonly string[],
  subject: string,
  text: string,
  replyTo?: string,
) =>
  mg.messages().send({
    from: process.env.MAILGUN_FROM!,
    to: recepients.join(', '),
    subject,
    text,
    'h:Reply-To': replyTo,
  });

const getNewCreatorEmail = (blog: Record<string, string>) => {
  return `
Nowy wniosek o dodanie serwisu!

Dane:
${Object.entries(blog)
  .map((entry) => `${entry[0]}: ${entry[1].trim()}`)
  .join('\n')
  .trim()}

*Tutaj damy jakiegoś linka czy coś do akceptacji*
`;
};

export const sendNewCreatorNotification = async (
  { name, href, rss, creatorEmail }: Blog,
  prisma: PrismaClient,
) => {
  const admins = (await prisma.user.findMany({
    where: {
      role: UserRole.ADMIN,
      email: {
        not: null,
      },
    },
    select: {
      email: true,
    },
  })) as ReadonlyArray<{ readonly email: string }>;

  await sendEmail(
    admins.map((a) => a.email),
    `Polski Frontend | Nowy serwis | ${name}`,
    getNewCreatorEmail({ name, href, rss, creatorEmail: creatorEmail || '' }),
    creatorEmail || undefined,
  );
};
