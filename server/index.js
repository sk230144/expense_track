import connectMongoDb from './db/connect.js';
import expenseRoutes from './routes/expense.routes.js'
import express from 'express'
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());


app.use("/api", expenseRoutes)

app.listen(5000, () => {
  console.log("Running on port 5000");
  connectMongoDb();
});