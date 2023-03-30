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

describe("PATCH /api/reviews/:review_id", () => {
  it("responds with the updated review(checking for review with id =1 and increases votes by 1)", () => {
    const numberOfVotesToAdd = 1;
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: numberOfVotesToAdd })
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.votes).toBe(2);
        expect(review).toHaveProperty("review_id", expect.any(Number));
        expect(review).toHaveProperty("owner", expect.any(String));
        expect(review).toHaveProperty("title", expect.any(String));
        expect(review).toHaveProperty("category", expect.any(String));
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review).toHaveProperty("created_at", expect.any(String));
        expect(review).toHaveProperty("designer", expect.any(String));
        expect(review).toHaveProperty("review_body", expect.any(String));
      });
  });
  it("responds with the updated review(checking for review with id = 12 and increases votes by 10)", () => {
    const numberOfVotesToAdd = 10;
    return request(app)
      .patch("/api/reviews/12")
      .send({ inc_votes: numberOfVotesToAdd })
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.votes).toBe(110);
        expect(review).toHaveProperty("review_id", expect.any(Number));
        expect(review).toHaveProperty("owner", expect.any(String));
        expect(review).toHaveProperty("title", expect.any(String));
        expect(review).toHaveProperty("category", expect.any(String));
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review).toHaveProperty("created_at", expect.any(String));
        expect(review).toHaveProperty("designer", expect.any(String));
        expect(review).toHaveProperty("review_body", expect.any(String));
      });
  });
  it("responds with the updated review(checking for review with id = 12 and decreases votes by 10)", () => {
    const numberOfVotesToAdd = -10;
    return request(app)
      .patch("/api/reviews/12")
      .send({ inc_votes: numberOfVotesToAdd })
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.votes).toBe(90);
        expect(review).toHaveProperty("review_id", expect.any(Number));
        expect(review).toHaveProperty("owner", expect.any(String));
        expect(review).toHaveProperty("title", expect.any(String));
        expect(review).toHaveProperty("category", expect.any(String));
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review).toHaveProperty("created_at", expect.any(String));
        expect(review).toHaveProperty("designer", expect.any(String));
        expect(review).toHaveProperty("review_body", expect.any(String));
      });
  });
  it("if the request is for a review_id which doesn't exist, responds with status 404", () => {
    const numberOfVotesToAdd = -10;
    return request(app)
      .patch("/api/reviews/100")
      .send({ inc_votes: numberOfVotesToAdd })
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: no review was found for the specified review");
      });
  });
  it("if the parsed review_id is not a number, responds with status 400", () => {
    const numberOfVotesToAdd = -10;
    return request(app)
      .patch("/api/reviews/cats")
      .send({ inc_votes: numberOfVotesToAdd })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: ill-formed request");
      });
  });
  it("if some other property on requested body apart from inc_votes responds with 400", () => {
    const numberOfVotesToAdd = -10;
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: numberOfVotesToAdd, cats: "cats" })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: Some other property on request body");
      });
  });
  it("if parsed objest does not contain inc_votes property responds with 400", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(
          "400: Request body does not contain inc_votes property"
        );
      });
  });

  it("if value of inc_votes is not a number, responds with 400", () => {
    const numberOfVotesToAdd = "random words";
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: numberOfVotesToAdd })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: ill-formed request");
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

describe("DELETE /api/comments/:comment_id", () => {
  it("responds with status 204 and no content", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  it("responds with status 404 if there is no comment with specified id", () => {
    return request(app)
      .delete("/api/comments/1000")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(`404: No comment found for specified id: 1000`);
      });
  });
  it("responds with status 400 if the parsed id is invalid", () => {
    return request(app)
      .delete("/api/comments/cats")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(`400: ill-formed request`);
      });
  });
});

describe.only("GET /api/users", () => {
  it("should respond an array of users objects, each of which should have corresponding properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        for (let user of users) {
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("avatar_url", expect.any(String));
          expect(user).toHaveProperty("name", expect.any(String));
        }
      });
  });
});
