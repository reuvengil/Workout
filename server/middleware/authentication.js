const config = require('../config');
const { Apprentice } = require('../models/apprentice');
const jwt = require('jsonwebtoken');
const _ = require('underscore');


module.exports = async (req, res, next) => {
    var cookie = req.get('X-Auth-Token');
    if (_.isEmpty(cookie)) {
        req.auth = false;
        req.message = 'No token provided.';
        return next();
    }
    jwt.verify(cookie, config.PrivateKey, async function (err, decoded_apprentice) {
        if (err) {
            req.auth = false;
            req.message = 'No token provided.';
            return next();
        }

        var apprentice = await Apprentice.findById(decoded_apprentice._id, { password: false, __v: false });
        req.auth = true;
        req.apprentice = apprentice;
        return next();
    });
}