"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverInstance = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class DriverInstance extends sequelize_1.Model {
}
exports.DriverInstance = DriverInstance;
DriverInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.NUMBER,
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
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'OTP expired'
            }
        }
    },
    passport: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    typeOfCar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    driverL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    plateNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    vechileNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Verification is required'
            }
        }
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: config_1.db,
    tableName: 'drivers',
});
