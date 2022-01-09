const app = require("../src/app");
const { expect } = require("chai");
const request = require("supertest");
const { Book, Genre, Author } = require("../src/models");
const { beforeEach } = require("mocha");
const faker = require("faker");

describe("/books", () => {
  let testGenre;
  let testAuthor;
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
    await Genre.destroy({ where: {} });
    await Author.destroy({ where: {} });
    testGenre = await Genre.create({ genre: faker.hacker.adjective() });
    testAuthor = await Author.create({ author: faker.name.findName() });
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("Should create a new book in the database", async () => {
        const bookData = {
          title: faker.random.words(),
          AuthorId: testAuthor.id,
          GenreId: testGenre.id,
          ISBN: faker.datatype.string(),
        };

        const response = await request(app).post("/books").send(bookData);

        expect(response.status).to.equal(201);

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(newBookRecord.title).to.equal(bookData.title);
      });

      it("Should return 500 if title is empty", async () => {
        const bookData = {
          title: "",
          AuthorId: `${testAuthor.id}`,
          GenreId: `${testGenre.id}`,
          ISBN: "789768769",
        };

        const result = await request(app).post("/books").send(bookData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "Validation error: Title can not be empty"
        );
      });

      it("Should return 500 if title is null", async () => {
        const bookData = {
          AuthorId: testAuthor.id,
          GenreId: testGenre.id,
          ISBN: faker.datatype.string(),
        };

        const result = await request(app).post("/books").send(bookData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "notNull Violation: Title can not be empty"
        );
      });
      it("Should return 500 if author is empty", async () => {
        const bookData = {
          title: faker.random.words(),
          AuthorId: "",
          GenreId: testGenre.id,
          ISBN: faker.datatype.string(),
        };

        const result = await request(app).post("/books").send(bookData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "Validation error: Author can not be empty"
        );
      });

      it("Should return 500 if author is null", async () => {
        const bookData = {
          title: faker.random.words(),
          GenreId: testGenre.id,
          ISBN: faker.datatype.string(),
        };

        const result = await request(app).post("/books").send(bookData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "notNull Violation: Author can not be empty"
        );
      });
    });
    describe("with records in the database", () => {
      let books;

      beforeEach(async () => {
        books = await Promise.all([
          Book.create({
            title: faker.random.words(),
            AuthorId: testAuthor.id,
            GenreId: testGenre.id,
            ISBN: faker.datatype.string(),
          }),
          Book.create({
            title: faker.random.words(),
            AuthorId: testAuthor.id,
            GenreId: testGenre.id,
            ISBN: faker.datatype.string(),
          }),
          Book.create({
            title: faker.random.words(),
            AuthorId: testAuthor.id,
            GenreId: testGenre.id,
            ISBN: faker.datatype.string(),
          }),
        ]);
      });

      describe("GET /books", () => {
        it("gets all book records", async () => {
          const response = await request(app).get("/books");

          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(3);

          const returnedBooks = response.body;

          returnedBooks.forEach((book) => {
            const fakedBook = books.find((b) => {
              return b.dataValues.id === book.id;
            });

            expect(book.title).to.equal(fakedBook.title);
          });
        });
      });
      describe("GET /books/:id", () => {
        it("Should get book with a given id", async () => {
          const book = books[0].dataValues;
          const id = books[0].dataValues.id;

          const result = await request(app).get(`/books/${id}`);
          expect(result.status).to.equal(200);

          expect(result.body.title).to.equal(book.title);
        });

        it("Should return a 404 if the book is not found", async () => {
          const result = await request(app).get("/books/999999999999999");
          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The book could not be found.");
        });
      });

      describe("PATCH /books/:id", () => {
        it("should update book with the given id", async () => {
          const newBookData = {
            title: faker.random.words(),
          };
          const book = books[0].dataValues;
          const id = books[0].dataValues.id;
          const result = await request(app)
            .patch(`/books/${id}`)
            .send(newBookData);

          expect(result.status).to.equal(200);
          const updatedBook = await Book.findByPk(id);
          expect(updatedBook.dataValues.title).to.equal(newBookData.title);
        });

        it("Should return a 404 when trying to update a book that does not exist", async () => {
          const newBookData = {
            title: faker.random.words(),
          };
          const result = await request(app)
            .patch("/books/99999999999999")
            .send(newBookData);

          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The book could not be found.");
        });
      });

      describe("DELETE /books/:id", () => {
        it("Should delete a book with the given id", async () => {
          const id = books[0].dataValues.id;
          const result = await request(app).delete(`/books/${id}`);
          expect(result.status).to.equal(204);
          const deletedBook = await Book.findByPk(id);

          expect(!!deletedBook).to.be.false;
        });
        it("Should return a 404 when trying to delete a book that does not exist", async () => {
          const result = await request(app).delete("/books/99999999999999999");
          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The book could not be found.");
        });
      });
    });
  });
});
