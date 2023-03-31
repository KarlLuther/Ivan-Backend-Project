\c nc_games_test


-- SELECT * FROM comments;


-- DELETE FROM comments WHERE comment_id = 1;

-- SELECT * FROM comments;

-- DELETE FROM comments WHERE comment_id = 2;
-- SELECT * FROM comments;

-- DELETE FROM table_name WHERE condition;

SELECT 
      reviews.title,
  reviews.designer,
  reviews.owner,
  reviews.review_img_url,
  reviews.category,
  reviews.created_at,
  reviews.votes,
  reviews.review_id,
  COUNT(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments
      ON reviews.review_id = comments.review_id
      GROUP BY reviews.review_id
      ORDER BY created_at ASC;