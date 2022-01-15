module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
  };

  const AuthorModel = connection.define("Author", schema);
  return AuthorModel;
};
