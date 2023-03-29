\c nc_games_test

--       SELECT 
--       reviews.title,
--   reviews.designer,
--   reviews.owner,
--   reviews.review_img_url,
--   reviews.category,
--   reviews.created_at,
--   reviews.votes,
--   reviews.review_id,
-- COUNT(comments.comment_id) AS comment_count
-- --   CAST(reviews.comment_count AS INT)
--       FROM reviews
--       LEFT JOIN comments
--       ON reviews.review_id = comments.review_id
--       GROUP BY reviews.review_id
--       ORDER BY created_at DESC;

SELECT * FROM comments;

INSERT INTO comments(body,review_id,author,votes)
VALUES ('Hi, username!', 1, 'mallionaire', 0)
RETURNING review_id, comment_id, author, body, votes, created_at;

-- SELECT * FROM comments;

-- INSERT INTO table_name (column1, column2, column3, ...)
-- VALUES (value1, value2, alue3, ...);