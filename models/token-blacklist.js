const mongoose = require('mongoose');

const tokenBlacklist = new mongoose.Schema({
    token: {
        type: String,
    },
});

module.exports = mongoose.model('tokenBlacklist',tokenBlacklist);