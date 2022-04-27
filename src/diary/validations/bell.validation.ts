import * as Joi from 'joi';
import { isObjectId } from 'src/utils/validation';

const createBell = {
  body: Joi.object().keys({
    starts: Joi.string()
      .regex(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/)
      .required(),
    ends: Joi.string()
      .regex(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/)
      .required(),
  }),
};

const getBells = {
  query: Joi.object().keys({
    limit: Joi.number().integer().max(100),
    page: Joi.number().integer(),
  }),
};

const getBell = {
  param: Joi.object().keys({
    id: Joi.string().custom(isObjectId),
  }),
};

const updateBell = {
  param: Joi.object().keys({
    id: Joi.string().custom(isObjectId),
  }),
  body: Joi.object()
    .keys({
      starts: Joi.string()
        .regex(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/)
        .required(),
      ends: Joi.string()
        .regex(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/)
        .required(),
    })
    .min(1),
};

const deleteBell = {
  param: Joi.object().keys({
    id: Joi.string().custom(isObjectId),
  }),
};

export { getBell, getBells, createBell, updateBell, deleteBell };
