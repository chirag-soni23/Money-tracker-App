import express from 'express';
import { addTransaction, deleteTransactionById, getAllTransaction, getTransactionId, updateTransactionById } from '../controllers/expenseController.js';
const router = express.Router();

router.post("/add-transaction",addTransaction);
router.get("/getall",getAllTransaction);
router.get("/get/:id",getTransactionId);
router.put("/update/:id",updateTransactionById);
router.delete("/delete/:id",deleteTransactionById);

export default router;