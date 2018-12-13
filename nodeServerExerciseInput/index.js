'use strict';

const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

const {sendFile, sendPersons} = require(path.join(__dirname,'filehandler.js'));

const config = require(path.join(__dirname,'config.json'));
const homePath = path.join(__dirname,'home.html');
const formPath = path.join(__dirname,'form.html');

const server = http.createServer((req,res)=>{

  let route = url.parse(req.url).pathname;

  if(route === '/') {
    sendFile(res, formPath);
  }
  else if(route === '/persons') {
    sendPersons(res);
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
  else {
    res.end();
  }

  if(req.method === 'GET') {
    fs.readFile(formPath, 'utf8', (err,data)=>{
      if(err) {
        res.statusCode = 404;
        res.end(err.message);
      }
      else {
        res.writeHead(200, {
          'content-type':'text/html',
          'content-length':data.length
        });
        res.end(data);
      }
    });
  }
  else if(req.method === 'POST') {
    if(req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
      res.statusCode = 404;
      res.end('error');
    }
    else {
      let data = [];
      req.on('data', newPerson => data.push(newPerson));
      req.on('end', ()=> {
        let tmp = JSON.stringify(qs.parse(Buffer.concat(data).toString()));
        // old json as array. push tmp to it.
        let oldJson = JSON.stringify('persons.json');
        let newJson = oldJson.concat(tmp);
        fs.writeFileSync('persons.json', newJson);
        res.end();
      });
    }
  }
});

server.listen(config.port, config.host, ()=>{
  console.log(`Server ${config.host} is running at the port ${config.port}.`);
});
