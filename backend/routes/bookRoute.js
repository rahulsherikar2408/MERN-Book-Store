import express from 'express';
import { addBook, getBook } from '../controller/book.js';

const router = express.Router();

router.get('/list', getBook);

router.post('/add', addBook);

export default router;