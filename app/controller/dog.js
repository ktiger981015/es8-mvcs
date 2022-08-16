const {
  Get, CreateDog,
  UpdateDog, RemoveDog,
  ReplaceDog,
  UploadFile,
} = require('../service/dog');
const { Handler } = require('../middleware/error');
const { CREATED } = require('../constant');
const { CreateCache, GetCache } = require('../util/cache');

/**
 * Load dog and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const data = await GetCache(req.path, req.params);
    if (data) {
      req.locals = { data };
      return next();
    }
    const dog = await Get(id);
    req.locals = { dog };
    await CreateCache(dog, req.path, req.params);
    return next();
  } catch (error) {
    return Handler(error, req, res, next);
  }
};

/**
 * Get dog
 * @public
 */
exports.get = (req, res) => res.json({ data: req.locals.dog.transform(), success: 'SUCCESS' });

/**
 * Create new dog
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const response = await CreateDog(req.body);
    return res.status(CREATED).json({ data: response, success: 'SUCCESS' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update existing dog
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { dog } = req.locals;
    const response = await UpdateDog(dog, req.body);
    return res.json({ data: response, success: 'SUCCESS' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Replace existing dog
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { dog } = req.locals;
    const response = await ReplaceDog(dog, req.body);
    return res.json({ data: response, success: 'SUCCESS' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete dog
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    const { dog } = req.locals;
    await RemoveDog(dog);
    res.status(203).end();
  } catch (error) {
    next(error);
  }
};

exports.upload = async (req, res, next) => {
  try {
    const data = await UploadFile(req.file);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
