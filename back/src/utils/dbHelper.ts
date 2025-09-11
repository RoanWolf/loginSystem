// utils/dbHelper.ts
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import logger from "./logger.ts";
import { dbConfig } from "../configs/config.ts";

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: Number(dbConfig.port),
});

export const db = drizzle(pool);

(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping(); 
    conn.release();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Database connection error");
  }
})();
