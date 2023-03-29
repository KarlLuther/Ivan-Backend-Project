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

describe("GET /api/reviews", () => {
  it("should respond with a reviews array of review objects, each of which should have corresponding properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        for (let review of reviews) {
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("designer", expect.any(String));
          if (review.id === 2 || review.id === 3) {
            expect(review.comment_count).toBe(3);
          } else {
            let comment_count = Number(review.comment_count);
            expect(typeof comment_count).toBe("number");
          }
        }
      });
  });
  it("the array should be in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        for (let i = 1; i < reviews.length; i++) {
          let result = reviews[i - 1].created_at >= reviews[i].created_at;
          expect(result).toBe(true);
        }
      });
  });
});
