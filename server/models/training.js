const mongoose = require('mongoose');

module.exports = mongoose.model('training', new mongoose.Schema({
  apprentice_id: {
    type: String
  },
  muscle_group: {
    type: String
  },
  sub_muscle_group: {
    type: String
  },
  training: {
    type: String
  },
  sets: {
    type: String
  },
  reps: {
    type: String
  },
  resistance: {
    type: String
  }
}));