import * as joi from 'joi';

export const signupSchema = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
    gender: joi.string().valid('male', 'female').required(),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
