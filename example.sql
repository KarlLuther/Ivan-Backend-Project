\c nc_games_test




-- get review by id

-- SELECT * FROM reviews
--   WHERE review_id = $1; 


-- get reviews with comments

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
      WHERE review.review_id = 1
      GROUP BY reviews.review_id
      ORDER BY created_at DESC;