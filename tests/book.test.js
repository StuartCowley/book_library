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
    describe("POST /book", () => {
      it("Should create a new book in the database", async () => {
        const bookData = testHelpers.bookData();
        const response = await request(app).post("/book").send(bookData);

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
    });
  });
});
