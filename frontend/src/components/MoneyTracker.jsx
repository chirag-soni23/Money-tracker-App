import React, { useState } from 'react'
import { ExpenseData } from '../context/ExpenseContext'
import toast from 'react-hot-toast';

const MoneyTracker = () => {
  const { addTransaction, deleteTransaction, editTransaction, balance, loading, transactions } = ExpenseData();
  const [category, setCategory] = useState("Expense");
  const [info, setInfo] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [editing, setEditing] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();

    if (!category || !info || !amount || !date) {
      toast.error("Please Fill all Fields");
      return;
    }
    if (isNaN(amount) || parseInt(amount) <= 0) {
      toast.error("Amount must be valid positve number")
    }

    const newTransaction = {
      category,
      amount: parseInt(amount),
      info,
      date
    }
    if (editing) {
      editTransaction(editing, newTransaction);
      setEditing(null);
    } else {
      addTransaction(newTransaction);
    }

    setCategory("Expense");
    setAmount('');
    setInfo('');
    setDate('');
  }

  function handleEdit(transaction) {
    setCategory(transaction.category);
    setInfo(transaction.info);
    setAmount(transaction.amount.toString());
    setDate(transaction.date);
    setEditing(transaction._id);
  }
  function cancelEdit() {
    setCategory("Expense");
    setInfo("");
    setAmount("");
    setDate("");
    setEditing(null);
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

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

        <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          {editing ? `${loading ? "Updating..." : "Update"}` : `${loading ? "Adding..." : "Add"}`}
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

      {/* Transaction Table */}
      <div className="mt-6">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Category</th>
              <th className="p-2">Info</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="p-2">{transaction.category}</td>
                <td className="p-2">{transaction.info}</td>
                <td className="p-2">{transaction.amount}</td>
                <td className="p-2">{formatDate(transaction.date)}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(transaction._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-lg font-semibold">
        <p>Balance: {balance}</p>
      </div>

    </div>
  )
}

export default MoneyTracker;