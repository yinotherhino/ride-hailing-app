"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userModel_1 = require("../model/userModel");
const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                Error: "kindly Login "
            });
        }
        // const token = authorization.split(" ")[1];
        const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, config_1.APP_SECRET);
        if (!verified) {
            return res.status(401).json({
                Error: "unauthorized access"
            });
        }
        const { id } = verified;
        const User = await userModel_1.UserInstance.findOne({ where: { id: id } });
        if (!User) {
            return res.status(401).json({
                Error: "invalid access"
            });
        }
        req.User = verified;
        next();
    }
    catch (err) {
        return res.status(401).json({
            Error: "unauthorized"
        });
    }
};
exports.auth = auth;
