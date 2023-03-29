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

SELECT * FROM comments
WHERE review_id = 3
ORDER By created_at DESC;