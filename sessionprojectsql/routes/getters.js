'use strict';

const {
  allText,
  userText,
  adminText
} = require('./texts');

let sessionStorage;

const router = require('express').Router();

module.exports = storage => {
  sessionStorage = storage;
  const user = require('./allowed')(sessionStorage, 'user');
  const admin = require('./allowed')(sessionStorage, 'admin');

  const publicResource = [admin, user];

  router.get('/', (req, res) => {
    res.render('menu');
  });

  router.get('/all', (req, res) =>
    res.render('response', allText)
  );

  router.get('publicdata', publicResource, login, (req, res) => {
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
  sessionStorage.hasSessionId(req.sessionID)
    .then(result => {
      if(!result) {
        res.render('login');
      }
      else if(!req.isAllowed) {
        res.render('info', {
          title: 'Access denied',
          info: 'The page needs higher clearance.',
          url: '/',
          delay: 2,
          mode: 'error'
        });
      }
      else {
        next();
      }
    })
    .catch(() => res.render('info', {
      title: 'Access denied',
      info: 'Access denied',
      url: '/',
      delay: 2,
      mode: 'error'
    }));
}
