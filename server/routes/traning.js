const Training = require('../models/training');
const Muscle = require('../models/muscle');
const router = require("express").Router();

router.get("/", async function (req, res) {
    if (req.auth) {
        const training_list = await Training.find({ apprentice_id: req.apprentice._id });
        res.json(training_list);
    } else {
        res.status(404).json({ message: 'apprentice not found' })
    }
});
router.post("/create", async function (req, res) {
    if (req.auth) {
        req.body.apprentice_id = req.apprentice._id;
        var training = await Training.create(req.body);
        res.json({ success: true });
    } else {
        res.status(404).json({ message: 'apprentice not found' })
    }
});
router.post("/update", async function (req, res) {
    if (req.auth) {
        var old = await Training.findById(req.body.old._id);
        old.sets = req.body.new.sets;
        old.reps = req.body.new.reps;
        old.resistance = req.body.new.resistance;
        res.json(await old.save());
    } else {
        res.status(404).json({ message: 'apprentice not found' })
    }
});
router.post("/delete", function (req, res) {
    if (req.auth) {
        Training.remove({ _id: req.body.id }, err => {
            res.json({ success: !err });
        });
    } else {
        res.status(404).json({ message: 'apprentice not found' })
    }
});

module.exports = router;
