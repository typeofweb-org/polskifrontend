import type { Blog } from '@prisma/client';
import { UserRole } from '@prisma/client';
import mailgun from 'mailgun-js';

import { closeConnection, openConnection } from './db';

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY!, domain: process.env.MAILGUN_DOMAIN! });

const sendEmail = async (recepients: readonly string[], subject: string, text: string) => {
  const data = {
    from: process.env.MAILGUN_FROM!,
    to: recepients.join(', '),
    subject,
    text,
  };

  await mg.messages().send(data);
};

const getNewCreatorEmail = (blog: Blog) => {
  return `
Nowy wniosek o dodanie serwisu!

Dane:
${Object.entries(blog)
  .map((entry) => `${entry[0]}: ${entry[1]?.toString() || ''}`)
  .join('\n')}

*Tutaj damy jakiegoś linka czy coś do akceptacji*
`;
};

export const sendNewCreatorNotification = async (blog: Blog) => {
  try {
    const prisma = await openConnection();

    const admins = await prisma.user.findMany({
      where: {
        role: UserRole.ADMIN,
      },
    });

    await sendEmail(
      admins.map((a) => a.email),
      `Polski Frontend | Nowy serwis | ${blog.name}`,
      getNewCreatorEmail(blog),
    );
  } finally {
    await closeConnection();
  }
};
