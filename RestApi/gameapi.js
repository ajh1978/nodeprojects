'use strict';

const path = require('path');
const fs = require('fs');

const routes = require('express').Router();

module.exports = () => {
  routes.get('/', (req,res) => res.sendStatus(404));

  routes.get('/levels', (req,res) => {
    let filepath = path.join(__dirname, 'levels');
    readLevels(filepath)
      .then(result => res.json(result))
      .catch(() => res.sendStatus(404));
  });

  routes.get('/levels/:levelNumber/rooms', (req,res) => {
    let levelNumber = req.params.levelNumber;
    let folder = `level${levelNumber}`;
    let filepath = path.join(__dirname, 'levels', folder);
    readRoomsOfLevel(filepath)
      .then(result => res.json(result))
      .catch(() => res.sendStatus(404));
  });

  routes.get('/levels/:levelNumber/rooms/:roomNumber', (req,res) => {
    let levelNumber = req.params.levelNumber;
    let roomNumber = req.params.roomNumber;
    let levelFolder = `level${levelNumber}`;
    let roomfile = `room${roomNumber}.json`;
    let filepath = path.join(__dirname, 'levels', levelFolder, roomfile);
    readRoom(filepath)
      .then(result => res.json(result))
      .catch(() => res.sendStatus(404));
  });

  return routes;
};

// local helpers
function readLevels(filepath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filepath, (err, data) => {
      if(err) { reject(err); }
      else {
        data.sort();
        return resolve(data);
      }
    });
  });
}

function readRoomsOfLevel(filepath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filepath, (err, data) => {
      if(err) { reject(err); }
      else {
        Promise.all(data.map(room => readRoom(path.join(filepath, room))))
          .then(result => {
            result.sort((roomA, roomB) => roomA.roomId-roomB.roomId);
            return resolve(result);
          });
      }
    });
  });
}

function readRoom(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if(err) { reject(err); }
      else { resolve(JSON.parse(data)); }
    });
  });
}
