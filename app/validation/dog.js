const Joi = require('joi');

module.exports = {

  // GET /v1/dogs
  listDogs: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      score: Joi.number(),
    },
  },

  // POST /v1/dogs
  createDog: {
    body: {
      name: Joi.string().max(128).required(),
      score: Joi.number().min(0).required(),
    },
  },

  // PUT /v1/dogs/:dogId
  replaceDog: {
    body: {
      name: Joi.string().max(128).required(),
      score: Joi.number().min(0).required(),
    },
    params: {
      dogId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/dogs/:dogId
  updateDog: {
    body: {
      name: Joi.string().max(128).required(),
      score: Joi.number().min(0).required(),
    },
    params: {
      dogId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
