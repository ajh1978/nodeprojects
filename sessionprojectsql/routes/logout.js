'use strict';

const router = require('express').Router();

module.exports = sessionStorage =>
  router.get('/logout', (req, res) => {
    let id = req.sessionID;
    sessionStorage.getUser(id)
      .then(result => {
        if(result.length > 0) {
          sessionStorage.remove(id);
          res.render('info', {
            title: 'Logout',
            info: `You are logged out. Thanks ${result[0].username}`,
            url: '/',
            delay: 2,
            mode: 'status'
          });
          req.session.destroy();
        }
        else {
          res.render('info', {
            title: 'Logout',
            info: 'You are not logged in',
            url: '/',
            delay: 1,
            mode: 'error'
          });
        }
      })
      .catch(() => res.render('info', {
        title: 'Logout',
        info: 'You are not logged in',
        url: '/',
        delay: 1,
        mode: 'error'
      }));
  });
