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

const authorData = () => ({
  author: faker.name.findName(),
});

const arrayOfAuthors = [];

for (let i = 0; i < 3; i++) {
  arrayOfAuthors.push(authorData());
}

const genreData = () => ({
  genre: faker.hacker.adjective(),
});

const arrayOfGenres = [];

for (let i = 0; i < 3; i++) {
  arrayOfGenres.push(genreData());
}

console.log(arrayOfGenres);
module.exports = {
  bookData,
  arrayOfBooks,
  authorData,
  arrayOfAuthors,
  genreData,
  arrayOfGenres,
};
