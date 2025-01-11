import mongoose from "mongoose";

// Define the schema
const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create the model based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;