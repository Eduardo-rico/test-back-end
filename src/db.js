import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME||"db_api", process.env.DB_USER||"postgres", process.env.DB_PASS||"pass", {
  host: process.env.DB_HOST||"localhost",
  dialect: "postgres",
  port:process.env.DB_PORT || 5432,
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
});

export default sequelize;
