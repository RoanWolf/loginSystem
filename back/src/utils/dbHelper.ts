import { Sequelize, Dialect } from "sequelize";

import logger from "./logger.ts";
import { dbConfig } from "../configs/config.ts";

// console.log(dbConfig);

const sequelize = new Sequelize(
  dbConfig.database || "",
  dbConfig.user || "root",
  dbConfig.password || "",
  {
    host: dbConfig.host || "localhost",
    dialect: (dbConfig.dialect as Dialect) || "mysql",
    logging: false,
    port: Number(dbConfig.port) || 3306,
  }
);
(async () => {
  try {
    await sequelize.authenticate();

    //await sequelize.sync({ alter: true });

    // await sequelize.sync({force: true}); // ❌别乱用
    logger.info("Database connection has been established successfully.");
  } catch (error: unknown) {
    logger.error("Database connection error");
  }
})();

export default sequelize;
