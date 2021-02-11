DROP PROCEDURE IF EXISTS SESSION_CHECK;
 DELIMITER //
CREATE PROCEDURE SESSION_CHECK(IN sesion VARCHAR(1000))
	BEGIN
		SELECT 
			se.user_id,
			se.client
		FROM session se
		INNER JOIN user u ON u.user_id = se.user_id AND u.state_id = 1
		WHERE se.session_id = sesion AND se.state_id = 1 AND DATE(se.session_start) = CURDATE();
	END //
DELIMITER ;