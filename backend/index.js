import 'dotenv/config'

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js'

import bookRouter from './routes/bookRoute.js'
import authRouter from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
connectDB();

// Middlewares
// Middle ware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);

app.use('/api/books', bookRouter);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
});

