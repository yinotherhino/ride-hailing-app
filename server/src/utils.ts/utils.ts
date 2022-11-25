import Joi from 'joi'
import bcrypt  from 'bcrypt' 
import jwt, {JwtPayload} from 'jsonwebtoken';
import { AccountSID, APP_SECRET, AuthToken, fromAdminMail, fromAdminPhone, Gmail, GmailPass, userSubject } from '../config';
import nodemailer from 'nodemailer';
import { UserPayload } from '../interface';

export const registerForDriverSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('confirm password')
    .messages({'any.only': '{{#label}} does not match'}),
    address: Joi.string().required(),
    fullName: Joi.string().required(),
    passport: Joi.string().required(),
    typeOfCar: Joi.string().required(),
    driverL: Joi.string().required(),
    plateNumber: Joi.string().required(),
    vechileNumber: Joi.string().required(),
})

export const UserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('confirm password')
    .messages({'any.only': '{{#label}} does not match'}),
    address: Joi.string(),
    fullName: Joi.string(),
})

export const GenerateSalt = async() => {
    return await bcrypt.genSalt();
  }

export const GeneratePassword = async (password:string, salt:string) => {
    return await bcrypt.hash(password,salt);
  }


export const GenerateSignature = async(payload:UserPayload) => {
  return jwt.sign(payload,APP_SECRET, {expiresIn: '1d'});
}

export const verifySignature = async(signature:string) => {
  return jwt.verify(signature, APP_SECRET) as JwtPayload;
}

export const LoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

export const validatePassword = async(enteredPassword:string, savedPassword:string, salt:string) => {
  return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() +  (30 * 60 * 1000));
    return { otp, expiry };
}

export const onRequestOTP = async (otp:number, toPhoneNumber:string) => {
    const client = require('twilio')(AccountSID, AuthToken);

    const response =client.messages
    .create({
        body: `Your OTP is ${otp}`,
        to: toPhoneNumber,
        from: fromAdminPhone
    })
    return response;
}

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Gmail,
        pass: GmailPass,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// export const sendEmail = () => {
    
// }
export const Mailsend = async (
    from: string,
    to: string,
    subject: string,
    html: string
) => {
   try {
       const response = await transport.sendMail({
            from: fromAdminMail, to, subject: userSubject, html
        })
        return response
   } catch(err) {
       console.log(err)
   }
};

export const emailHtml = (otp:number):string => {
    let response = `
    <div style="max-width:700px; margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%">
    <h2 style="text-align:center; text-transform:uppercase; color:teal">Welcome to </h2>
    <p> Hi there, your otp is ${otp}</p>
    </div>
    `
    return response
}


export const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };
