const mongoose = require('mongoose');
module.exports = mongoose.model('muscle', new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    is_front: {
        type: Boolean
    },
    category: {
        type: [Number]
    }
}));