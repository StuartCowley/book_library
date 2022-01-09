const Sequelize = require("sequelize");
const ReaderModel = require("./reader");
const BookModel = require("./book");
const AuthorModel = require("./author");
const GenreModel = require("./genre");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);

  Reader.hasMany(Book);
  Genre.hasMany(Book);
  Book.belongsTo(Genre);
  Author.hasMany(Book, {
    foreignKey: {
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Author can not be empty",
        },
        notNull: {
          msg: "Author can not be empty",
        },
      },
    },
  });

  Book.belongsTo(Author);

  connection.sync({ alter: true });

  return {
    Reader,
    Book,
    Author,
    Genre,
  };
};

module.exports = setupDatabase();
