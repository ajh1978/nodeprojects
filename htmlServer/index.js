'use strict';

const http = require('http');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer( (req, res)=> {
  res.writeHead(200, {'content-type':'text/plain; charset=utf-8'});
  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>This is a test</title>
      </head>
      <body>
        <h1>Hello Wörld!</h1>
      </body>
    </html>
    `);
  res.end();
});

server.listen(port, host, ()=>
  console.log(`Server ${host} is listening the port ${port}.`)
);
