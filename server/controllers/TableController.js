import Table from "../models/Tables.js";


// Method : POST
// End Point : "api/v1/Table";
// Description : Add Table
export const AddTable = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Admin"){
            const {TableNo,NoOfPersons,price} = req.body;
            console.log(TableNo);
            const existingTable = await Table.findOne({TableNo:TableNo}).populate('TableNo');
            if(existingTable){
                res.status(400).json({
                    status: 'Error',
                    message:"This Table is Already Exist",
                })
            }
            else{
                const addTable = await Table.create({
                    TableNo:TableNo,
                    NoOfPersons:NoOfPersons,
                    price:price
                })
                res.status(201).json({
                    status:'Success',
                    message:'A New Table is Added',
                    data:{
                        addTable
                    }
                })

            }
        }
        else{
            res.status(401).json({
                status: 'Error',
                message: 'User Have No Authorization to do this action',
            })
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        })
    }
}


// Method : Get
// End Point : "api/v1/Tables";
// Description : Get Tables

export const ViewTables = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Staff-Member" || user.Role === "Admin"){
            const tables = await Table.find();
            if(tables !== null){
                res.json(tables);
            }
            else{
                res.status(404).json({message:"There are no any recordes please add tables"});
            }
        }
        else{
            res.status(401).json('Only Manager, Staff-Member & Admin have access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}
