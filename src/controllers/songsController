const mongoose = require('mongoose');
const Song = mongoose.model('Song');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};


// POST /songs/create
const createSong = async (req, res) => {
    Song.create({
        name: req.body.name,
        artist: req.body.name,
        image: req.body.image,
        genre: req.body.genre,
        duration: req.body.duration,
        geolocation: req.body.geolocation
    }, (err, song) => {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 201, song);
        }
    });
};


// GET /songs/read
const readSong = (req, res) => {
    Song.findById(req.params.songId)
        .exec((err, song) => {
            if (!song) {
                sendJSONresponse(res, 404, { "message": "Canción no encontrada" });
            } else if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, song);
            }
        });
};


// GET /songs/readAll
const readAllSongs = (req, res) => {
    Song.find({})
        .exec((err, songs) => {
            if (!songs) {
                sendJSONresponse(res, 404, { "message": "No se han encontrado canciones" });
            } else if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, songs);
            }
        });
};


// GET /songs/search
const readSongsByFilter = (req, res) => {
    Song.find({ name: req.params.name, artist: req.params.artist, date: req.params.date })
        .exec((err, songs) => {
            if (!songs) {
                sendJSONresponse(res, 404, { "message": "No se han encontrado canciones" });
            } else if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, songs);
            }
        });
}


// POST /songs/update
const updateSong = (req, res) => {
    if (!req.params.songId) {
        sendJSONresponse(res, 404, { "message": "Se debe indicar la canción a actualizar" });
    }

    Song.findById(req.params.songId)
        .select('-comments')
        .exec((err, song) => {
            if (!song) {
                sendJSONresponse(res, 404, { "message": "Canción no encontrada" });
            } else if (err) {
                sendJSONresponse(res, 400, err);
            }

            song.name = req.body.name;
            song.artist = req.body.name;
            song.image = req.body.image;
            song.genre = req.body.genre;
            song.duration = req.body.duration;
            song.geolocation = req.body.geolocation;

            song.save((err, song) => {
                if (err) {
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 200, song);
                }
            });
        });
};


// POST /songs/delete
const deleteSong = (req, res) => {
    if (req.params.songId) {
        Song.findByIdAndRemove(req.params.songId)
            .exec((err, song) => {
                if (err) {
                    sendJSONresponse(res, 404, err);
                }
                console.log('Se elimina la canción ' + songId);
                sendJSONresponse(res, 200, null);
            });
    } else {
        sendJSONresponse(res, 404, { 'message': 'No se encuentra la canción' });
    }
};


module.exports = {
    createSong,
    readSong,
    readAllSongs,
    readSongsByFilter,
    updateSong,
    deleteSong
};