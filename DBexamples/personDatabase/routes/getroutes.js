'use strict';

const routes = require('express').Router();

const initRoutes = function(storage, sendErrorPage) {
  let dataStorage = storage;

  routes.get('/all', (req,res) => {
    dataStorage.getAll()
      .then(result => res.render('allPersons', {result:result}))
      .catch(err => sendErrorPage(res, err.message));
  });

  routes.get('/getperson', (req,res) => res.render('getPerson', {title:'Get', header:'Get', action:'/getperson'}));

  routes.post('/getperson', (req,res) => {
    if(!req.body) {
      res.sendStatus(401);
    }
    else {
      let personId = req.body.personId;
      dataStorage.get(personId)
        .then(person => res.render('personPage', {person}))
        .catch(err => sendErrorPage(res,err.message,'PersonError','Oops!'));
    }
  });

  return routes;
};

module.exports = initRoutes;
