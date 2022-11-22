import {DataTypes, Model} from 'sequelize';
import {db} from '../config/index';

export interface TripAttributes{
    tripID:string;
    sourceLocation: string;
    destinationLocation: string;
    price: string;
    status: string;
    payment:string;
    userID:string;
    driverID:string;
    tripDuration: number;
}

export class TripInstance extends Model<TripAttributes>{}

TripInstance.init({
    tripID:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    sourceLocation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    destinationLocation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    userID:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    driverID:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tripDuration: {
        type: DataTypes.NUMBER,
        allowNull: true,
    },
}, {
    sequelize: db,
    tableName: 'trip'
})
