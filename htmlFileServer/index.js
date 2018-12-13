'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer((req, res)=> {
  let filePath = path.join(__dirname,'home.html');
  // console.log('filePath=',filePath);
  fs.readFile(filePath,'utf8',(err,data)=> {
    if(err) {
      res.statusCode = 404;
      res.end(err.message);  // only debugging purposes
    }
    else {
      res.writeHead(200, {
        'content-type':'text/html',
        'content-length':data.length
      });
      res.end(data);
    }
  });
});

server.listen(port,host,()=>
  /*eslint-disable no-console*/
  console.log(`Server ${host} is serving at port ${port}.`)
  /*eslint-enable no-console*/
);
