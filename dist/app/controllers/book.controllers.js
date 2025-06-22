"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield book_models_1.Book.create(body);
    res.status(201).json({
        "success": true,
        "message": "Book created successfully",
        "data": book
    });
}));
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const genre = (_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase();
    const sortOrder = req.query.sort === 'asc' ? 1 : -1;
    const limit = parseInt(req.query.limit) || 10;
    const query = {};
    if (genre) {
        query.genre = genre;
    }
    const book = yield book_models_1.Book.find(query)
        .sort({ createdAt: sortOrder })
        .limit(limit);
    res.status(201).json({
        "success": true,
        "message": "Books retrieved successfully",
        "data": book
    });
}));
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_models_1.Book.findById(bookId);
    res.status(201).json({
        "success": true,
        "message": "Book retrieved successfully",
        "data": book
    });
}));
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedDoc = req.body;
    const book = yield book_models_1.Book.findByIdAndUpdate(bookId, updatedDoc, { new: true });
    res.status(201).json({
        "success": true,
        "message": "Book updated successfully",
        "data": book
    });
}));
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    yield book_models_1.Book.findByIdAndUpdate(bookId);
    res.status(201).json({
        "success": true,
        "message": "Book deleted successfully",
        "data": null
    });
}));
