'use strict';

const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
const {host, port, debug} = require('./serverConfig');

const server = http.createServer(app);

// this will require the initDataStorage function and call it with debug parameter from serverConfig.json
const personStorage = require('./personDB')(debug);

const statusHandling = [sendErrorPage, sendStatusPage];

const getroutes = require('./routes/getroutes')(personStorage, ...statusHandling);
const insertroutes = require('./routes/insertroutes')(personStorage, ...statusHandling);
const deleteroutes = require('./routes/deleteroutes')(personStorage, ...statusHandling);
const updateroutes = require('./routes/updateroutes')(personStorage, ...statusHandling);

app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageViews'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', getroutes);
app.use('/', insertroutes);
app.use('/', deleteroutes);
app.use('/', updateroutes);
app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'menu.html')));

server.listen(port, host, () => {
  /*eslint-disable no-console*/
  console.log(`Server ${host} at port ${port}`);
});

function sendErrorPage(res, message='Error', title='Error', header='Error') {
  sendStatusPage(res, message, title, header);
}

function sendStatusPage(res, message='Status', title='Status', header='Status') {
  return res.render('statusPage', {message:message, title:title, header:header});
}
