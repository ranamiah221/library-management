import { Model, model, Schema } from "mongoose";
import { IBook, IBookMethods } from "../interface/book.interface";


const bookSchema = new Schema<IBook, Model<IBook>, IBookMethods>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        genre: { type: String, required: true, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]},
        isbn: { type: String, required: true, unique: true },
        description: { type: String, trim: true },
        copies: { type: Number, required: true, min:[0, 'Copies must be a positive number'] },
        available: { type: Boolean, required:true, default: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

bookSchema.methods.deductCopies = async function (quantity: number): Promise<void> {
    if(this.copies < quantity){
        throw new Error('Not enough copies available')
    }
    this.copies -=quantity;
    if(this.copies === 0){
        this.available = false;
    }
    await this.save();

}

export const Book = model('Book', bookSchema)