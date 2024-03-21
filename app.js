//Modules
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//Variables
const app = express();

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello from the middleware');

  next();
});

//Routes

//Tours Routes

app.use('/api/v1/tours', tourRouter);

//Users Routes

app.use('/api/v1/users', userRouter);

module.exports = app;
