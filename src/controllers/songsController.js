const mongoose = require('mongoose');
const Song = mongoose.model('Song');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};


// POST /songs/create
const createSong = async (req, res) => {
    console.log('POST -- createSong');

    Song.create({
        name: req.body.name,
        artist: req.body.artist,
        image: req.body.image,
        genre: req.body.genre,
        duration: req.body.duration,
        geolocation: req.body.geolocation
    }).then((err, song) => {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 201, song);
        }
    });
};


// GET /songs/read
const readSong = async (req, res) => {
    console.log('GET -- readSong');

    Song.findById(req.params.songId)
        .then((err, song) => {
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
const readAllSongs = async (req, res) => {
    console.log('GET -- readAllSongs');
    
    Song.find({})
        .then((err, songs) => {
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
const readSongsByFilter = async (req, res) => {
    console.log('GET -- readSongsByFilter');

    let filter = '{';

    if (req.params.name) {
        filter += 'name: ' + req.params.name + ', ';
    } else if (req.params.artist) {
        filter += 'artist: ' + req.params.artist + ', ';
    } else if (req.params.date) {
        filter += 'date: ' + req.params.date;
    }
    
    filter += '}';

    Song.find(JSON.parse(filter))
        .then((err, songs) => {
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
const updateSong = async (req, res) => {
    console.log('POST -- updateSong');

    if (!req.params.songId) {
        sendJSONresponse(res, 404, { "message": "Se debe indicar la canción a actualizar" });
    }

    Song.findById(req.params.songId)
        .select('-comments')
        .then((err, song) => {
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


// DELETE /songs/delete
const deleteSong = async (req, res) => {
    console.log('DELETE -- deleteSong');

    if (req.params.songId) {
        Song.findByIdAndRemove(req.params.songId)
            .then((err, song) => {
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