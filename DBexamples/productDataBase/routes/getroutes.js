'use strict';

const routes = require('express').Router();

const initRoutes = function(storage, sendErrorPage) {
  let dataStorage = storage;

  routes.get('/all', (req,res) => {
    dataStorage.getAll()
      .then(result => res.render('allProducts', {result:result}))
      .catch(err => sendErrorPage(res, err.message));
  });

  routes.get('/getproduct', (req,res) => res.render('getProduct', {title:'Get', header:'Get a product', action:'/getproduct'}));

  routes.post('/getproduct', (req,res) => {
    if(!req.body) {
      res.sendStatus(401);
    }
    else {
      let productId = req.body.productId;
      dataStorage.get(productId)
        .then(product => res.render('productPage', {product}))
        .catch(err => sendErrorPage(res,err.message,'ProductError','whoa!'));
    }
  });

  return routes;
};

module.exports = initRoutes;
