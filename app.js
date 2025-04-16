let createError = require('http-errors'); express = require('express');
let path = require('path'); cookieParser = require('cookie-parser');
let logger = require('morgan');
const fs = require('fs')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config()



let app = express();

const corsOptions = {
  origin: 'https://furniture-frontend-8k9ejmltv-igrik723s-projects.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engien', 'jade')

app.use('/uploads', express.static('uploads'))

app.use('/api', require('./routes'))

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
