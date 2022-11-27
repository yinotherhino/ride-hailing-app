import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

/* GET home page. */

router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('api is running')
})

export default router
