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

describe("POST /api/reviews/:review_id/comments", () => {
  it("responds with the posted comment", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "mallionaire", body: "Hi, username!" })
      .expect(201)
      .then(({ body }) => {
        const { postedComment } = body;
        expect(postedComment.review_id).toBe(1);
        expect(postedComment).toHaveProperty("author", expect.any(String));
        expect(postedComment).toHaveProperty("body", expect.any(String));
        expect(postedComment).toHaveProperty("votes", expect.any(Number));
        expect(postedComment).toHaveProperty("comment_id", expect.any(Number));
        expect(postedComment).toHaveProperty("created_at", expect.any(String));
      });
  });
  it("if the request is for a review_id which doesn't exist, responds with status 404", () => {
    return request(app)
      .post("/api/reviews/100/comments")
      .send({ username: "mallionaire", body: "Hi, username!" })
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(
          "404: no review was found for the specified review_id or specified username does not exist in the system"
        );
      });
  });
  it("if the userame with specified name does not exist, responds with status 404", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "karl_Luther", body: "Hi, username!" })
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(
          "404: no review was found for the specified review_id or specified username does not exist in the system"
        );
      });
  });
  it("some other property on requested body apart from username and body", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "mallionaire", body: "Hi, username!", cats: "cats" })
      .expect(201)
      .then(({ body }) => {
        const { postedComment } = body;
        expect(postedComment.review_id).toBe(1);
        expect(postedComment).toHaveProperty("author", expect.any(String));
        expect(postedComment).toHaveProperty("body", expect.any(String));
        expect(postedComment).toHaveProperty("votes", expect.any(Number));
        expect(postedComment).toHaveProperty("comment_id", expect.any(Number));
        expect(postedComment).toHaveProperty("created_at", expect.any(String));
      });
  });
  it("parsed objest does not contain body property", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "mallionaire" })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: Request body does not contain body property");
      });
  });
  it("parsed objest does not contain username property", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ body: "Hi, username!" })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(
          "400: Request body does not contain username property"
        );
      });
  });
  it("if the request is for a review_id which is invalid, responds with status 400", () => {
    return request(app)
      .post("/api/reviews/cats/comments")
      .send({ username: "mallionaire", body: "Hi, username!" })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: ill-formed request");
      });
  });
});
