const app = require("../src/app");
const { expect } = require("chai");
const request = require("supertest");
const { Genre } = require("../src/models");
const { beforeEach } = require("mocha");
const faker = require("faker");
const testHelpers = require("./testHelpers");

describe("/genres", () => {
  before(async () => Genre.sequelize.sync());

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /genres", () => {
      it("Should create a new genre in the database", async () => {
        const genreData = testHelpers.genreData();
        const response = await request(app).post("/genres").send(genreData);

        expect(response.status).to.equal(201);

        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(newGenreRecord.genre).to.equal(genreData.genre);
      });

      it("Should return 500 if genre is empty", async () => {
        const genreData = {
          genre: "",
        };

        const result = await request(app).post("/genres").send(genreData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "Validation error: Genre can not be empty"
        );
      });

      it("Should return 500 if author is null", async () => {
        const genreData = {};

        const result = await request(app).post("/genres").send(genreData);
        expect(result.status).to.equal(500);
        expect(result.body.error).to.equal(
          "notNull Violation: Genre can not be empty"
        );
      });
    });
    describe("with records in the database", () => {
      let genres;

      beforeEach(async () => {
        genres = await Promise.all([
          Genre.create(testHelpers.arrayOfGenres[0]),
          Genre.create(testHelpers.arrayOfGenres[1]),
        ]);
      });
      describe("POST /genres", () => {
        it("Should return 500 if genre is ready in the database", async () => {
          const genreData = genres[0].dataValues;
          const result = await request(app).post("/genres").send(genreData);
          console.log(result.body);
          expect(result.status).to.equal(500);
        });
      });
      describe("GET /genres", () => {
        it("gets all genre records", async () => {
          const response = await request(app).get("/genres");

          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(2);

          const returnedGenres = response.body;

          returnedGenres.forEach((genre) => {
            const fakedGenre = genres.find((a) => {
              return a.dataValues.id === genre.id;
            });

            expect(genre.title).to.equal(fakedGenre.title);
          });
        });
      });
      describe("GET /genres/:id", () => {
        it("Should get genre with a given id", async () => {
          const genre = genres[0].dataValues;
          const id = genres[0].dataValues.id;

          const result = await request(app).get(`/genres/${id}`);
          expect(result.status).to.equal(200);

          expect(result.body.genre).to.equal(genre.genre);
        });

        it("Should return a 404 if the genre is not found", async () => {
          const result = await request(app).get("/genres/999999999999999");
          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The genre could not be found.");
        });
      });

      describe("PATCH /genres/:id", () => {
        it("should update genre with the given id", async () => {
          const newGenreData = testHelpers.genreData();
          const id = genres[0].dataValues.id;
          const result = await request(app)
            .patch(`/genres/${id}`)
            .send(newGenreData);

          expect(result.status).to.equal(200);

          const updatedGenre = await Genre.findByPk(id);
          expect(updatedGenre.dataValues.genre).to.equal(newGenreData.genre);
        });

        it("Should return a 404 when trying to update a genre that does not exist", async () => {
          const newGenreData = testHelpers.genreData();
          const result = await request(app)
            .patch("/genres/99999999999999")
            .send(newGenreData);

          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The genre could not be found.");
        });
      });

      describe("DELETE /genres/:id", () => {
        it("Should delete a genre with the given id", async () => {
          const id = genres[0].dataValues.id;
          const result = await request(app).delete(`/genres/${id}`);
          expect(result.status).to.equal(204);
          const deletedGenre = await Genre.findByPk(id);

          expect(!!deletedGenre).to.be.false;
        });
        it("Should return a 404 when trying to delete a genre that does not exist", async () => {
          const result = await request(app).delete("/genres/99999999999999999");
          expect(result.status).to.equal(404);
          expect(result.body.error).to.equal("The genre could not be found.");
        });
      });
    });
  });
});
