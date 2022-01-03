const { Reader } = require("../models");

const CreateReader = (req, res) => {
  Reader.create(req.body)
    .then((reader) => {
      return res.status(201).json(reader);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

module.exports = { CreateReader };
