const express = require('express');
const path = require('path');
const http = require('http');

const port = 3000;

const app = express();

// Publicy served files.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src', 'css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.set('port', port);

// Render the page.
app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}));

// Respond with `songData` object.
app.get('/songData', (req, res) => res.send(require('./songData.json')));

// Start the server.
const server = http.createServer(app);
server.listen(port)
server.on('listening', () => console.log('server listening on port', port, '\n'));
server.on('error', () => console.log('an error occured, debug pls'));
