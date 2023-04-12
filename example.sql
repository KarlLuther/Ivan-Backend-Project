\c nc_games_test


-- get review by id

SELECT
      reviews.title,
  reviews.designer,
  reviews.owner,
  reviews.review_img_url,
  reviews.category,
  reviews.created_at,
  reviews.votes,
  reviews.review_body,
  reviews.review_id,
  COUNT(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments
      ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = 5
      GROUP BY reviews.review_id;
      -- ORDER BY votes DESC;
    

-- DELETE FROM comments WHERE comment_id = 2;
-- SELECT * FROM comments;

-- DELETE FROM table_name WHERE condition;


