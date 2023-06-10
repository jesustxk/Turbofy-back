const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');

// SONGS
router.post('/songs/create', songsController.createSong);
router.get('/songs/read', songsController.readSong);
router.get('/songs/readAll', songsController.readAllSongs);
router.post('/songs/update', songsController.updateSong);
router.delete('/songs/delete', songsController.deleteSong);

// COMMENTS
router.post('/comments/read', songsController.createComment);
router.get('/comments/read', songsController.readComment);
router.get('/comments/readSong', songsController.readSongComments);
router.post('/comments/update', songsController.updateComment);
router.delete('/comments/delete', songsController.deleteComment);

module.exports = router;