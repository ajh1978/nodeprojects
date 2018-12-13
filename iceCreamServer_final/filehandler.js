'use strict';

const fs = require('fs'); // filesystem
const path = require('path');

// const read = (filepath, encoding) => {...}
function read(filepath, encoding) {
  return new Promise((resolve, reject)=>{
    fs.readFile(filepath, encoding, (err,data)=>{
      if(err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
}

//in js6 you can give default parameters to function variabless
const sendFile = function(res, filepath,
  options = {
    type:'text/html',
    encoding:'utf8'
  }) {
  read(filepath, options.encoding)
    .then(data => {
      res.writeHead(200, {
        'content-type':options.type,
        'content-length':data.length
      });
      res.end(data, options.encoding);
    })
    .catch(err => {
      res.setStatusCode = 404;
      res.end(err.message);
    });
};

const sendJson = (res, flavor)=> {
  read(path.join(__dirname, 'iceCream.json'), 'utf8')
    .then(data => JSON.parse(data))
    .then(iceCreams => {
      if(Object.keys(iceCreams).includes(flavor)){
        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(iceCreams[flavor]));
      }
    })
    .catch(err => {
      res.setStatusCode = 404;
      res.end(err.message);
    });
};

// do not need parenthesis in arrow function if one parameter
const sendFlavors = res =>{
  read(path.join(__dirname, 'iceCream.json'), 'utf8')
    .then(data => JSON.parse(data))
    .then(iceCreams => Object.keys(iceCreams))
    .then(flavors => {
      res.writeHead(200,{'content.type':'application/json'});
      res.end(JSON.stringify(flavors));
    })
    .catch(err => {
      res.setStatusCode = 404;
      res.end(err.message);
    });
};

module.exports = {
  sendFile,
  sendJson,
  sendFlavors
};
