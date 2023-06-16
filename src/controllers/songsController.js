const mongoose = require('mongoose');
const Song = mongoose.model('Song');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};


// POST /songs/create
const createSong = async (req, res) => {
    console.log('POST -- createSong');

    const song = mongoose.model('Song')({
        name: req.body.name,
        artist: req.body.artist,
        image: req.body.image,
        genre: req.body.genre,
        duration: req.body.duration,
        geolocation: req.body.geolocation
    });

    song.save()
        .then((song) => { sendJSONresponse(res, 200, song); })
        .catch((err) => { sendJSONresponse(res, 400, { "message": "La canción ya existe o no se ha podido crear" });
    });
};


// GET /songs/read
const readSong = async (req, res) => {
    console.log('GET -- readSong');

    try {
        const song = await Song.findById(req.query.songId);
        if (!song) {
            sendJSONresponse(res, 404, { "message": "Canción no encontrada" });
        } 

        sendJSONresponse(res, 200, song);
    } catch (err) {
        sendJSONresponse(res, 500, { "message": "Error interno" });
    }
};


// GET /songs/readAll
const readAllSongs = async (req, res) => {
    console.log('GET -- readAllSongs');
    
    try {
        const songs = await Song.find({});

        if (!songs) {
            sendJSONresponse(res, 404, { "message": "No se han encontrado canciones" });
        }
        
        sendJSONresponse(res, 200, songs);
    } catch (err) {
        sendJSONresponse(res, 500, { "message": "Error interno" });
    }
};


// GET /songs/search
const readSongsByFilter = async (req, res) => {
    console.log('GET -- readSongsByFilter');

    let filter = {};

    if (req.query.name) {
        filter.name = req.query.name;
    } else if (req.query.artist) {
        filter.artist = req.query.artist;
    } else if (req.query.date) {
        filter.date = req.query.date;
    }

    try {
        const songs = await Song.find(filter);

        if (!songs) {
            sendJSONresponse(res, 404, { "message": "No se han encontrado canciones" });
        }
        sendJSONresponse(res, 200, songs);
    } catch (err) {
        sendJSONresponse(res, 500, { "message": "Error interno" });
    }
}


// POST /songs/update
const updateSong = async (req, res) => {
    console.log('POST -- updateSong');

    try {
        if (!req.query.songId) {
            sendJSONresponse(res, 400, { "message": "Se debe indicar la canción a actualizar" });
        }

        const song = await Song.findById(req.query.songId).select('-comments');

        if (!song) {
            sendJSONresponse(res, 404, { "message": "Canción no encontrada" });
        }

        song.name = req.body.name;
        song.artist = req.body.artist;
        song.image = req.body.image;
        song.genre = req.body.genre;
        song.duration = req.body.duration;
        song.date = req.body.date;
        song.geolocation = req.body.geolocation;

        song.save().then((song) => { sendJSONresponse(res, 200, song);});
    } catch (err) {
        sendJSONresponse(res, 500, { "message": "Error interno" });
    }
};


// DELETE /songs/delete
const deleteSong = async (req, res) => {
    console.log('DELETE -- deleteSong');

    if (!req.query.songId) {
        sendJSONresponse(res, 400, { 'message': 'Se debe indicar la canción a eliminar' });
    }

    try {
        Song.findByIdAndRemove(req.query.songId).then((song) => {
            if (song !== null) {
                console.log('Se elimina la canción ' + song);
                sendJSONresponse(res, 200, { 'message': 'Canción eliminada' });
            } else {
                sendJSONresponse(res, 404, { 'message': 'Canción no encontrada' });
            }
        });
    } catch (err) {
        sendJSONresponse(res, 500, { "message": "Error interno" });
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