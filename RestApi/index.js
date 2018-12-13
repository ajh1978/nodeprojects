'use strict';

const path = require('path');
const http = require('http');
const cors = require('cors');

const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

const server = http.createServer(app);

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

const api = require('./gameapi')();
app.use('/api', api);

/*eslint-disable no-console*/
server.listen(port, host, () => console.log(`Server at ${port}`));
