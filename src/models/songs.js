const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    author: String,
    date: {type: Date, "default": Date.now},
    rating: {type: Number, "default": 0, min: 0, max: 5},
    geolocation: {latitude: Number, longitude: Number}
});

const songSchema = new mongoose.Schema({
    name: String,
    artist: String,
    album: String,
    duration: String,
    image: {url: String, base64: String},
    date: {type: Date, "default": Date.now},
    geolocation: {latitude: Number, longitude: Number},
    comments: [commentSchema],
});

songSchema.index({ name: 1, artist: 1}, { unique: true })

mongoose.model('Song', songSchema);