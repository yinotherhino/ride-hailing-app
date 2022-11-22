import { NextFunction } from "express";
import { Request, Response } from "express";
import { bookRide } from "../controllers/LocationControllers";
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});

router.post('/book-ride', bookRide)

export default router;
