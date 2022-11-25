import { NextFunction } from "express";
import { Request, Response } from "express";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.status(200).json({ message: 'Welcome to the API' });
});

export default  router;
