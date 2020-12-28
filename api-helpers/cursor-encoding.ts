import crypto from 'crypto';

const CURSOR_ENCRYPTION_KEY = Buffer.from(process.env.CURSOR_ENCRYPTION_KEY!);

/**
 * @description This is unsafe for any cryptographic purposes! It's only meant to make cursors not instantly obvious.
 */
export const textToCursor = (text: string) => {
  const cipher = crypto.createCipheriv('aes-128-ecb', CURSOR_ENCRYPTION_KEY, '');
  const encrypted = cipher.update(text);
  return encodeURIComponent(Buffer.concat([encrypted, cipher.final()]).toString('base64'));
};

/**
 * @description This is unsafe for any cryptographic purposes!
 */
export const cursorToText = (text: string) => {
  const decipher = crypto.createDecipheriv('aes-128-ecb', CURSOR_ENCRYPTION_KEY, '');
  try {
    return decodeURIComponent(
      Buffer.concat([decipher.update(text, 'base64'), decipher.final()]).toString('utf8'),
    );
  } catch {
    return 'Invalid Cursor';
  }
};
