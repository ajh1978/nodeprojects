'use strict';

const http = require('http');
const path = require('path');
const url = require('url');

const {sendFile, sendJson, sendFlavors} = require(path.join(__dirname,'filehandler.js')); // doesn't need .js necessarily

const config = require(path.join(__dirname,'config.json'));

const homePath = path.join(__dirname,'home.html');
const faviconPath = path.join(__dirname,'favicon.png');

const server = http.createServer((req,res)=>{

  let route = url.parse(req.url).pathname;

  if(route === '/') {
    sendFile(res, homePath);
  }
  else if(route === '/favicon.png') {
    sendFile(res, faviconPath, {type:'image/png', encoding:'binary'});
  }
  else if(route === '/all'){
    sendFlavors(res);
  }
  else if(route.startsWith('/styles')) {
    sendFile(res, path.join(__dirname, route), {type:'text/css', encoding:'utf8'});
  }
  else if(route.startsWith('/images')) {
    sendFile(res, path.join(__dirname, route), {type:'image/png', encoding:'binary'});
  }
  else if(route.startsWith('/js')) {
    sendFile(res, path.join(__dirname, route), {type:'text/javascript', encoding:'utf8'});
  }
  //url: /api/blueberry
  else if(route.startsWith('/api')) {
    let parts = route.split('/');
    if(parts.length > 2) {
      sendJson(res, parts[2]);
    }
  }
  else {
    res.end();
  }
});

server.listen(config.port, config.host, ()=>{
  console.log(`Server ${config.host} is running at the port ${config.port}.`);
});
