import express from 'express'
import {
  DriverLogin,
  DriverRegister,
  verifyDriver,
} from '../controllers/driverController'
const router = express.Router()

/* GET driver listing. */

router.post('/register', DriverRegister)

router.post('/verify/:signature', verifyDriver)

router.post('/login', DriverLogin)

export default router
