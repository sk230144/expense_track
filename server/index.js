import connectMongoDb from './db/connect.js';
import expenseRoutes from './routes/expense.routes.js'
import express from 'express'

const app = express();
app.use(express.json());


app.use("/api", expenseRoutes)

app.listen(5000, () => {
  console.log("Running on port 5000");
  connectMongoDb();
});