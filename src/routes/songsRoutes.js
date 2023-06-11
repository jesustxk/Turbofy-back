const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');
const spotyController = require('../controllers/spotyController');

// SONGS
router.post('/songs/create', songsController.createSong);
router.get('/songs/read', songsController.readSong);
router.get('/songs/readAll', songsController.readAllSongs);
router.get('songs/search', songsController.readSongsByFilter);
router.post('/songs/update', songsController.updateSong);
router.delete('/songs/delete', songsController.deleteSong);

// SEARCH SONGS SPOTIFY
router.get('/songs/spoty/read', spotyController.readSpotySong);

module.exports = router;