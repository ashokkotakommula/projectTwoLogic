const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    image: {
        type: Object,
        required: true
    },
    head: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Cards', cardSchema);