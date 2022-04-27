import * as Joi from 'joi';
import { urlCheck, isObjectId } from 'src/utils/validation';

const createPost = {
  body: Joi.object().keys({
    categories: Joi.array().required(),
    keywords: Joi.array(),
    name: Joi.string().required(),
    date: Joi.string().required(),
    preview: Joi.string().custom(urlCheck).allow(null),
    subtitle: Joi.string().required(),
    text: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getPost = {
  param: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    limit: Joi.number().integer().max(100),
    page: Joi.number().integer(),
  }),
};

const updatePost = {
  param: Joi.object().keys({
    id: Joi.string().custom(isObjectId).required(),
  }),
  body: Joi.object()
    .keys({
      categories: Joi.array().required(),
      keywords: Joi.array(),
      name: Joi.string().required(),
      date: Joi.string().required(),
      preview: Joi.string().custom(urlCheck).allow(null),
      subtitle: Joi.string().required(),
      text: Joi.string().required(),
      description: Joi.string().required(),
    })
    .min(1),
};

const deletePost = {
  param: Joi.object().keys({
    id: Joi.string().custom(isObjectId),
  }),
};

export { createPost, getPost, getPosts, updatePost, deletePost };
