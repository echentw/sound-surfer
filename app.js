const express = require('express');
const path = require('path');
const http = require('http');

const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', port);

app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}));

const server = http.createServer(app);
server.listen(port)

server.on('listening', () => console.log('server listening on port', port, '\n'));
server.on('error', () => console.log('an error occured, debug pls'));
