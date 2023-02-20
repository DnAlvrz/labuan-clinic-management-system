const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')
const  bcrypt = require('bcrypt');

function init (passport) {
  const authUser = async(userName, password, done) => {
    try {
      const user = await User.findOne({_id:id});
      if(user == null) {
        return done(null, false, {message: `Account does not exist`});
      }
      try {
        if(await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, {message: "Incorrect password"} )
        }
      } catch (error) {
        return done(error);
      }
    } catch (error) {
      console.log(error);
      done(error)
    }
  }
  
  passport.use(new LocalStrategy({usernameField: 'userName'}, authUser));

  passport.serializeUser((user, done)=> {
    done(null, user.id)
  });

  passport.deserializeUser( async (id, done) => {
    try {
      const user = await User.findOne({_id:id})
      done(null, user)
    } catch (error) {
      done(error)
    }
  });

}

module.exports = init;