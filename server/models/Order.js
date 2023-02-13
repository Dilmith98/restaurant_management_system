import mongoose  from "mongoose";

const OrderSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    Foods:{
        type:mongoose.Schema.ObjectId,
        ref:'Foods'
    },
    Date:{
        type:Date,
        required:true
    },
    TotalPrice:{
        type:Number,
        required:true
    }
},
{
    toJSON: { 
        virtuals: true,
        // transform(doc,ret){
        //     delete ret.Password;
        //     delete ret.ConfirmPassword
        // }    
    },
    toObject: { virtuals: true },
    timestamps: true
});

const Order = mongoose.model('Order',OrderSchema);

export default Order;