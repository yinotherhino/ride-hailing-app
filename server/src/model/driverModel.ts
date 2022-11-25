import { DataTypes, Model } from "sequelize";

import { db } from "../config";

export interface DriverAttributes {
    id: string;
    email: string;
    password: string;
    salt: string;
    fullName: string;
    address: string;
    phone: string;
    passport: string;
    otp: number;
    otp_expiry: Date;
    typeOfCar: string;
    driverL: string;
    plateNumber: string;
    vechileNumber: string;
    verified: boolean;
    role: string;

}

export class DriverInstance extends Model<DriverAttributes> {}

DriverInstance.init({
  id: {
    type:DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Email is invalid'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password is required'
            },
            notEmpty: {
                msg: 'provide a password'
            }
        }
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Phone Number is required'
            },
            notEmpty: {
                msg: 'provide a phone number'
            }
    }
  },
    otp: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'OTP is required'
            },
            notEmpty: {
                msg: 'provide a OTP'
            }
        }
    },
    otp_expiry: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'OTP expired'
            }
        }
    },
    passport: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    typeOfCar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    driverL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    plateNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vechileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Verification is required'
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   

},
{
    sequelize: db,
    tableName: 'drivers',
});