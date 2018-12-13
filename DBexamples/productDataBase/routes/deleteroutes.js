'use strict';

const routes = require('express').Router();

module.exports = (storage, sendErrorPage, sendStatusPage) => {
  let dataStorage = storage;

  routes.get('/deleteform', (req,res) =>
    res.render('getProduct', {
      title: 'Delete',
      header: 'Delete product',
      action: '/delete'
    })
  );

  routes.post('/delete', (req,res) => {
    if(!req.body || !req.body.productId) {
      res.sendStatus(500);
    }
    else {
      dataStorage.delete(req.body.productId)
        .then(message => sendStatusPage(res, message))
        .catch(error => sendErrorPage(res, error.message));
    }
  });
  return routes;
};
