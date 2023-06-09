const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// COMMENTS
router.post('/comments/create', commentsController.createComment);
router.delete('/comments/delete', commentsController.deleteComment);

module.exports = router;