'use strict';

const router = require('express').Router();

module.exports = (sessionStorage) => {
  router.route('/login')
    .get((req, res) => res.render('login'))
    .post(async (req, res) => {
      try {
        if(!req.body.name ||!req.body.password) {
          res.render('info', errorMessage('You must provide username and password', '/login'));
        }
        else {
          let passwordOK = await sessionStorage.checkPassword(req.body.name, req.body.password);
          if(!passwordOK) {
            res.render('info', errorMessage('You are not allowed to use this site', '/', 'Access denied'));
          }
          else {
            let user = await sessionStorage.getUser(req.sessionID);
            if(user.length > 0) {
              if(user[0].username === req.body.name) {
                res.render('info', statusMessage('You are already logged in'));
              }
              else {
                sessionStorage.remove(req.sessionID);
                req.session.destroy();
                res.render('info', errorMessage('Error in login. Please try again.', '/login'));
              }
            }
            else {
              let addSessionOK = await sessionStorage.addSession(req.sessionID, req.body.name);
              if(addSessionOK) {
                res.render('info', statusMessage('You are logged in'));
              }
              else {
                res.render('info', errorMessage('Login failed', '/'));
              }
            }
          }
        }
      }
      catch (err) {
        res.render('info', errorMessage('Login failed', '/'));
      }
    });
  return router;
};

//helpers
function errorMessage(info = 'Error', url = '/', title  = 'Login', mode = 'error', delay = 2) {
  return {
    title,
    info,
    url,
    delay,
    mode
  };
}

function statusMessage(info = 'Status', url = '/', title = 'Login', mode = 'status', delay = 1) {
  return {
    title,
    info,
    url,
    delay,
    mode
  };
}
