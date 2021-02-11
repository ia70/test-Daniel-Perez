DROP PROCEDURE IF EXISTS PERMISSION_CHECK;
 DELIMITER //
CREATE PROCEDURE PERMISSION_CHECK(IN idusuario INT, IN permiso VARCHAR(255))
	BEGIN
		SELECT 
			p.name
			FROM user u
			INNER JOIN role_permission rp ON u.role_id = rp.role_id 
            INNER JOIN permission p ON p.permission_id = rp.permission_id AND p.state_id = 1
			WHERE u.user_id = idusuario AND u.state_id = 1 AND p.name = permiso;
	END //
DELIMITER ;