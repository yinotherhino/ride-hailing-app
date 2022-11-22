import { Request, Response, NextFunction } from "express";

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {db} from './config'

import indexRouter from './routes/index';
import usersRouter from './routes/users';

//Sequelize Connection
db.sync().then(() => {
  console.log("Database Connected Successfully")
}).catch((err) => {
  console.log(err)
})

console.log('test');


var app = express();

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

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});



module.exports = app;
