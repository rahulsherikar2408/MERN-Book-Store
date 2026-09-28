import 'dotenv/config'

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js'

import bookRouter from './routes/bookRoute.js'
import authRouter from "./routes/authRoute.js";
import healthRouter from './routes/healthRoute.js'

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
connectDB();

// Middlewares
// Middle ware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors({
    origin: process.env.API_URL,
    credentials: true
}));

app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);

app.use('/api/books', bookRouter);

app.use('/api/health', healthRouter);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
});

