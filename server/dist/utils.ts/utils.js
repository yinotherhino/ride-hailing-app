"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.emailHtml = exports.Mailsend = exports.onRequestOTP = exports.GenerateOTP = exports.validatePassword = exports.LoginSchema = exports.verifySignature = exports.GenerateSignature = exports.GeneratePassword = exports.GenerateSalt = exports.UserSchema = exports.registerForDriverSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.registerForDriverSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref('password'))
        .required()
        .label('confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    address: joi_1.default.string().required(),
    fullName: joi_1.default.string().required(),
    passport: joi_1.default.string().required(),
    typeOfCar: joi_1.default.string().required(),
    driverL: joi_1.default.string().required(),
    plateNumber: joi_1.default.string().required(),
    vechileNumber: joi_1.default.string().required(),
});
exports.UserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref('password'))
        .required()
        .label('confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    address: joi_1.default.string(),
    fullName: joi_1.default.string(),
});
const GenerateSalt = async () => {
    return await bcrypt_1.default.genSalt();
};
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = async (password, salt) => {
    return await bcrypt_1.default.hash(password, salt);
};
exports.GeneratePassword = GeneratePassword;
const GenerateSignature = async (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.APP_SECRET, { expiresIn: '1d' });
};
exports.GenerateSignature = GenerateSignature;
const verifySignature = async (signature) => {
    return jsonwebtoken_1.default.verify(signature, config_1.APP_SECRET);
};
exports.verifySignature = verifySignature;
exports.LoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
const validatePassword = async (enteredPassword, savedPassword, salt) => {
    return (await (0, exports.GeneratePassword)(enteredPassword, salt)) === savedPassword;
};
exports.validatePassword = validatePassword;
const GenerateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOTP = GenerateOTP;
const onRequestOTP = async (otp, toPhoneNumber) => {
    const client = require('twilio')(config_1.AccountSID, config_1.AuthToken);
    const response = client.messages.create({
        body: `Your OTP is ${otp}`,
        to: toPhoneNumber,
        from: config_1.fromAdminPhone,
    });
    return response;
};
exports.onRequestOTP = onRequestOTP;
const transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.Gmail,
        pass: config_1.GmailPass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
// export const sendEmail = () => {
// }
const Mailsend = async (from, to, subject, html) => {
    try {
        const response = await transport.sendMail({
            from: config_1.fromAdminMail,
            to,
            subject: config_1.userSubject,
            html,
        });
        return response;
    }
    catch (err) {
        console.log(err);
    }
};
exports.Mailsend = Mailsend;
const emailHtml = (otp) => {
    let response = `
    <div style="max-width:700px; margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%">
    <h2 style="text-align:center; text-transform:uppercase; color:teal">Welcome to </h2>
    <p> Hi there, your otp is ${otp}</p>
    </div>
    `;
    return response;
};
exports.emailHtml = emailHtml;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
};
