import Sequelize from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();
export default sequelize;
