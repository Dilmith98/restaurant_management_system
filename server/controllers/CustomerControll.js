import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import { createToken, handleErrors } from "../util/AuthUtil.js";
import { sendRegistrationSms, transporter } from "../util/NotificationUtil.js";
import { UploadProfileImage } from "./AuthController.js";

const maxAge = 3 * 24 * 60 * 60;

// Method : POST
// End Point : "api/v1/customer/AddCustomer";
// Description : Register Customer
export const RegisterCustomer = async (req,res)=>{
    const {Name,Password,ConfirmPassword,ContactNumber,Email} = req.body;
    const existingCustomer = await Customer.findOne({Email:Email});
    const existingUser = await User.findOne({Email:Email});
    try {
        if(existingCustomer !== null || existingUser !== null){
            return res.json({"message":"A Customer is already exist"});
        }
        else{
            const salt = await GenerateSalt();
            const encryptedPassword = await GeneratePassword(Password,salt);
            const confirmEncryptedPassword = await GeneratePassword(ConfirmPassword,salt);
            const Role="Customer";
            const createCustomer = await Customer.create({
                Name:Name,
                Password:encryptedPassword,
                ConfirmPassword:confirmEncryptedPassword,
                ContactNumber:ContactNumber,
                Email:Email,
                Role:Role
            });
            const createUser = await User.create({
                Name:Name,
                Password:encryptedPassword,
                ConfirmPassword:confirmEncryptedPassword,
                ContactNumber:ContactNumber,
                Email:Email,
                Role:Role
            })
            //send sms
            const ConfirmationMessage = 1234
            const from = "Vonage APIs";
            const to = "+94"+ContactNumber.slice(1);
            console.log(to);
            // await sendRegistrationSms(to,from,ConfirmationMessage);

            //send Email
            const mailOption = {
                from : 'resto6430@gmail.com',
                to : Email,
                subject : 'Registration Confrimation',
                text : `Hi ${Name} Welcome to Resto. You successfully registered to the system.`
            }

            transporter.sendMail(mailOption,(err,info)=>{
                if(err){
                    console.log(err.message);
                }
                else{
                    console.log(info.response);
                }
            })

            const token = createToken(createUser._id,createUser.Email);
            res.json(token);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Method : PATCH
// End Point : "api/v1/customer/UpdateProfile/:Email";
// Description : Update Profile
export const UpdateProfile = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === 'Customer'){
            const {Email} = req.params;
            const logeduser = await User.findOne({Email:Email}).populate('Email');
            if(logeduser !== null){
                const {Name,ContactNumber,Address,Email1} = req.body;
                const userDetails = {Name:Name,Email:Email1,ContactNumber:ContactNumber,Address:Address}
                await User.findByIdAndUpdate(logeduser._id,userDetails,{new:true});
                const updateCustomer = await Customer.findByIdAndUpdate(logeduser._id,userDetails,{new:true});
                createToken(updateCustomer._id);
                res.status(201).json({message:'Update User Successfully'});
            }
            else{
                res.json("error");
            }
        }
        else{
            res.status(400).json({message:'User has not previlages'});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const OrderItem = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === 'Customer'){
            const{Email} = req.params;
            
        }
    } catch (error) {
        
    }
}