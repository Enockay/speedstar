var createError = require('http-errors');
var cors = require('cors')
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookingRouter = require('./routes/bookings')
var partnersRouter = require('./routes/partners')
var reviewRouter = require('./routes/reviews')
var paymentRouter = require('./routes/payments')
var cartRouter = require('./routes/carts')
var images = require("./routes/pictures");


var app = express();
var mongoose = require('mongoose');
const hotelRouter = require('./routes/hotels');
var MONGODB_URL = process.env.MONGODB_URL

const allowedOrigins = [
  'http://localhost:5173',  // Your frontend
  'http://localhost:5174',  // Another frontend port
  'https://speedstarweb.fly.dev',     // Production frontend
  'https://speedstar.vercel.app',
  'https://www.speedstardeliveries.com',
  'https://speedstaradmin.fly.dev'
];
// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps) or listed origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'], // Allows these headers
  //credentials: true // Allows credentials (cookies, authorization headers)
}));


mongoose.connect(MONGODB_URL)
        .then(() => {
          console.log('Mongodb successfully initiated')
        })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bookings', bookingRouter)
app.use('/partners', partnersRouter)
app.use('/reviews', reviewRouter)
app.use('/hotels', hotelRouter)
app.use('/payments', paymentRouter)
app.use('/carts', cartRouter);
app.use("/images",images)

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
