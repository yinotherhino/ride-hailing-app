import express from 'express';
import { DriverLogin, DriverRegister, verifyDriver,   } from "../controller/driverController";
const router = express.Router();

/* GET driver listing. */

router.post('/register',  DriverRegister)

router.post('/verfiy/:signature',  verifyDriver)

router.post('/login',  DriverLogin)



export default router;