DROP PROCEDURE IF EXISTS LOGIN;
 DELIMITER //
CREATE PROCEDURE LOGIN(IN usuario VARCHAR(50), IN pass VARCHAR(100))
	BEGIN
		SELECT 
			u.user_id, 
			CONCAT_WS(" ", p.name, p.first_name) AS "name", 
			u.role_id
		FROM user u
		INNER JOIN person p ON u.person_id = p.person_id
		WHERE u.user_id = usuario AND u.password = pass
		AND u.state_id = 1 AND p.state_id = 1;
	END //
DELIMITER ;