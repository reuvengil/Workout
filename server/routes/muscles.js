const Muscle = require('../models/muscle');
const Exercise_category = require('../models/exercise_category');

const router = require("express").Router();

router.get("/muscle_group", async function (req, res) {
    var muscle_group = (await Muscle.find({}, {
        __v: false,
        _id: false
    }));
    if (req.query.catId) {
        var filtered_muscle_group = [];
        muscle_group.forEach(muscle => {
            if (muscle.category.includes(req.query.catId)) {
                filtered_muscle_group.push(muscle)
            }
        })
        res.json(filtered_muscle_group);
    } else {
        res.json(muscle_group);
    }
});
router.get("/muscle_category", async function (req, res) {
    var muscle_category = (await Exercise_category.find({}, {
        __v: false,
        _id: false
    }));
    res.json(muscle_category);
});
router.get("/muscleInfo", async function (req, res) {

    var muscle_category = (await Exercise_category.find({}, {
        __v: false,
        _id: false,
    }));
    var muscle_group = (await Muscle.find({}, {
        __v: false,
        _id: false
    }));
    var info = [];
    var infoItem;
    for (let i = 0; i < muscle_category.length; i++) {
        infoItem = {};
        infoItem.groups = [];
        infoItem.category = muscle_category[i].name;
        for (let j = 0; j < muscle_group.length; j++) {
            const group = muscle_group[j];
            if (group.category.includes(muscle_category[i].id)) {
                infoItem.groups.push(group.name);
            }
        }
        info.push(infoItem);
    }
    res.json(info);
})

module.exports = router;