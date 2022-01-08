const { Book, Reader, Author, Genre } = require("../models");

const getModel = (model) => {
  switch (model) {
    case Book:
      return "book";
      break;
    case Reader:
      return "reader";
      break;
    case Author:
      return "author";
      break;
    case Genre:
      return "genre";
      break;
  }
};

const hidePassword = (data) => {
  const password = data.password;
  const split = password.split("");
  const starredArray = split.map((char) => {
    return "*";
  });
  const starred = starredArray.join("");

  data.password = starred;
  return data;
};

const removePassword = (item) => {
  delete item.password;
  return item;
};

const removePasswords = (items) => {
  const modifiedItems = items.map((item) => {
    return removePassword(item.dataValues);
  });
  return modifiedItems;
};

const getIncludedModel = (model) => {
  switch (model) {
    case Book:
      return [Genre];
      break;
    case Genre:
      return Book;
      break;
  }
};

const createItem = (model, input, res) => {
  model
    .create(input)
    .then((item) => {
      if (model === Reader) {
        const modifiedItem = hidePassword(item.dataValues);
        return res.status(201).json(modifiedItem);
      } else {
        return res.status(201).json(item);
      }
    })
    .catch((err) => {
      const message = err.message;
      res.status(500).json({ error: message });
    });
};

const getAll = (model, res) => {
  model
    .findAll({ include: getIncludedModel(model) })
    .then((items) => {
      if (model === Reader) {
        const modifiedItems = removePasswords(items);
        res.status(200).json(modifiedItems);
      } else {
        res.status(200).json(items);
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const getById = (model, res, id) => {
  model
    .findByPk(id, { include: getIncludedModel(model) })
    .then((item) => {
      if (item) {
        if (model === Reader) {
          const modifiedItem = removePassword(item.dataValues);
          res.status(200).json(modifiedItem);
        } else {
          res.status(200).json(item);
        }
      } else {
        const x = getModel(model);
        res.status(404).json({ error: `The ${x} could not be found.` });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateItem = (model, res, id, newData) => {
  model
    .update(newData, { where: { id: id } })
    .then(([item]) => {
      if (item) {
        res.status(200).json(item);
      } else {
        const x = getModel(model);
        res.status(404).json({ error: `The ${x} could not be found.` });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteItem = (model, res, id) => {
  model
    .destroy({ where: { id: id } })
    .then((deletedItem) => {
      if (deletedItem) {
        res.status(204).send("Deleted");
      } else {
        const x = getModel(model);
        res.status(404).json({ error: `The ${x} could not be found.` });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  createItem,
  getAll,
  getById,
  updateItem,
  deleteItem,
  hidePassword,
  removePassword,
  removePasswords,
};
