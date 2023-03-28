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

describe("GET /api/reviews/:review_id", () => {
  it("if review with id = one requested should respond with a review object with id one, with corresponding id and properties", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { reviewObject } = body;
        expect(reviewObject.review_id).toBe(1);
        expect(reviewObject).toHaveProperty("title", expect.any(String));
        expect(reviewObject).toHaveProperty("designer", expect.any(String));
        expect(reviewObject).toHaveProperty(
          "review_img_url",
          expect.any(String)
        );
        expect(reviewObject).toHaveProperty("votes", expect.any(Number));
        expect(reviewObject).toHaveProperty("category", expect.any(String));
        expect(reviewObject).toHaveProperty("review_body", expect.any(String));
        expect(reviewObject).toHaveProperty("owner", expect.any(String));
        expect(reviewObject).toHaveProperty("created_at", expect.any(String));
      });
  });
  it("if review with id = two requested should respond with a review object with id two, with corresponding id and properties", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { reviewObject } = body;
        expect(reviewObject.review_id).toBe(2);
        expect(reviewObject).toHaveProperty("title", expect.any(String));
        expect(reviewObject).toHaveProperty("designer", expect.any(String));
        expect(reviewObject).toHaveProperty(
          "review_img_url",
          expect.any(String)
        );
        expect(reviewObject).toHaveProperty("votes", expect.any(Number));
        expect(reviewObject).toHaveProperty("category", expect.any(String));
        expect(reviewObject).toHaveProperty("review_body", expect.any(String));
        expect(reviewObject).toHaveProperty("owner", expect.any(String));
        expect(reviewObject).toHaveProperty("created_at", expect.any(String));
      });
  });
  it("if the request is for an id which doesn't exist, responds with status 404", () => {
    return request(app)
      .get("/api/reviews/100")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: No user found for user_id: 100");
      });
  });
  it("if the request is ill-formed, responds with status 400", () => {
    return request(app)
      .get("/api/reviews/cats")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: ill-formed request");
      });
  });
});
