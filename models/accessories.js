const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
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
    cubes: [{type: mongoose.Types.ObjectId, ref:'Cube'}]
    
});

module.exports = mongoose.model('Accessories',accessoriesSchema);