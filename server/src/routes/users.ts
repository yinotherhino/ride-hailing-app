import { NextFunction } from "express";
import { Request, Response } from "express";
import express from 'express';
import { UserLogin, UserRegister, verifyUser } from "../controller/userController";
const router = express.Router();

/* GET users listing. */
router.post('/register', UserRegister)

router.post('/verfiy/:signature', verifyUser)

router.post('/login', UserLogin)




export default router;
