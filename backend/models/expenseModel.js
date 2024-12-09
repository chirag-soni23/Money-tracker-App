import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    category:{
        type:String,
        enum:["Expense","Income"],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    info:{
        type:String,
        default:"",
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    }
},{timestamps:true});

export default mongoose.model('Expense', expenseSchema);