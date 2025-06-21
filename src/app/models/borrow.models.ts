import mongoose, { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required: true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    dueDate:{
        type: Date,
        required:true
    }
},
{
    
        versionKey: false,
        timestamps: true
    
})

export const Borrow = model('Borrow', borrowSchema)