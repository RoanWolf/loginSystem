import sequelize from "../utils/dbHelper.js";
import User from "./User.js";

const db = {
  sequelize,
  User
};

export default db;
