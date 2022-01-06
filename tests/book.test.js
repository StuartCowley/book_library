const app = require("../src/app");
const { exepect, expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const { beforeEach } = require("mocha");
const faker = require("faker");
const testHelpers = require("./testHelpers");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("Should create a new book in the database", async () => {
        const bookData = testHelpers.bookData();
        const response = await request(app).post("/books").send(bookData);

        expect(response.status).to.equal(201);

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(newBookRecord.title).to.equal(bookData.title);
        expect(newBookRecord.author).to.equal(bookData.author);
      });
    });
    describe("with records in the database", () => {
      let books;

      beforeEach(async () => {
        books = await Promise.all([
          Book.create(testHelpers.arrayOfBooks[0]),
          Book.create(testHelpers.arrayOfBooks[1]),
          Book.create(testHelpers.arrayOfBooks[2]),
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
          const newBookData = testHelpers.bookData();
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
          const newBookData = testHelpers.bookData();
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
