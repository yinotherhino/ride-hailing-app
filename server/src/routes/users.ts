import express, { Request, Response, NextFunction } from 'express'
import {
  UserLogin,
  UserRegister,
  verifyUser,
} from '../controllers/userController'

const router = express.Router()

import { bookRide } from '../controllers/LocationControllers'

/* GET users listing. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource')
})

router.post('/book-ride', bookRide)

/* GET users listing. */
router.post('/register', UserRegister)

router.post('/verify/:signature', verifyUser)

router.post('/login', UserLogin)

export default router
