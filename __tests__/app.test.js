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

describe("GET /api/reviews/:review_id", () => {
  it("if review with id = one requested should respond with a review object with id one, with corresponding id and properties", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.review_id).toBe(1);
        expect(review).toHaveProperty("title", expect.any(String));
        expect(review).toHaveProperty("designer", expect.any(String));
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review).toHaveProperty("votes", expect.any(Number));
        expect(review).toHaveProperty("category", expect.any(String));
        expect(review).toHaveProperty("review_body", expect.any(String));
        expect(review).toHaveProperty("owner", expect.any(String));
        expect(review).toHaveProperty("created_at", expect.any(String));
      });
  });
  it("if review with id = two requested should respond with a review object with id two, with corresponding id and properties", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.review_id).toBe(2);
        expect(review).toHaveProperty("title", expect.any(String));
        expect(review).toHaveProperty("designer", expect.any(String));
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review).toHaveProperty("votes", expect.any(Number));
        expect(review).toHaveProperty("category", expect.any(String));
        expect(review).toHaveProperty("review_body", expect.any(String));
        expect(review).toHaveProperty("owner", expect.any(String));
        expect(review).toHaveProperty("created_at", expect.any(String));
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

describe("GET /api/reviews/:review_id/comments", () => {
  it("if comments from review with id = two are requested should respond with an array of comment objects with corresponding reviews_id and other properties", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        for (let comment of comments) {
          expect(comment.review_id).toBe(2);
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
        }
      });
  });
  it("if comments from review with id = three are requested should respond with an array of comment objects with corresponding reviews_id and other properties", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        for (let comment of comments) {
          expect(comment.review_id).toBe(3);
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
        }
      });
  });
  it("the comment array should be in descending order", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        for (let i = 1; i < comments.length; i++) {
          let result = comments[i - 1].created_at >= comments[i].created_at;
          expect(result).toBe(true);
        }
      });
  });
  it("if the request is for a review which doesn't have comments, responds with status 404", () => {
    return request(app)
      .get("/api/reviews/10/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  it("if the request is ill-formed, responds with status 400", () => {
    return request(app)
      .get("/api/reviews/cats/comments")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: ill-formed request");
      });
  });
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
