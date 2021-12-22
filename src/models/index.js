const Sequelize = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    PORT: DB_PORT,
    logging: false,
  });

  connection.sync({ alter: true });

  return {};
};

module.exports = setUpDatabase();
