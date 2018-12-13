'use strict';

const http=require('http');

const port=process.env.PORT || 3000;
const host=process.env.HOST || 'localhost';

const server=http.createServer( (request,response)=>{
  let url=require('url').parse(request.url,true);

  response.writeHead(200, {'content-type':'text/html'});

  if(url.pathname==='/') {
    response.write('Hello World!');
  }
  else {
    response.write(`Hello ${url.pathname}!`);
  }
  response.end();
});

server.listen(port,host, ()=>
/*eslint-disable no-console */
  console.log(`Server ${host} is listening port ${port}.`)
/*eslint-enable no-console*/
);
