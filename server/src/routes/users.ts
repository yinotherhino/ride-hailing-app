import { Request, Response, NextFunction } from "express";

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});


export default router;
