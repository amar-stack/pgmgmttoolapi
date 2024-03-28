import Joi from 'joi';
import { password, objectId } from '../validate/custom.validation';
import { NewCreatedUser } from './user.interfaces';

const createUserBody: Record<keyof NewCreatedUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  role: Joi.string().required().valid('user', 'admin'),
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

export const createUser = {
  body: Joi.object().keys(createUserBody),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string(),
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
    })
    .min(1),
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
