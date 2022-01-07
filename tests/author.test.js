const app = require("../src/app");
const { expect } = require("chai");
const request = require("supertest");
const { Author } = require("../src/models");
const { beforeEach } = require("mocha");
const faker = require("faker");
const testHelpers = require("./testHelpers");

describe("/authors", () => {
  before(async () => Author.sequelize.sync());

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /authors", () => {
      it("Should create a new author in the database", async () => {
        const authorData = testHelpers.authorData();
        const response = await request(app).post("/authors").send(authorData);

        expect(response.status).to.equal(201);

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(newAuthorRecord.author).to.equal(authorData.author);
      });

      it("Should return 500 if author is empty", async () => {
        const authorData = {
          author: "",
        };

        const result = await request(app).post("/authors").send(authorData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "Validation error: Author can not be empty"
        );
      });

      it("Should return 500 if author is null", async () => {
        const authorData = {};

        const result = await request(app).post("/authors").send(authorData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "notNull Violation: Author can not be empty"
        );
      });
    });
    describe("with records in the database", () => {
      let authors;

      beforeEach(async () => {
        authors = await Promise.all([
          Author.create(testHelpers.arrayOfAuthors[0]),
          Author.create(testHelpers.arrayOfAuthors[1]),
          Author.create(testHelpers.arrayOfAuthors[2]),
        ]);
      });

      describe("GET /authors", () => {
        it("gets all author records", async () => {
          const response = await request(app).get("/authors");

          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(3);

          const returnedAuthors = response.body;

          returnedAuthors.forEach((author) => {
            const fakedAuthor = authors.find((a) => {
              return a.dataValues.id === author.id;
            });

            expect(author.title).to.equal(fakedAuthor.title);
          });
        });
      });
      describe("GET /authors/:id", () => {
        it("Should get author with a given id", async () => {
          const author = authors[0].dataValues;
          const id = authors[0].dataValues.id;

          const result = await request(app).get(`/authors/${id}`);
          expect(result.status).to.equal(200);

          expect(result.body.author).to.equal(author.author);
        });

        it("Should return a 404 if the author is not found", async () => {
          const result = await request(app).get("/authors/999999999999999");
          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The author could not be found.");
        });
      });

      describe("PATCH /authors/:id", () => {
        it("should update author with the given id", async () => {
          const newAuthorData = testHelpers.authorData();
          const author = authors[0].dataValues;
          const id = authors[0].dataValues.id;
          const result = await request(app)
            .patch(`/authors/${id}`)
            .send(newAuthorData);

          expect(result.status).to.equal(200);
          const updatedAuthor = await Author.findByPk(id);
          expect(updatedAuthor.dataValues.author).to.equal(
            newAuthorData.author
          );
        });

        it("Should return a 404 when trying to update an author that does not exist", async () => {
          const newAuthorData = testHelpers.authorData();
          const result = await request(app)
            .patch("/authors/99999999999999")
            .send(newAuthorData);

          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The author could not be found.");
        });
      });

      describe("DELETE /authors/:id", () => {
        it("Should delete an author with the given id", async () => {
          const id = authors[0].dataValues.id;
          const result = await request(app).delete(`/authors/${id}`);
          expect(result.status).to.equal(204);
          const deletedAuthor = await Author.findByPk(id);

          expect(!!deletedAuthor).to.be.false;
        });
        it("Should return a 404 when trying to delete an author that does not exist", async () => {
          const result = await request(app).delete(
            "/authors/99999999999999999"
          );
          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The author could not be found.");
        });
      });
    });
  });
});
