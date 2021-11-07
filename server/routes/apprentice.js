const config = require('../config');
const { Apprentice, validate } = require('../models/apprentice');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
var apprentice_list;

//get all users
router.get("/", async function (req, res) {
    apprentice_list = await Apprentice.find({}, { __v: 0, password: 0 });
    res.json(apprentice_list);
});
//if apprentice connected
router.get('/isconnected', function (req, res) {
    res.json({
        auth: req.auth,
        apprentice: req.apprentice
    });
})
//register
router.post("/create", async function (req, res) {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.json({ message: error.details[0].message });
    }
    // Check if this apprentice already exisits
    let apprentice = await Apprentice.findOne({ name: req.body.name });
    if (apprentice) {
        return res.json({ message: 'That user already exisits!' });
    }
    apprentice = new Apprentice({
        name: req.body.name,
        password: req.body.password,
    });
    //hashing password
    const salt = await bcrypt.genSalt(10);
    apprentice.password = await bcrypt.hash(apprentice.password, salt);

    //saving in db
    await apprentice.save();

    //return result to client
    const token = jwt.sign({ _id: apprentice._id }, config.PrivateKey);
    res.json({ seccess: true, token });
});

//signin
router.post("/signin", async function (req, res) {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.json({ message: error.details[0].message });
    }
    // Check if this apprentice exisits
    let apprentice = await Apprentice.findOne({ name: req.body.name });

    if (!apprentice) {
        return res.json({ message: 'Incorrect name or password.' });
    }
    const validPassword = await bcrypt.compare(req.body.password, apprentice.password);
    if (!validPassword) {
        return res.json({ message: 'Incorrect name or password.' });
    }
    const token = jwt.sign({ _id: apprentice._id }, config.PrivateKey);
    res.json({ seccess: true, token: token, days: 7 });
});

module.exports = router;