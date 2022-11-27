import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { fromAdminMail, userSubject } from '../config';
import { DriverAttributes, DriverInstance } from '../model/driverModel';
import { emailHtml, GenerateOTP, GeneratePassword, GenerateSalt, GenerateSignature, LoginSchema, Mailsend, onRequestOTP, options, registerForDriverSchema, validatePassword, verifySignature } from '../utils.ts/utils';

export const DriverRegister = async (req: Request, res: Response) => {
    try {
      const { email, password, fullName, address, phone, passport, typeOfCar, driverL, plateNumber,vechileNumber} = req.body
      const uuiduser = uuidv4();
      const validateResult = registerForDriverSchema.validate(req.body, options);
      if (validateResult.error) {
        res.status(400).json({
          Error: validateResult.error.details[0].message
        })
      }
      // generate salt
      const salt = await GenerateSalt();
      const userPasword = await GeneratePassword(password, salt);
  
      //generate otp
      const { otp, expiry } = GenerateOTP();
  
      // check if user exist
      const User = await DriverInstance.findOne({ where: { email: email } });
  
      //Create User
      if (!User) {
        let user = await DriverInstance.create({
            id: uuiduser,
            email,
            password: userPasword,
            salt,
            fullName,
            address,
            phone,
            passport,
            otp,
            otp_expiry: expiry,
            typeOfCar,
            driverL,
            plateNumber,
            vechileNumber,
            verified: false,
            role: 'driver'
        })
        // send otp
        await onRequestOTP(otp, phone);
  
        // send email
        const html = emailHtml(otp);
  
        await Mailsend(fromAdminMail, email, userSubject, html);
        // check if user is created
        const User = await DriverInstance.findOne({ where: { email: email } }) as unknown as DriverAttributes;
  
        //Generate Signature
        let signature = await GenerateSignature({
          id: User.id,
          email: User.email,
          verified: User.verified
        })
  
  
        return res.status(201).json({
          message: 'User created successfully check your email or phone for OTP verification',
          signature,
          verified: User.verified,
  
        })
      }
      return res.status(400).json({
        message: 'User already exist',
      })
  
    } catch (err) {
      res.status(500).json({
        Error: "Internal Server Error",
        route: "/users/signup"
      })
    }
  }
  
  // Verfiy user
  export const verifyDriver = async (req: Request, res: Response) => {
    try {
      const token = req.params.signature;
      const decode = await verifySignature(token);
      // check if user exist
      const User = await DriverInstance.findOne({ where: { email: decode.email } }) as unknown as DriverAttributes;
      if (User) {
        const { otp } = req.body;
        if (User.otp === +otp && User.otp_expiry >= new Date()) {
  
          const updateUser = await DriverInstance.update({ verified: true }, { where: { email: decode.email } }) as unknown as DriverAttributes;
  
          //GENERATE NEW SIGNATURE
          let signature = await GenerateSignature({
            id: updateUser.id,
            email: updateUser.email,
            verified: updateUser.verified
          })
          if (updateUser) {
            const User = await DriverInstance.findOne({ where: { email: decode.email } }) as unknown as DriverAttributes;
            return res.status(200).json({
              message: 'User verified successfully',
              signature,
              verified: User.verified,
            })
          }
        }
      }
      return res.status(400).json({
        Error: 'Invalid credentials or OTP expired',
  
      })
    }
  
    catch (err) {
      res.status(500).json({
        Error: "Internal Server Error",
        route: "/users/verify"
      })
    }
  }
  
  // Login user
  
  export const  DriverLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const validateResult = LoginSchema.validate(req.body, options);
      if (validateResult.error) {
        res.status(400).json({
          Error: validateResult.error.details[0].message
        })
      }
      const User = await DriverInstance.findOne({ where: { email: email } }) as unknown as DriverAttributes;
  
      if (User.verified === true) {
        const validation = await validatePassword(password, User.password, User.salt);
        if (validation) {
          //generate signature
          let signature = await GenerateSignature({
            id: User.id,
            email: User.email,
            verified: User.verified
          });
          return res.status(200).json({
            message: 'User logged in successfully',
            signature,
            email: User.email,
            verified: User.verified,
            role:User.role
          })
        }
      }
      return res.status(400).json({
        Error: 'Invalid credentials',
  
      })
    } catch (err) {
      res.status(500).json({
        Error: "Internal Server Error",
        route: "/users/login"
      })
    }
  }
  
  // resend otp
  
  export const resendOTP = async (req: Request, res: Response) => {
    try {
      const token = req.params.signature;
      const decode = await verifySignature(token);
      const User = await DriverInstance.findOne({ where: { email: decode.email } }) as unknown as DriverAttributes;
      if (User) {
  
        const { otp, expiry } = GenerateOTP();
  
        const updateUser = await DriverInstance.update({ otp, otp_expiry: expiry }, { where: { email: decode.email } }) as unknown as DriverAttributes;
  
        if (updateUser) {
  
          const User = await DriverInstance.findOne({ where: { email: decode.email } }) as unknown as DriverAttributes;
  
          await onRequestOTP(otp, User.phone);
  
          const html = emailHtml(otp);
  
          await Mailsend(fromAdminMail, User.email, userSubject, html);
  
          return res.status(200).json({
            message: 'OTP resent successfully',
          })
        }
      }
      return res.status(400).json({
        Error: "Error resending OTP",
      })
  
    } catch (err) {
      res.status(500).json({
        Error: "Internal Server Error",
        route: "/users/resend-otp/:signature"
      })
    }
  }

