'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'home.html');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const iceCreams = require(path.join(__dirname,'iceCream.json'));

// console.log(iceCreams.strawberry);
// console.log(iceCreams['chocolate'].name);

let flavors = Object.keys(iceCreams);
// console.log(flavors);
// console.log(flavors.name);
// console.log(flavors.includes('blueberry'));
// console.log(flavors.includes('xberry'));

const server = http.createServer((req, res)=> {
  let route = url.parse(req.url).pathname;

  if(route === '/') {
    fs.readFile(filePath, 'utf8', (err,data)=> {
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

  else {
    let responseJson = '';
    if(route === '/all') {
      // flavors = Object.keys(iceCreams) defined above
      responseJson = flavors;
    }
    else if(flavors.includes(route.substr(1))) {
      responseJson = iceCreams[route.substr(1)];
    }

    res.writeHead(200, {'content-type':'application/json'});
    res.end(JSON.stringify(responseJson));
  }
});

server.listen(port, host, ()=> {
  /*eslint-disable no-console*/
  console.log(`Server ${host} is running at the port ${port}.`);
  /*eslint-enable no-console*/
});
