function isAuthenticated(req, res, next) {
    if (req.session.login_id) {
      return next();
    } else {
      res.redirect('/login');
    }
  }
  
  module.exports = isAuthenticated;
  