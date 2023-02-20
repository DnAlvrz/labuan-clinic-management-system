// Imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const connectDatabase = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

//Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const studentRouter = require('./routes/students');
const patientRouter = require('./routes/patients');
const visitorRouter = require('./routes/visitor');
const medicalRecRouter = require('./routes/medicalRecord');
const apiRouter = require('./routes/api');
const printRouter = require('./routes/print');
const LocalStrategy = require('passport-local').Strategy;
// Middlwares
const auth = require('./middlewares/auth');

// Models
const User =require('./models/User')
const app = express();

connectDatabase();

app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(methodOverride('_method'));

app.use(session({
  secret: 'super secret',
  cookie: {maxAge: 9000000},
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res,next) => {
  res.locals.currentUser = req.user;
  next();
})

app.get('/login', auth.checkisNotAuth,(req, res, next)=> {
  res.render('pages/auth/login', {title:'Login'})
});

app.post('/auth', auth.checkisNotAuth, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true //'Invalid username or password.'
}));

app.get('/logout', auth.checkAuth,(req, res)=> {
    req.logOut( function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      }
    );
});

app.use('/',indexRouter);
app.use('/users', auth.checkAuth,usersRouter);
app.use('/students', auth.checkAuth,studentRouter);
app.use('/patients', auth.checkAuth,patientRouter)
app.use('/visitors',auth.checkAuth, visitorRouter);
app.use('/medical',auth.checkAuth, medicalRecRouter);
app.use('/print', auth.checkAuth,printRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page~
  res.render('error');
});

module.exports = app;
