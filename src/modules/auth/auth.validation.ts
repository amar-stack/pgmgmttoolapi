import Joi from 'joi';
import { password } from '../validate/custom.validation';
import { NewRegisteredUser } from '../user/user.interfaces';

const registerBody: Record<keyof NewRegisteredUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  phone: Joi.number(),
  profession: Joi.string(),
  organisation: Joi.string(),
  designation: Joi.string(),
  bed: Joi.string(),
  occupation: Joi.date(),
  duration: Joi.date(),
  budget: Joi.string(),
  reference: Joi.string(),
  location: Joi.string(),
  comments: Joi.string(),
  additionalServices: Joi.string(),
  workAddress: Joi.string(),
  profissionalId: Joi.string(),
  kycId: Joi.string(),
  uploadAdharurl: Joi.optional(),
  institutionIDurl: Joi.optional(),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const uploadDocs = {
  body: Joi.object().keys({
    additionalServices: Joi.string(),
    workAddress: Joi.string(),
    profissionalId: Joi.string(),
    kycId: Joi.string(),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
