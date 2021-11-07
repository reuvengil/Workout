const config = require('./config');
const Muscle = require('./models/muscle');
const mongoose = require('mongoose');
const Exercise_category = require('./models/exercise_category');
mongoose.connect(config.mongodb.connection_url, config.mongodb.options, (err) => {
    if (err) console.error(err.message);
    else {
        createIfNotExists();
    }
});
async function createIfNotExists() {
    var m = await Muscle.exists({});
    var c = await Exercise_category.exists({});
    if (m & c) {
        console.log('ready to start:)');
        process.exit(0);
    }
    else {
        await Muscle.create([
            {
                "id": 1,
                "name": "Anterior deltoid",
                "is_front": true,
                "category": [13],
            },
            {
                "id": 0,
                "name": "Biceps brachii",
                "is_front": true,
                "category": [8],
            },
            {
                "id": 10,
                "name": "Biceps femoris",
                "is_front": false,
                "category": [9],
            },
            {
                "id": 12,
                "name": "Brachialis",
                "is_front": true,
                "category": [8],
            },
            {
                "id": 6,
                "name": "Gastrocnemius",
                "is_front": false,
                "category": [14, 9],
            },
            {
                "id": 7,
                "name": "Gluteus maximus",
                "is_front": false,
                "category": [9],
            },
            {
                "id": 11,
                "name": "Latissimus dorsi",
                "is_front": false,
                "category": [12],
            },
            {
                "id": 13,
                "name": "Obliquus externus abdominis",
                "is_front": true,
                "category": [10],
            },
            {
                "id": 3,
                "name": "Pectoralis major",
                "is_front": true,
                "category": [11],
            },
            {
                "id": 9,
                "name": "Quadriceps femoris",
                "is_front": true,
                "category": [9],
            },
            {
                "id": 5,
                "name": "Rectus abdominis",
                "is_front": true,
                "category": [10],
            },
            {
                "id": 2,
                "name": "Serratus anterior",
                "is_front": true,
                "category": [12],
            },
            {
                "id": 14,
                "name": "Soleus",
                "is_front": false,
                "category": [9],
            },
            {
                "id": 8,
                "name": "Trapezius",
                "is_front": false,
                "category": [12, 13],
            },
            {
                "id": 4,
                "name": "Triceps brachii",
                "is_front": false,
                "category": [8],
            }
        ]);
        await Exercise_category.create([
            {
                "id": 10,
                "name": "Abs"
            },
            {
                "id": 8,
                "name": "Arms"
            },
            {
                "id": 12,
                "name": "Back"
            },
            {
                "id": 14,
                "name": "Calves"
            },
            {
                "id": 11,
                "name": "Chest"
            },
            {
                "id": 9,
                "name": "Legs"
            },
            {
                "id": 13,
                "name": "Shoulders"
            }
        ])
    }
    console.log(`done upload items to DB`);
    console.log('ready to start:)');
    process.exit(0);
}
