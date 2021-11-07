const mongoose = require('mongoose');
const Joi = require('joi');

exports.Apprentice = mongoose.model('apprentice', new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
}));

exports.validate = (apprentice) => {
  return new Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
  }).validate(apprentice)
}