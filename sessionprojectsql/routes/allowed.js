module.exports = (users, role) =>
  function(req, res, next) {
    if(req.isAllowed) {
      next();
    }
    else {
      users.isAllowed(req.sessionID, role)
        .then(result => {
          req.isAllowed = req.session && result;
          next();
        })
        .catch(() => {
          req.isAllowed = false;
          next();
        });
    }
  };
