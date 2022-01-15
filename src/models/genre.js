module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Genre can not be empty",
        },
        notNull: {
          msg: "Genre can not be empty",
        },
      },
    },
  };

  const GenreModel = connection.define("Genre", schema);
  return GenreModel;
};
