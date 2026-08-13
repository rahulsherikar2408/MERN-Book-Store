import express from 'express';
import { addBook, deleteBook, getBook, getBookDetail, updateBook } from '../controller/book.js';

const router = express.Router();

router.get('/list', getBook);

router.post('/create', addBook);

router.get('/details/:id', getBookDetail);

router.put('/edit/:id', updateBook);

router.delete('/delete/:id', deleteBook);

export default router;