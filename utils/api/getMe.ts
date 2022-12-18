import { string, object } from 'yup';

import { fetcher } from '../fetcher';

const getMeSchema = object({
  data: object({
    user: object({
      id: string().required(),
    })
      .noUnknown()
      .required(),
    member: object({
      id: string().required(),
      email: string().required(),
      role: string().required(),
    }).required(),
  }).required(),
});

export const getMe = async () => {
  return (
    await fetcher('/api/auth/me', {
      schema: getMeSchema,
      method: 'GET',
    })
  ).data;
};
