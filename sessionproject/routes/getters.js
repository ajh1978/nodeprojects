'use strict';

const {
  allText,
  userText,
  adminText
} = require('./texts');

let sessionStorage;

const router = require('express').Router();

module.exports = (storage, users) => {
  sessionStorage = storage;

  const user = require('./allowed')(sessionStorage, users, 'user');
  const admin = require('./allowed')(sessionStorage, users, 'admin');

  const publicResource = [admin, user];

  router.get('/', (req, res) => {
    res.render('menu');
  });

  router.get('/all', (req, res) => {
    res.render('response', allText);
  });

  router.get('/publicdata', publicResource, login, (req, res) => {
    if(req.isAllowed) {
      delete req.isAllowed;
      res.render('response', userText);
    }
  });

  router.get('/admindata', admin, login, (req, res) => {
    if(req.isAllowed) {
      delete req.isAllowed;
      res.render('response', adminText);
    }
  });
  return router;
};

//middleware
function login(req, res, next) {
  if(!sessionStorage.hasSession(req.sessionID)) {
    res.render('login');
  }
  else if(!req.isAllowed) {
    res.render('info', {
      title: 'Access denied',
      info: 'The page you requested is for higher clearance only.',
      url: '/',
      delay: 2,
      mode: 'error'
    });
  }
  else {
    next();
  }
}
