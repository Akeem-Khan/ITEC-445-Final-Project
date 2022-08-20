const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Chat = new Schema({
    users: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('Chat', Chat);