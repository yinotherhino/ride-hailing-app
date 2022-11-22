import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

import { bookRide } from '../controllers/LocationControllers'

/* GET users listing. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource')
})

router.post('/book-ride', bookRide)
export default router
