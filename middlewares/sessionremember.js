function sessionremember(req, res, next) {
    if (!req.session.login_id && req.cookies && req.cookies.rememberMe) {
      req.session.login_id = req.cookies.rememberMe;
    }
    next();
  }
  
  module.exports = sessionremember;
  