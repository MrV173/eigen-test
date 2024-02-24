import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const Member = db.define(
  "members",
  {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Not Penalized",
    },
    borrowed_book: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Member;

(async () => {
  await db.sync();
})();
