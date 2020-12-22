import crypto from 'crypto';

const ENCRYPTION_KEY = Buffer.from('d6F3Efeqd6F3Efeq');
const IV = Buffer.from('d6F3Efeqd6F3Efeq');

/**
 * @description This is unsafe for any cryptographic purposes due to a constant IV!!! It's only meant to make cursors not instantly obvious.
 */
export const dangerously_encrypt = (text: string) => {
  const cipher = crypto.createCipheriv('aes-128-ctr', ENCRYPTION_KEY, IV);
  const encrypted = cipher.update(text);
  return encodeURIComponent(Buffer.concat([encrypted, cipher.final()]).toString('base64'));
};

/**
 * @description This is unsafe for any cryptographic purposes due to a constant IV!!!
 */
export const dangerously_decrypt = (text: string) => {
  const decipher = crypto.createDecipheriv('aes-128-ctr', ENCRYPTION_KEY, IV);
  try {
    return decodeURIComponent(
      Buffer.concat([decipher.update(text, 'base64'), decipher.final()]).toString('utf8'),
    );
  } catch {
    return 'Invalid Cursor';
  }
};
