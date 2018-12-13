'use strict';

const routes = require('express').Router();

module.exports = (dataStorage, sendErrorPage, sendStatusPage) => {

  routes.get('/updateform', (req,res) =>
    res.render('form', {
      title: 'Update product',
      header: 'Update product data',
      action: '/updatedata',
      productId: {value:'', readonly:''},
      name: {value:'', readonly:'readonly'},
      model: {value:'', readonly:'readonly'},
      price: {value:'', readonly:'readonly'},
      type: {value:'', readonly:'readonly'}
    })
  );

  routes.post('/updatedata', async (req,res) => {
    try {
      let product = await dataStorage.get(req.body.productId);
      res.render('form', {
        title: 'Update product',
        header: 'Update product data',
        action: '/updateproduct',
        productId: {value:product.productId, readonly:'readonly'},
        name: {value:product.name, readonly:''},
        model: {value:product.model, readonly:''},
        price: {value:product.price, readonly:''},
        type: {value:product.type, readonly:''}
      });
    }
    catch(err) {
      sendErrorPage(res, err.message);
    }
  });

  routes.post('/updateproduct', (req,res) => {
    if(!req.body) {
      res.sendStatsus(500);
    }
    else {
      dataStorage.update(req.body)
        .then(message => sendStatusPage(res,message))
        .catch(err => sendErrorPage(res, err.message));
    }
  });

  return routes;
};
