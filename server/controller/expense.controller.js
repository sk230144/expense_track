// expenseController.js

import Transaction from "../models/expense.model.js"
import { v4 as uuidv4 } from 'uuid';


export const addExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;

        // Create a new expense instance
        const newExpense = new Transaction({
            id: uuidv4(),
            amount,
            category,
            description,
            date,
        });

        // Save the expense to the database
        const savedExpense = await newExpense.save();

        res.status(201).json({
            success: true,
            message: 'Expense added successfully',
            expense: savedExpense,
        });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Transaction.find();
        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses,
        });
    } catch (error) {
        console.error('Error retrieving expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


export const deleteExpenses = async (req, res) => {
    try {
        const { ids } = req.body;
        const result = await Transaction.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'No expenses found with the specified IDs',
            });
        }

        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} expense(s)`,
        });
    } catch (error) {
        console.error('Error deleting expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, description, date } = req.body;

        // Find the expense by ID
        const expense = await Transaction.findOne({ id });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found',
            });
        }

        // Update the expense fields
        expense.amount = amount;
        expense.category = category;
        expense.description = description;
        expense.date = date;

        // Save the updated expense
        const updatedExpense = await expense.save();

        res.status(200).json({
            success: true,
            message: 'Expense updated successfully',
            expense: updatedExpense,
        });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};