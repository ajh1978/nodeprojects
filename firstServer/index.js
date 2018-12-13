// javascript 6
'use strict';

const http = require('http');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const server = http.createServer((request, response)=> {
  response.writeHead(200, {'content-type':'text/plain'});
  response.write('Hello, world!!!');
  response.end();   // you could put 'Hello, world!!!' inside end-brackets and delete line 11 when there's only 1 response
});

server.listen(port, host, ()=>
  console.log(`Server ${host} is listening at port ${port}.`)
);
