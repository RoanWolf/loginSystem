import { Sequelize } from "sequelize";

// 用环境变量控制，避免硬编码
const sequelize = new Sequelize(
  process.env.DB_NAME || "loginStorage",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "mutable",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
    port: process.env.DB_PORT || 3308,
  
  }
);
(async () => {
  try {
    await sequelize.authenticate();  
   // await sequelize.sync({ alter: true }); 
    console.log("✅ Database connection has been established successfully.");

  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

export default sequelize;
