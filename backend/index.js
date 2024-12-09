import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import expenseRoute from './routes/expenseRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/money-tracker",{
    dbName:"MoneyTracker"
}).then(()=>{
    console.log("Mongodb Connected Succesfully!");
}).catch((error)=>{
    console.log(error.message);
})

// routes
app.use('/api/expense',expenseRoute);


// start the server
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server connected http://localhost:${PORT}`)
}) 