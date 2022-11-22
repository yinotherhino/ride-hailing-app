import {Sequelize} from "sequelize"
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize('app', '', '',{
    storage:"./carhailing.sqlite",
    dialect: "sqlite",
    logging: false,
})
