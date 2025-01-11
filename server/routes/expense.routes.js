import express from "express"
import { addExpense, deleteExpenses, getAllExpenses, updateExpense } from "../controller/expense.controller.js";


const router = express.Router();


router.post("/addexpense", addExpense);
router.get("/expenses", getAllExpenses);
router.delete('/', deleteExpenses);
router.put('/:id', updateExpense);



export default router;