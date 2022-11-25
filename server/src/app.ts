import express, {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {db} from './config/index';

db.sync().then(() => {
    console.log('Database connected');
}).catch(err=> {
    console.log(err);
})

import indexRouter  from'./routes/index';
import usersRouter  from './routes/users';
import driverRouter  from './routes/driver';


const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/driver', driverRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



export default app;
