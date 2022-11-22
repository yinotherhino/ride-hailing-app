import { NextFunction } from "express";
import { Request, Response } from "express";

import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;
