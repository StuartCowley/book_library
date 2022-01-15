module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Name can not be empty",
        },
        notNull: {
          msg: "Name can not be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: "Email must be in correct format",
        },
        notEmpty: {
          args: [true],
          msg: "Email can not be empty",
        },
        notNull: {
          msg: "Email can not be empty",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password must be 8 characters or longer!",
        },
        notNull: {
          msg: "Password must be 8 characters or longer!",
        },
      },
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
