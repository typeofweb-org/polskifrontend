import type { ProjectTypes } from '@polskifrontend/types';
import Joi from 'joi';

import { Enums } from '../../models';

export const loginPayloadSchema = Joi.object<ProjectTypes['postAuthLoginRequestBody']>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerPayloadSchema = Joi.object<ProjectTypes['postAuthRegisterRequestBody']>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const meAuthSchema = Joi.object<ProjectTypes['getAuthMe200Response']['data']>({
  id: Joi.string().required(),
  validUntil: Joi.date().required(),
  userId: Joi.number().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  user: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().optional().allow('', null),
    email: Joi.string().email().required(),
    role: Joi.string()
      .valid(...Object.keys(Enums.UserRole))
      .required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  }).required(),
});

export const meAuthResponseSchema = Joi.object<ProjectTypes['getAuthMe200Response']>({
  data: meAuthSchema.required().allow(null),
}).required();
