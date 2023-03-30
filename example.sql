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


-- UPDATE table_name
-- SET column1 = value1, column2 = value2, ...
-- WHERE condition;

SELECT * FROM reviews
WHERE review_id = 12;

-- UPDATE reviews
-- SET votes = votes + 1
-- WHERE review_id = 2
-- RETURNING review_id, title, category, designer, owner, review_body, review_img_url, created_at, votes;



