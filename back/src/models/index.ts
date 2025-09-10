import sequelize from "../utils/dbHelper.ts";
import User from "./User.js";

const db = {
  sequelize,
  User
};

export default db;
