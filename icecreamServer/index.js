'use strict';

const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer((req, res)=> {
  let route = url.parse(req.url).pathname;
  let responseJson = '';

  if(route === '/vanilla') {
    responseJson = {
      name: 'Vanilla',
      price: '2 €'
    };
  }
  else if (route === '/strawberry') {
    responseJson = {
      name: 'Strawberry',
      price: '2.5 €'
    };
  }
  else if (route === '/blueberry') {
    responseJson = {
      name: 'Blueberry',
      price: '3 €'
    };
  }

  res.writeHead(200, {
    'content-type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });
  res.end(JSON.stringify(responseJson));
});

server.listen(port, host, ()=> {
  /*eslint-disable no-console*/
  console.log(`Server ${host} is running at the port ${port}.`);
  /*eslint-enable no-console*/
});
