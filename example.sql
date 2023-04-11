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
          
          WHERE 
          category = 'SELECT 1'
          
        --   GROUP BY reviews.review_id
         order by 1, (select case when (1=1) then 1 else 1*(select table_name from information_schema.tables)end)=1;
        --   ORDER BY created_at DESC;




-- SELECT DISTINCT category FROM reviews;