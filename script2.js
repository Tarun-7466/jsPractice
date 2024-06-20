const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();

const API_KEY = 'your_api_key';
const SECRET = 'your_secret';
const CALLBACK_URL = 'http://localhost:3000/callback';

// Step 1: Redirect user to Last.fm for authorization
app.get('/auth', (req, res) => {
    const authUrl = `http://www.last.fm/api/auth/?api_key=${API_KEY}&cb=${CALLBACK_URL}`;
    res.redirect(authUrl);
});

// Step 2: Handle the callback from Last.fm
app.get('/callback', async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).send('Token is missing');
    }

    // Step 3: Create a web service session
    const method = 'auth.getSession';
    const api_sig = generateApiSignature({ api_key: API_KEY, method, token });

    try {
        const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
            params: {
                method,
                api_key: API_KEY,
                token,
                api_sig,
                format: 'json'
            }
        });

        const sessionKey = response.data.session.key;
        res.send(`Session Key: ${sessionKey}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating session');
    }
});

function generateApiSignature(params) {
    // Order the parameters alphabetically by name
    const sortedKeys = Object.keys(params).sort();
    let sigString = '';

    sortedKeys.forEach(key => {
        sigString += `${key}${params[key]}`;
    });

    sigString += SECRET;
    return crypto.createHash('md5').update(sigString).digest('hex');
}

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
