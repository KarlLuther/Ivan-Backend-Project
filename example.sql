\c nc_games_test


SELECT * FROM comments;


DELETE FROM comments WHERE comment_id = 1;

SELECT * FROM comments;

DELETE FROM comments WHERE comment_id = 2;
SELECT * FROM comments;

-- DELETE FROM table_name WHERE condition;