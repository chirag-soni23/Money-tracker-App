import Expense from '../models/expenseModel.js';

// Add a transaction
export const addTransaction = async (req, res) => {
  try {
    const { category, amount, info, date } = req.body;
    

    const newTransaction = new Expense({
      category,
      amount,
      info,
      date,
    });


    await newTransaction.save();

    const allTransactions = await Expense.find();
    const incomeTotal = allTransactions.filter(t => t.category === "Income").reduce((acc, curr) => acc + curr.amount, 0);
    const expenseTotal = allTransactions.filter(t => t.category === "Expense").reduce((acc, curr) => acc + curr.amount, 0);

    const balance = incomeTotal - expenseTotal;

    res.status(200).json({
      message: "Transaction added successfully",
      balance,
      transaction: newTransaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
};


// get all transactions
export const getAllTransaction = async(req,res) =>{
    try {
        const transactions = await Expense.find().sort({date:-1});
        res.json(transactions);        
    } catch (error) {
        res.status(500).json({message:"Error fetching transaction",error:error.message});        
    }
}


// get transaction using find by id
export const getTransactionId = async (req,res)=>{
    try {
        const {id} = req.params;
        const transaction = await Expense.findById(id);
        if(!transaction){
            return res.status(404).json({message:"No Transaction Found!"});
        } 
        res.json(transaction);       
    } catch (error) {
        res.status(500).json({message:"Error fetching transaction",error:error.message}); 
    }
}

// update transaction by id
export const updateTransactionById = async (req,res) =>{
    try {
        const {id} = req.params;
        const {category,amount,info,date} = req.body;
        const transaction = await Expense.findById(id);
        if(!transaction){
            return res.status(404).json({message:"No Transaction Found!"});
        } 
        transaction.category = category,
        transaction.amount = amount,
        transaction.info = info,
        transaction.date = date

        await transaction.save();
        res.status(200).json({message:"Transaction Updated Successfully!",transaction})

    } catch (error) {
        res.status(500).json({message:"Error updating transaction",error:error.message});         
    }
}

// delete transaction by id
export const deleteTransactionById = async (req,res) =>{
    try {
        const {id} = req.params;
        const transaction = await Expense.findById(id);
        if(!transaction){
            return res.status(404).json({message:"No Transaction Found!"});
        } 
        await transaction.deleteOne();
        res.status(200).json({message:"Transaction Deleted Successfully!"});
    } catch (error) {
        res.status(500).json({message:"Error deleting transaction",error:error.message}); 
    }
}