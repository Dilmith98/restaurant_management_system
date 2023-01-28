import ServiceProviders from "../models/ServiceProviders.js";
import User from "../models/User.js";
import { createToken } from "../util/AuthUtil.js";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import Item from "../models/Items.js";
import Foods from "../models/Foods.js";
import multer from "multer";
import { transporter } from "../util/NotificationUtil.js";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Method : POST
// End Point : "api/v1/serviceProvider/RegisterOutletStaff";
// Description : Register Outlet Staff

const maxAge = 3 * 24 * 60 * 60;
export const RegisterOutletStaff = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role == "Manager"){
            const {Password,Email,Role} = req.body;
            const existingStaffMember = await ServiceProviders.findOne({Email:Email});
            const existingUser = await User.findOne({Email:Email});
            if(existingStaffMember !== null || existingUser !== null){
                return res.json({"message":"A User is already exist"});
            }
            else{
                const salt = await GenerateSalt();
                const encryptedPassword = await GeneratePassword(Password,salt);
                if(Role === "Staff-Member" || Role === "Deliverer" ){
                    const createServiceProvider = await ServiceProviders.create({
                        Password:encryptedPassword,
                        Email:Email,
                        Role:Role
                    });
                    const createUser = await User.create({
                        Password:encryptedPassword,
                        Email:Email,
                        Role:Role
                    })
                    //send Email
                    const mailOption = {
                        from : 'resto6430@gmail.com',
                        to : Email,
                        subject : 'Registration Confrimation',
                        text : `Hi Welcome to Resto. You successfully registered to the system.`
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
                    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
                    res.json(token);
                }else{
                    res.status(401).json('Role must be Staff-member or Deliverer');
                }
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}


// Method : POST
// End Point : "api/v1/serviceProvider/AddItems";
// Description : Add Items

export const addItems = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {ItemName,Quantity,UnitPrice,WholeSalePrice,Category} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingItem = await Item.findOne({SerialNo:SerialNumber});
            if(existingItem !== null){
                res.json({message:"This food is already added"});
            }
            else{
                const createItem = await Item.create({
                    SerialNo:SerialNumber,
                    ItemName:ItemName,
                    Category:Category,
                    WholeSalePrice:WholeSalePrice,
                    Quantity:Quantity,
                    UnitPrice:UnitPrice,
                })
                res.json(createItem);
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}
// Method : GET
// End Point : "api/v1/serviceProvider/getFoods";
// Description : Get Foods

export const getItems = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const items = await Item.find();
            if(items !== null){
                res.json(items);
            }
            else{
                res.status(404).json({message:"There are no any recordes plase add items"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// Method : GET
// End Point : "api/v1/serviceProvider/getFoodsByCategory";
// Description : Get Foods By Category

export const getItemByCategory = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const Category = req.body.Category;
            const findItems = await Item.find({Category:Category}).populate('Category');
            if(findItems !== null){
                let Items = [];
                findItems.map(Item=>{
                    if(Item.Category === Category){
                        Items.push(Item);
                    }
                })
                res.json(Items);
            }
            else{
                res.json({message:"Category dosen't exist"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// Method : DELETE
// End Point : "api/v1/serviceProvider/deleteFoodBySerialNo/:SerialNo";
// Description : Get Foods By Category

export const deleteItemBySerialNo = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {SerialNo} = req.params;
            const Item = await Item.findOne({SerialNo:SerialNo});
            console.log(Item);
            if(Item !== null){
                await Item.findByIdAndRemove(Item._id);
                res.json({message:`${SerialNo} item Removed`});
            }
            else{
                res.status(404).json({message:"Food doesn't found, Please enter valid serail no"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Staff-Member++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
const imageStorage = multer.diskStorage({
    destination:"images/Foods",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})
const image = multer({storage:imageStorage}).single('image');

export const addFoods = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {FoodName,Price,Category} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingFood = await Foods.findOne({SerialNo:SerialNumber});
            var FoodImage;
            image(req,res,(err)=>{
                if(err){
                    console.log(err)
                }
                else{
                    FoodImage = req.file.filename;
                }
            })
            if(existingFood !== null){
                res.status(501).json({message:`This item is already added`});
            }else{
                const AddFoods = await Foods.create({
                    FoodName:FoodName,
                    Quantity:Quantity,
                    Price:Price,
                    SerialNo:SerialNumber,
                    Category:Category,
                    FoodImage:FoodImage
                })
                res.json(AddFoods);
            }
        }
        else{
            res.status(501).json("This user dosen't has authorization to do this operation");
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

