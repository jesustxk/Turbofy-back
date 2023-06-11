require('dotenv').config();

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

// GET /songs/spoty/read
const readSpotySong = async (req, res) => {
    try {
        const songs = await getSongs(req, res);
        sendJSONresponse(res, 200, songs);
    } catch (error) {

        if (error.response.status === 401) {
            console.log('Token invalido, se solicita uno nuevo y se reintenta la llamada a la API')
            await updateToken();
        } else {
            sendJSONresponse(res, error.response.status, { 'message': 'Error al tratar de obtener el listado de canciones, inténtelo de nuevo' });
        }
    }
};

const getSongs = async (req, res) => {
    const songs = await fetch('https://api.spotify.com/v1/search?q=' + req.params.searchParams + '&type=track&limit=10', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.SPOTY_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    res.json(songs);
}

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

    console.log('Nuevo bearer token obtenido');

    // Actualizamos el token
    process.env.SPOTY_TOKEN = bearerToken.access_token;

    // Recuperamos las canciones
    try {
        const songs = await getSongs(req, res);
        sendJSONresponse(res, 200, songs);
    } catch (error) {
        sendJSONresponse(res, error.response.status, { 'message': 'Error al tratar de obtener el listado de canciones, inténtelo de nuevo' });
    }
};

module.exports = {
    readSpotySong
};