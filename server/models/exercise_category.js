const mongoose = require('mongoose');
module.exports = mongoose.model('exercise_category', new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    }
}));