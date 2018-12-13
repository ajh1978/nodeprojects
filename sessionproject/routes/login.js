'use strict';

const router = require('express').Router();

module.exports = (sessionStorage, users) => {

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.post('/login', (req, res) => {
    if(!req.body.name || !req.body.password) {
      res.render('info', errorMessage('You must provide username and password', '/login'));
    }
    else {
      if(users.checkUser(req.body.name, req.body.password)) {
        if(!sessionStorage.addSession(req.sessionID, req.body.name, req.session)) {
          if(sessionStorage.getUser(req.sessionID) === req.body.name) {
            res.render('info', statusMessage('You are already logged in'));
          }
          else {
            sessionStorage.remove(req.sessionID);
            req.session.destroy();
            res.render('info', errorMessage('Error in login. Try again.', '/login'));
          }
        }
        else {
          res.render('info', statusMessage('You are logged in'));
        }
      }
      else {
        res.render('info', errorMessage('You are not allowed to use this site', '/', 'Access denied'));
      }
    }
  });

  return router;
};

function errorMessage(info='Error', url='/', title='login', mode='error', delay=2) {
  return {title, info, url, delay, mode};
}

function statusMessage(info='Status', url='/', title='Login', mode='status', delay=1) {
  return {title, info, url, delay, mode};
}
