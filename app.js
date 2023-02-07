const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash')
const connectDatabase = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authenticationRouter = require('./routes/auth');
const studentRouter = require('./routes/students');
const patientRouter = require('./routes/patients');
const visitorRouter = require('./routes/visitor');
const studentFormRouter = require('./routes/studentForm');
const studentFindingsRouter = require('./routes/studentFindings');

const Student  = require('./models/Student');
const initPassport = require('./passport-config');
const app = express();

connectDatabase();
initPassport(passport);
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

app.use(session({
  secret: 'super secret',
  cookie: {maxAge: 9000000},
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res,next) => {
  res.locals.currentUser = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/users', usersRouter);
app.use('/students', studentRouter);
app.use('/patients', patientRouter)
app.use('/visitors', visitorRouter)
app.use('/student/form', studentFormRouter)
app.use('/student/findings', studentFindingsRouter)

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
