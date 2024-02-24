import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const Book = db.define(
  "books",
  {
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    borrowed_at: DataTypes.DATE,
    return_at: DataTypes.DATE,
  },
  {
    freezeTableName: true,
  }
);

export default Book;

(async () => {
  await db.sync();
})();
