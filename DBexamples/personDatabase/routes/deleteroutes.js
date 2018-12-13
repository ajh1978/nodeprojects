'use strict';

const routes = require('express').Router();

module.exports = (storage, sendErrorPage, sendStatusPage) => {
  let dataStorage = storage;

  routes.get('/deleteform', (req,res) =>
    res.render('getPerson', {
      title: 'Delete',
      header: 'Delete person',
      action: '/delete'
    })
  );

  routes.post('/delete', (req,res) => {
    if(!req.body || !req.body.personId) {
      res.sendStatus(500);
    }
    else {
      dataStorage.delete(req.body.personId)
        .then(message => sendStatusPage(res, message))
        .catch(error => sendErrorPage(res, error.message));
    }
  });
  return routes;
};
