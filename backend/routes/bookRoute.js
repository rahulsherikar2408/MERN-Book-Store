import express from 'express';
import { addBook, getBook, getBookDetail, updateBook } from '../controller/book.js';

const router = express.Router();

router.get('/list', getBook);

router.post('/add', addBook);

router.get('/detail/:id', getBookDetail);

router.put('update/:id', updateBook);

export default router;