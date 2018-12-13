'use strict';

const fs = require('fs');
const path = require('path');

const read = (filepath, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err,data) => {
      if(err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
};

const sendFile = function(res, filepath, options = {type:'text/html', encoding:'utf8'}) {
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

const sendPersons = res =>{
  read(path.join(__dirname, 'persons.json'), 'utf8')
    .then(data => JSON.parse(data))
    .then(persons => {
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(persons));
    })
    .catch(err => {
      res.setStatusCode = 404;
      res.end(err.message);
    });
};

module.exports = {
  sendFile,
  sendPersons
};
