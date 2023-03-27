const db = require("../db/connection.js");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("General test for response", () => {
  it("should get 200 if respond with the message are all ok", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.message).toBe("all okay");
      });
  });
});

describe("GET /api/categories", () => {
  it("should respond an array of category objects, each of which should have the following properties: slug, description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        for (let categorie of categories) {
          expect(categorie).toHaveProperty("slug", expect.any(String));
          expect(categorie).toHaveProperty("description", expect.any(String));
        }
      });
  });
  it("status:404, responds with an error massage when passed a non-existant url", () => {
    return request(app)
      .get("/api/pupils")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Sorry can't find that!");
      });
  });
});
