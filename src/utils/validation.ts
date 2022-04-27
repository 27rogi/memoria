import isMongoId from 'validator/lib/isMongoId';
import isURL from 'validator/lib/isURL';

const isObjectId = (value, helpers) => {
  if (isMongoId(value)) return value;
  else return helpers.error('any.notMongoId');
};

const urlCheck = (value, helpers) => {
  if (value === null) return true;

  if (!isURL(value)) {
    return helpers.message('Incorrect URL in request');
  }
  return value;
};

export { isObjectId, urlCheck };
