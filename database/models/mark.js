const { Schema, default: mongoose } = require('mongoose');

const markSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    username: {
        type: String, 
        required: true,
    },
    date: {
        type: Number,
        required: true
    }
})

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark