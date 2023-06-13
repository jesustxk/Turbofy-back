require('dotenv').config();

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

// GET /songs/spoty/read
const readSpotySong = async (req, res) => {
    if (process.env.SPOTY_TOKEN === '') {
        await updateToken(req, res);
    } else {
        try {
            const songsResponse = await fetch('https://api.spotify.com/v1/search?type=track&q=' + req.query.searchParams + '&limit=10', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + process.env.SPOTY_TOKEN,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            const songs = await songsResponse.json();
            console.log(songs)

            if (songs.error && songs.error.status && songs.error.status === 401) {
                console.log('Token invalido, se solicita uno nuevo y se reintenta la llamada a la API')
                await updateToken(req, res);
            } else {
                sendJSONresponse(res, 200, songs);
            }
        } catch (err) {
            sendJSONresponse(res, 404, { 'message': 'Error al tratar de obtener el listado de canciones, inténtelo de nuevo' });
        }
    }
};

const updateToken = async (req, res) => {
    const bearerToken = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': process.env.SPOTY_ID,
            'client_secret': process.env.SPOTY_SECRET
        })
    })
    
    const token = await bearerToken.json();

    console.log('Nuevo bearer token obtenido');

    // Actualizamos el token
    process.env.SPOTY_TOKEN = token.access_token;
    
    // Recuperamos las canciones
    try {
        console.log('https://api.spotify.com/v1/search?type=track&q=' + req.query.searchParams + '&limit=10')
        const songsResponse = await fetch('https://api.spotify.com/v1/search?type=track&q=' + req.query.searchParams + '&limit=10', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + process.env.SPOTY_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        
        const songs = await songsResponse.json();
        console.log(songs)

        sendJSONresponse(res, 200, songs);
    } catch (error) {
        sendJSONresponse(res, 404, { 'message': 'Error al tratar de obtener el listado de canciones, inténtelo de nuevo' });
    }
};

module.exports = {
    readSpotySong
};