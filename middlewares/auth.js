module.exports.checkAuth =  (req,res,next) => {
    if(req.isAuthenticated() ) {
      return next();
    }
    res.redirect('/login')
  }
  
  module.exports.checkisNotAuth =  (req,res,next) => {
    if(req.isAuthenticated() ) {
      return res.redirect('/')
    }
    next();
  }