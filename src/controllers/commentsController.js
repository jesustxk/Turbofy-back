const mongoose = require('mongoose');
const Song = mongoose.model('Song');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

// POST /comments/create
const createComment = (req, res) => {
    console.log('POST -- createComment');

    if (req.params.songId) {
        Song.findById(req.params.songId)
            .select('comments')
            .then((err, song) => {
                if (err) {
                    sendJSONresponse(res, 400, err);
                } else {
                    addComment(req, res, song);
                }
            });
    } else {
        sendJSONresponse(res, 404, { "message": "Canción no encontrada" });
    }
};

const addComment = (req, res, song) => {
    if (!song) {
        sendJSONresponse(res, 404, { "message": "Canción no encontrada" });
    } else {
        song.comments.push({
            comment: req.body.comment,
            author: req.body.author,
            rating: req.body.rating,
            geolocation: req.body.geolocation
        });
        song.save((err, song) => {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 201, song);
            }
        })
    }
};


// DELETE /comments/delete
const deleteComment = (req, res) => {
    console.log('DELETE -- deleteComment');

    if (!req.params.songId || req.params.commentId) {
        sendJSONresponse(res, 404, {"message": "Se debe indicar el comentario a borrar"});
    }

    Song.findById(req.params.songId)
        .select('comments')
        .then((err, song) => {
            if (!song) {
                sendJSONresponse(res, 404, {"message": "Canción no encontrada"});
            } else if (err) {
                sendJSONresponse(res, 400, err);
            }

            if (song.comments && song.comments.length > 0) {
                if (!song.comments.id(req.params.commentId)) {
                    sendJSONresponse(res, 404, {"message": "Comentario no encontrado"});
                } else {
                    song.comments.id(req.params.commentId).remove();
                    song.save((err) => {
                        if (err) {
                            sendJSONresponse(res, 404, err);
                        } else {
                            sendJSONresponse(res, 200, null);
                        }
                    })
                }
            } else {
                sendJSONresponse(res, 404, {"message": "Sin comentario que borrar"});
            }
        })
};


module.exports = {
    createComment,
    deleteComment
};