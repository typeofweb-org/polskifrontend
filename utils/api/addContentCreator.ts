export type ContentCreatorReqBody = {
  readonly contentURL: string;
  readonly email?: string;
  readonly captchaToken: string;
};

export const addContentCreator = ({ contentURL, email }: ContentCreatorReqBody) => {
  return fetch('https://www.polskifrontend.pl/api/content-creator', {
    method: 'POST',
    body: JSON.stringify({
      contentURL,
      email,
    }),
  });
};
