const app = require('express').Router();
const Validate = require('express-validation');
const controller = require('../../controller/dog');

const upload = require('../../util/upload');

// const { Authorize } = require('../../middleware/auth');

const { listDogs, createDog, replaceDog, updateDog, 
} = require('../../validation/dog');

// const { ADMIN, LOGGED_IN } = require('../../constant');

/**
 * Load Dog when API with dogId params is Hit
 */
app.param('dogId', controller.load);

app.route('/')
  /**
   * @api {get} /v1/dogs List Dogs
   * @apiDescription Get List of Dogs
   * @apiVersion 1.0.0
   * @apiName ListDogs
   * @apiGroup Dogs
   *
   * @apiParam (Query Params) {String}            [name]              Dog name
   * @apiParam (Query Params) {Number {1-100}}    [perPage=1]         Dog List limit per page
   * @apiParam (Query Params) {Number {1-}}       [page=1]            List Page
   * @apiParam (Query Params) {Number {0-}}       [score]             Dog score
   *
   * @apiSuccess {Object[]} list of dogs
   *
   */
  .get(Validate(listDogs), controller.load)
  /**
   * @api {post} /v1/dogs Create Dogs
   * @apiDescription Create Dogs
   * @apiVersion 1.0.0
   * @apiName Create Dog
   * @apiGroup Dogs
   *
   * @apiParam (Body Params) {String{..128}}     [name]              Dog name
   * @apiParam (Body Params) {Number{0-}}        [score]             Dog score
   *
   * @apiSuccess (Created 201) {String}  id         Dog's id
   * @apiSuccess (Created 201) {String}  name       Dog's name
   * @apiSuccess (Created 201) {Number}  score      Dog's score
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .post(Validate(createDog), controller.create);

app.route('/:dogId')
  /**
   * @api {get} /v1/:dogId Get Dog Information
   * @apiDescription Get Dogs Information
   * @apiVersion 1.0.0
   * @apiName Get Dog Information
   * @apiGroup Dogs
   *
   * @apiSuccess (Created 201) {String}  id         Dog's id
   * @apiSuccess (Created 201) {String}  name       Dog's name
   * @apiSuccess (Created 201) {Number}  score      Dog's score
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Not Found 404)    NotFound     Dog does not exist
   */
  .get(controller.get)
  /**
   * @api {put} v1/dogs/:dogId Replace Dog
   * @apiDescription Replace the whole dog document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceDog
   * @apiGroup Dogs
   *
   * @apiParam  {String{..128}}      [name]    Dog's name
   * @apiParam  {Number{0-}}         [score]    Dog's score
   *
   * @apiSuccess {String}  id         Dog's id
   * @apiSuccess {String}  name       Dog's name
   * @apiSuccess {Number}  score      Dog's email
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Forbidden 403)    Forbidden    Only dog with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Dog does not exist
   */
  .put(Validate(replaceDog), controller.replace)
  /**
   * @api {put} v1/dogs/dogId Update Dog
   * @apiDescription Update some fields of a dog document
   * @apiVersion 1.0.0
   * @apiName UpdateDog
   * @apiGroup Dogs
   *
   * @apiParam  {String{..128}}      [name]      Dog's name
   * @apiParam  {Number{0-}}         [score]     Dog's score
   *
   * @apiSuccess {String}  id         Dog's id
   * @apiSuccess {String}  name       Dog's name
   * @apiSuccess {Number}  score      Dog's email
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Forbidden 403)    Forbidden    Only dog with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Dog does not exist
   */
  .patch(Validate(updateDog), controller.update)
  /**
   * @api {patch} v1/dogs/dogId Delete Dog
   * @apiDescription Delete a dog
   * @apiVersion 1.0.0
   * @apiName DeleteDog
   * @apiGroup Dogs
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Forbidden 403)    Forbidden     Only dog with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Dog does not exist
   */
  .delete(controller.remove);

app.route('/upload').post(upload.single('photo'), controller.upload);

module.exports = app;
