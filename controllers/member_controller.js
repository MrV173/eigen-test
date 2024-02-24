import Member from "../models/member.js";
import Book from "../models/book.js";

export const get_members = async (req, res) => {
  try {
    const response = await Member.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const get_member_by_id = async (req, res) => {
  try {
    const response = await Member.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const create_member = async (req, res) => {
  try {
    await Member.create(req.body);
    res.status(200).json({ msg: "Member Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const update_member = async (req, res) => {
  try {
    await Member.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Member Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_member = async (req, res) => {
  try {
    await Member.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Member Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const borrow_book = async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.member_id,
      },
    });
    const book = await Book.findOne({
      where: {
        id: req.params.book_id,
      },
    });

    if (!member || !book) {
      return res.status(404).json({ error: "Book or Member not found" });
    }

    if (member.borrowed_book >= 2) {
      return res.status(400).json({ msg: "You have borrowed 2 books. Please return 1 before borrowing another book" });
    }

    if (member.status == "Penalized") {
      return res.status(400).json({ msg: "Your status is penalized" });
    }

    if (book.stock < 1) {
      return res.status(400).json({ msg: "This book has been borrowed by another member." });
    }

    if (member.borrowed_book == 0) {
      const update_member = {
        borrowed_book: 1,
      };
      const update_book = {
        stock: 0,
        borrowed_at: new Date(),
      };

      await Member.update(update_member, {
        where: {
          id: req.params.member_id,
        },
      });

      await Book.update(update_book, {
        where: {
          id: req.params.book_id,
        },
      });
    } else {
      const update_member = {
        borrowed_book: 2,
      };
      const update_book = {
        stock: 0,
        borrowed_at: new Date(),
      };

      await Member.update(update_member, {
        where: {
          id: req.params.member_id,
        },
      });

      await Book.update(update_book, {
        where: {
          id: req.params.book_id,
        },
      });
    }
    res.status(200).json({ msg: `The book was successfully borrowed. Please return it according to the specified time` });
  } catch (error) {
    console.log(error.message);
  }
};

export const return_book = async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.member_id,
      },
    });
    const book = await Book.findOne({
      where: {
        id: req.params.book_id,
      },
    });

    if (!member || !book) {
      return res.status(404).json({ error: "Book or Member not found" });
    }

    const return_at = new Date();
    const difference_time_in_milli_seconds = Math.abs(return_at - book.borrowed_at);
    const difference_time_days = difference_time_in_milli_seconds / (1000 * 60 * 60 * 24);

    if (difference_time_days > 7) {
      const update_member = {
        status: "Penalized",
        borrowed_book: member.borrowed_book - 1,
      };

      const update_book = {
        stock: 1,
        return_at: new Date(),
      };

      await Member.update(update_member, {
        where: {
          id: req.params.member_id,
        },
      });

      await Book.update(update_book, {
        where: {
          id: req.params.book_id,
        },
      });
      res.status(200).json({ msg: "You returned the book after the specified time. You will be given a penalty and cannot borrow books for 3 days" });
    } else {
      const update_member = {
        borrowed_book: member.borrowed_book - 1,
      };

      const update_book = {
        stock: 1,
        return_at: new Date(),
      };

      await Member.update(update_member, {
        where: {
          id: req.params.member_id,
        },
      });

      await Book.update(update_book, {
        where: {
          id: req.params.book_id,
        },
      });
      res.status(200).json({ msg: "Thank you for returning the book before the deadline. Have a nive day :)" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
