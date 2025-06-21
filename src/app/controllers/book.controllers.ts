import express, { Request, Response } from 'express'
import { Book } from '../models/book.models';

export const bookRoutes = express.Router();

bookRoutes.post('', async (req: Request, res: Response) => {
    const body = req.body;
    const book = await Book.create(body)

    res.status(201).json({
        "success": true,
        "message": "Book created successfully",
        "data": book
    })

})
bookRoutes.get('', async (req: Request, res: Response) => {
    const genre = req.query.filter?.toString().toUpperCase();
    const sortOrder = req.query.sort === 'asc' ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query: any = {};
    if (genre) {
        query.genre = genre;
    }
    const book = await Book.find(query)
        .sort({ createdAt: sortOrder })
        .limit(limit);

    res.status(201).json({
        "success": true,
        "message": "Books retrieved successfully",
        "data": book
    })

})

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)

    res.status(201).json({
        "success": true,
        "message": "Book retrieved successfully",
        "data": book
    })

})

bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const updatedDoc = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedDoc, { new: true })

    res.status(201).json({
        "success": true,
        "message": "Book updated successfully",
        "data": book
    })

})

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndUpdate(bookId)

    res.status(201).json({
        "success": true,
        "message": "Book deleted successfully",
        "data": null
    })

})






