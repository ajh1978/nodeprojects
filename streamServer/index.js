'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const host = process.env.HOST ||'localhost';

const server = http.createServer((req,res)=>{
  let filePath = path.join(__dirname,'home.html');
  fs.exists(filePath, ok => {
    if(ok) {
      let file = fs.createReadStream(filePath);
      res.writeHead(200, {
        'content-type':'text/html'
      });
      file.pipe(res);
    }
    else {
      res.statusCode = 404;
      res.end('file not found');
    }
  });
});

server.listen(port, host, ()=>
/*eslint-disable no-console*/
  console.log(`Server ${host} is serving at port ${port}.`)
  /*eslint-enable no-console*/
);
