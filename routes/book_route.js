import express from "express";
import { create_book, delete_book, get_available_books, get_book_by_id, get_books, update_book } from "../controllers/book_controller.js";
const router = express.Router();

router.get("/books", get_books);
router.get("/book/:id", get_book_by_id);
router.post("/book", create_book);
router.patch("/book/:id", update_book);
router.delete("/book/:id", delete_book);
router.get("/available-books", get_available_books); // Check the books

export default router;
