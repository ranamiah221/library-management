import express, { Request, RequestHandler, Response } from 'express'
import { Borrow } from '../models/borrow.models';
import { Book } from '../models/book.models';

export const borrowRoutes = express.Router();

borrowRoutes.post('', async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found' });
        }

        await book.deductCopies(quantity);
        const borrow = await Borrow.create({
            book: book?._id,
            quantity,
            dueDate
        })
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });


    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

})

borrowRoutes.get('', async (req: Request, res: Response) => {
    try {
        const data = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind: '$bookInfo'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: data
        })

    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving summary',
            error: error.message
        });
    }

})
