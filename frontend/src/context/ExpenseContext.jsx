import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    
    // Fetch transactions
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/expense/getall');
            setTransactions(response.data);
            calculateBalance(response.data);
        } catch (error) {
            console.log(`Error fetching transaction: ${error.message}`);
            toast.error(error.response?.data?.message || 'Error fetching transactions');
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Add transaction
    const addTransaction = async (transaction) => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/expense/add-transaction", { category: transaction.category, amount: transaction.amount, info: transaction.info, date: transaction.date });
            toast.success(data.message);
            fetchTransactions();
        } catch (error) {
            console.log(`Error adding Transaction: ${error.message}`);
            toast.error(error.response?.data?.message || 'Error adding transaction');
        } finally {
            setLoading(false);
        }
    };

    // Delete transaction
    const deleteTransaction = async (id) => {
        try {
            const { data } = await axios.delete(`/api/expense/delete/${id}`);
            toast.success(data.message);
            fetchTransactions();
        } catch (error) {
            console.log(`Error deleting transaction: ${error.message}`);
            toast.error(error.response?.data?.message || 'Error deleting transaction');
        }
    };

    // Edit transaction
    const editTransaction = async (id, updateTransaction) => {
        setLoading(true);
        try {
            const { data } = await axios.put(`/api/expense/update/${id}`, updateTransaction);
            toast.success(data.message);
            fetchTransactions();
            setLoading(false);
        } catch (error) {
            console.log(`Error editing transaction: ${error.message}`);
            toast.error(error.response?.data?.message || 'Error editing transaction');
            setLoading(false);
        }
    };

    // Calculate balance
    const calculateBalance = (transactions) => {
        const incomeTotal = transactions.filter(t => t.category === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
        const expenseTotal = transactions.filter(t => t.category === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
        setBalance(incomeTotal - expenseTotal);
    };

    return (
        <ExpenseContext.Provider value={{
            addTransaction,
            deleteTransaction,
            editTransaction,
            balance,
            loading,
            transactions
        }}>
            <Toaster />  
            {children}
        </ExpenseContext.Provider>
    );
};

export const ExpenseData = () => useContext(ExpenseContext);
