import { Sequelize } from "sequelize";

import logger from "./logger.js";
import { dbConfig } from "../config/config.js";


// console.log(dbConfig);

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
    port: dbConfig.port,
  }
);
(async () => {
  try {
    await sequelize.authenticate();

    //await sequelize.sync({ alter: true });

    // await sequelize.sync({force: true}); // ❌别乱用
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Database connection error");
  }
})();

export default sequelize;
