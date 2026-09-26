import express from 'express';
import { addBook, deleteBook, getBook, getBookDetail, updateBook } from '../controller/book.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/list', authMiddleware, getBook);

router.post('/create', authMiddleware, addBook);

router.get('/details/:id', authMiddleware, getBookDetail);

router.put('/edit/:id', authMiddleware, updateBook);

router.delete('/delete/:id', authMiddleware, deleteBook);

export default router;