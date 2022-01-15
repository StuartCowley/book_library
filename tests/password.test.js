const { expect } = require("chai");
const {
  hidePassword,
  removePassword,
  removePasswords,
} = require("../src/controllers/helper");

describe("password methods", () => {
  describe("hiding password", () => {
    it("should star out password in reader object", () => {
      const reader = {
        name: "examle person",
        email: "example@example.com",
        password: "password123",
      };
      const changedData = hidePassword(reader);
      expect(changedData.password).to.equal("***********");
    });
  });

  describe("removing password", () => {
    it("should remove password from the object", () => {
      const reader = {
        name: "examle person",
        email: "example@example.com",
        password: "password123",
      };

      const changedData = removePassword(reader);
      expect(!!changedData.password).to.equal(false);
    });
  });
  describe("removing passwords from an array of objects", () => {
    it("Should remove all passwords", () => {
      const items = [
        {
          dataValues: {
            name: "one",
            email: "one@email.com",
            password: "123456789",
          },
        },
        {
          dataValues: {
            name: "two",
            email: "two@email.com",
            password: "123456789",
          },
        },
        {
          dataValues: {
            name: "three",
            email: "three@email.com",
            password: "123456789",
          },
        },
      ];

      const modifiedItems = removePasswords(items);

      modifiedItems.forEach((item) => {
        expect(!!item.password).to.equal(false);
      });
    });
  });
});
