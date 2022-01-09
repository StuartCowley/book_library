const faker = require("faker");

const bookData = () => ({
  title: faker.random.words(),
  AuthorId: 1,
  GenreId: 1,
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

module.exports = {
  bookData,
  arrayOfBooks,
  authorData,
  arrayOfAuthors,
  genreData,
  arrayOfGenres,
};
