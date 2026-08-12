import 'dotenv/config'

import express, { urlencoded } from 'express';

import connectDB from './config/db.js'

import bookRouter from './routes/bookRoute.js'

const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
connectDB();

// Middlewares
app.use(express.json());

//Routes
app.use('/api/books', bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
});

