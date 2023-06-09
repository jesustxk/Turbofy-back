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
    date: {type: Date, "default": Date.now},
    image: {url: String, imageBase64String: String},
    comments: [commentSchema],
    genre: String,
    duration: Number,
    geolocation: {latitude: Number, longitude: Number}
});

mongoose.model('Song', songSchema);