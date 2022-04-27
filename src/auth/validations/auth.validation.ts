import * as Joi from 'joi';

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const refresh = {
  body: Joi.object().keys({
    refresh_token: Joi.string().required(),
  }),
};

export { login, register, refresh };
