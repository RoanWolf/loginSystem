import sequelize from "../config/db.js";
import User from "./User.js";

const db = {
  sequelize,
  User
};

export default db;
