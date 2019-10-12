const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
        //Max length validation
    },
    imageUrl: {
        type: String,
        required: true
         //http/s validation

    },
    difficultyLevel:{
        type: Number,
        required: true
         //min and max valid range
    },
    accessories: [{type: mongoose.Types.ObjectId, ref: 'Accessories'}]
});

module.exports = mongoose.model('Cube',cubeSchema);