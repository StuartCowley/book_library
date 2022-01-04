const faker = require("faker");

const bookData = () => ({
  title: faker.random.words(),
  author: faker.name.findName(),
  genre: faker.hacker.adjective(),
  ISBN: faker.datatype.string(),
});

const arrayOfBooks = [];

for (let i = 0; i < 3; i++) {
  arrayOfBooks.push(bookData());
}

module.exports = { bookData, arrayOfBooks };
