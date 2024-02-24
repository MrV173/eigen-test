import express from "express";
import { borrow_book, create_member, delete_member, get_member_by_id, get_members, return_book, update_member } from "../controllers/member_controller.js";
const router = express.Router();

router.get("/members", get_members); // Member Check
router.get("/member/:id", get_member_by_id);
router.post("/member", create_member);
router.patch("/member/:id", update_member);
router.delete("/member/:id", delete_member);
router.patch("/borrow-book/:member_id/:book_id", borrow_book); // Member borrow books with conditions
router.patch("/return-book/:member_id/:book_id", return_book); // Member return book with conditions

export default router;
