const mongoose = require('mongoose');
const Song = mongoose.model('Song');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

// POST /comments/create
const createComment = async (req, res) => {
    console.log('POST -- createComment');
    
    if (req.query.songId) {
        try {
            const song = await Song.findById(req.query.songId);
            
            addComment(req, res, song);
        } catch (err) {
            sendJSONresponse(res, 400, { "message": "No ha sido posible crear el comentario" });
        }
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

        song.save().then((song) => { sendJSONresponse(res, 200, song);});
    }
};


// DELETE /comments/delete
const deleteComment = async (req, res) => {
    console.log('DELETE -- deleteComment');

    if (!req.query.songId || !req.query.commentId) {
        sendJSONresponse(res, 400, {"message": "Se debe indicar el comentario a borrar" });
    }
    
    try {
        Song.findById(req.query.songId).then((song) => {
            if (song !== null && song !== undefined && song.comments.length > 0) {
                if (!song.comments.id(req.query.commentId)) {
                    sendJSONresponse(res, 404, {"message": "Comentario no encontrado" });
                } else {
                    song.comments.pull({_id: req.query.commentId });

                    song.save().then((song) => { sendJSONresponse(res, 200, song);});
                }
            } else {
                sendJSONresponse(res, 404, {"message": "Comentario no encontrado" });
            }
        });
    } catch (err) {
        sendJSONresponse(res, 500, {"message": "Error interno" });
    }
};


module.exports = {
    createComment,
    deleteComment
};