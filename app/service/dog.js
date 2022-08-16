const { omit } = require('lodash');
const Dog = require('../model/dog');

/**
 * Create Dog
 * @public
 *
 * @param {Object} dogData dogData
 * @param {String} dogData.name Dog's Name
 * @param {String} dogData.score Dog's Score
 *
 * @returns {Dog} Created Dog Object
 */
exports.CreateDog = async (dogData) => {
  try {
    const dog = new Dog(dogData);
    const su = await dog.save();
    return su;
  } catch (err) {
    throw err;
  }
};

/**
 * Get Dog By ID
 * @public
 *
 * @param {ObjectId} id mongoose Object id of dog
 * @returns {Promise<Dog>} dog data
 */
exports.Get = async (id) => Dog.get(id);

/**
 * Update Existing Dog
 * @public
 *
 * @param {Object} dog Dog Data (Old)
 * @param {Object} newData Dog Data (new)
 *
 * @returns {Dog} Updated dog data
 */
exports.UpdateDog = async (dog, newData) => {
  try {
    const dogToUpdate = omit(newData);
    const updateData = Object.assign(dog, dogToUpdate);
    const savedDog = await updateData.save();
    return savedDog;
  } catch (err) {
    throw err;
  }
};

/**
 * Replace existing dog
 * @public
 *
 * @param {Object} dog Dog Data (Old)
 * @param {Object} newDogData Dog Data (New)
 *
 * @returns {Dog} Replaced dog data
 */
exports.ReplaceDog = async (dog, newDogData) => {
  try {
    const newDog = new Dog(newDogData);
    const newDogObject = omit(newDog.toObject(), '_id');

    await dog.updateOne(newDogObject, { override: true, upsert: true });
    const savedDog = await Dog.findById(dog._id);

    return savedDog;
  } catch (err) {
    throw err;
  }
};

/**
 * Remove Dog
 * @public
 *
 * @param {Object} dog Dog to be Removed
 */
exports.RemoveDog = async (dog) => dog.remove();

/**
 * Upload Image to System
 * @param {Req} file - File Object in Request
 */
exports.UploadFile = async (file) => {
  const { path } = file;
  return path;
};
