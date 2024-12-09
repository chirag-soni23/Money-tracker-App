import React, { useState } from 'react'
import { ExpenseData } from '../context/ExpenseContext'
import toast from 'react-hot-toast';

const MoneyTracker = () => {
  const {addTransaction, deleteTransaction, editTransaction,balance,loading,transactions} = ExpenseData();
  const [category,setCategory] = useState("Expense");
  const [info,setInfo] = useState("");
  const [amount,setAmount] = useState("");
  const [date,setDate] = useState("");
  const [editing,setEditing] = useState(null);


  function handleSubmit(e){
    e.preventDefault();

    if(!category || !info || !amount || !date){
      toast.error("Please Fill all Fields");
      return;
    }
    if(isNaN(amount) || parseInt(amount) <= 0){
      toast.error("Amount must be valid positve number")
    }

    const newTransaction = {
      category,
      amount:parseInt(amount),
      info,
      date
    }
    if(editing){
      editTransaction(editing,newTransaction);
      toast.success("Transaction updated successfully!");
      setEditing(null);
    }else{
      addTransaction(newTransaction);
      toast.success("Transaction Added successfully!");
    }

    setCategory("Expense");
    setAmount('');
    setInfo('');
    setDate('');
  }

  function handleEdit(transaction){
    setCategory(transaction.category);
    setInfo(transaction.info);
    setAmount(transaction.amount.toString());
    setDate(transaction.date);
    setEditing(transaction._id);
  }
  function cancelEdit(){
    setCategory("Expense");
    setInfo("");
    setAmount("");
    setDate("");
    setEditing(null);
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
        <h1 className="text-3xl font-semibold text-center mb-4">Money Tracker</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium">Info</label>
          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter information"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          {editing ? 'Update Transaction' : 'Add Transaction'}
        </button>

        {editing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="w-full bg-gray-400 text-white py-2 mt-2 rounded-md"
          >
            Cancel Edit
          </button>
        )}
      </form>

    </div>
  )
}

export default MoneyTracker