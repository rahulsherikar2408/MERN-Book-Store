import 'dotenv/config'

import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js'

import bookRouter from './routes/bookRoute.js'

const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
connectDB();

// Middlewares
// Middle ware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors())
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

//Routes
app.use('/api/books', bookRouter);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
});

