import mongoose from 'mongoose';

const offerSchema = mongoose.Schema({
    Foods:{
        type:mongoose.Schema.ObjectId,
        ref:'Foods',
    },
    SpecialPrice:{
        type:Number,
        required:[true,"Add Price of the offer"]
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

const Offers = mongoose.model('Offers',offerSchema);