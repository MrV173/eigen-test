import { Sequelize } from "sequelize";
import Book from "../models/book.js";

export const get_books = async (req, res) => {
  try {
    const response = await Book.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const get_available_books = async (req, res) => {
  try {
    const response = await Book.findAll({
      where: {
        stock: {
          [Sequelize.Op.not]: 0,
        },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const get_book_by_id = async (req, res) => {
  try {
    const response = await Book.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const create_book = async (req, res) => {
  try {
    await Book.create(req.body);
    res.status(200).json({ msg: "Book Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const update_book = async (req, res) => {
  try {
    await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Book Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_book = async (req, res) => {
  try {
    await Book.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Book Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
