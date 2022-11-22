import express, {Request, Response, NextFunction} from 'express'
import { geocoder } from '../utils/utils';

export const bookRide = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {lat, lon} = req.body
     
        const code = await geocoder.geocode(' Victoria Island 106104, Lagos' );
        const location = await geocoder.reverse({lat: 6.5401,
    lon: 3.27541})
        console.log(code)
        console.log(location)
    }catch(err){

    }
}