/*
 Navicat Premium Data Transfer

 Source Server         : LocalHost
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : 127.0.0.1:3306
 Source Schema         : test_daniel_perez

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 11/02/2021 16:11:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS "test_daniel_perez";
USE "test_daniel_perez";

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int NOT NULL,
  `description` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'ECONOMICS');
INSERT INTO `category` VALUES (2, 'POLITICS');
INSERT INTO `category` VALUES (3, 'SOCIAL');

-- ----------------------------
-- Table structure for document
-- ----------------------------
DROP TABLE IF EXISTS `document`;
CREATE TABLE `document`  (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `category_id` int NULL DEFAULT NULL,
  `owner` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `reg_date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`document_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of document
-- ----------------------------
INSERT INTO `document` VALUES (20, 'Documento 3', 'asdasdfsdf', 3, 'user', '2021-02-02 13:10:50');
INSERT INTO `document` VALUES (21, 'Ducumento 2', 'urlasdasd', 2, 'user', '2021-02-08 13:10:22');
INSERT INTO `document` VALUES (22, 'Documento de prueba 22', 'url_documento_de_prueba', 1, 'admin', '0000-00-00 00:00:00');
INSERT INTO `document` VALUES (24, 'Documento de prueba 4', 'url-asdasdasdaSD', 2, 'user', '2021-02-10 15:18:36');

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history`  (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `document_id` int NULL DEFAULT NULL,
  `action` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `reg_date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`history_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES (2, 'admin', 22, 'add', '2021-02-11 12:50:56');
INSERT INTO `history` VALUES (5, 'admin', 22, 'query', '2021-02-11 01:05:54');
INSERT INTO `history` VALUES (6, 'admin', 22, 'edit', '2021-02-11 03:00:49');
INSERT INTO `history` VALUES (7, 'admin', 22, 'edit', '2021-02-11 03:04:28');
INSERT INTO `history` VALUES (8, 'admin', 22, 'edit', '2021-02-11 03:05:16');

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `permission_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `state_id` int NULL DEFAULT 1,
  PRIMARY KEY (`permission_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES (1, 'permission_add', 1);
INSERT INTO `permission` VALUES (2, 'permission_list', 1);
INSERT INTO `permission` VALUES (3, 'permission_query', 1);
INSERT INTO `permission` VALUES (4, 'permission_edit', 1);
INSERT INTO `permission` VALUES (5, 'permission_del', 1);
INSERT INTO `permission` VALUES (6, 'role_permission_add', 1);
INSERT INTO `permission` VALUES (7, 'role_permission_list', 1);
INSERT INTO `permission` VALUES (8, 'role_permission_query', NULL);
INSERT INTO `permission` VALUES (9, 'role_permission_edit', 1);
INSERT INTO `permission` VALUES (10, 'role_permission_del', 1);
INSERT INTO `permission` VALUES (11, 'role_add', 1);
INSERT INTO `permission` VALUES (12, 'role_list', 1);
INSERT INTO `permission` VALUES (13, 'role_query', 1);
INSERT INTO `permission` VALUES (14, 'role_edit', 1);
INSERT INTO `permission` VALUES (15, 'role_del', 1);
INSERT INTO `permission` VALUES (16, 'session_add', 1);
INSERT INTO `permission` VALUES (17, 'session_list', 1);
INSERT INTO `permission` VALUES (18, 'session_query', 1);
INSERT INTO `permission` VALUES (19, 'session_edit', 1);
INSERT INTO `permission` VALUES (20, 'session_del', 1);
INSERT INTO `permission` VALUES (21, 'state_add', 1);
INSERT INTO `permission` VALUES (22, 'state_list', 1);
INSERT INTO `permission` VALUES (23, 'state_query', 1);
INSERT INTO `permission` VALUES (24, 'state_edit', 1);
INSERT INTO `permission` VALUES (25, 'state_del', 1);
INSERT INTO `permission` VALUES (26, 'person_add', 1);
INSERT INTO `permission` VALUES (27, 'person_list', 1);
INSERT INTO `permission` VALUES (28, 'person_query', 1);
INSERT INTO `permission` VALUES (29, 'person_edit', 1);
INSERT INTO `permission` VALUES (30, 'person_del', 1);
INSERT INTO `permission` VALUES (31, 'user_add', 1);
INSERT INTO `permission` VALUES (32, 'user_list', 1);
INSERT INTO `permission` VALUES (33, 'user_query', 1);
INSERT INTO `permission` VALUES (34, 'user_edit', 1);
INSERT INTO `permission` VALUES (35, 'user_del', 1);
INSERT INTO `permission` VALUES (36, 'user_document_add', 1);
INSERT INTO `permission` VALUES (37, 'user_document_list', 1);
INSERT INTO `permission` VALUES (38, 'user_document_query', 1);
INSERT INTO `permission` VALUES (39, 'user_document_edit', 1);
INSERT INTO `permission` VALUES (40, 'user_document_del', 1);
INSERT INTO `permission` VALUES (41, 'history_add', 1);
INSERT INTO `permission` VALUES (42, 'history_list', 1);
INSERT INTO `permission` VALUES (43, 'history_query', 1);
INSERT INTO `permission` VALUES (44, 'history_edit', 1);
INSERT INTO `permission` VALUES (45, 'history_del', 1);
INSERT INTO `permission` VALUES (46, 'document_add', 1);
INSERT INTO `permission` VALUES (47, 'document_list', 1);
INSERT INTO `permission` VALUES (48, 'document_query', 1);
INSERT INTO `permission` VALUES (49, 'document_edit', 1);
INSERT INTO `permission` VALUES (50, 'document_del', 1);
INSERT INTO `permission` VALUES (51, 'category_add', 1);
INSERT INTO `permission` VALUES (52, 'category_list', 1);
INSERT INTO `permission` VALUES (53, 'category_query', 1);
INSERT INTO `permission` VALUES (54, 'category_edit', 1);
INSERT INTO `permission` VALUES (55, 'category_del', 1);
INSERT INTO `permission` VALUES (56, 'document_share', 1);

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person`  (
  `person_id` int NOT NULL,
  `name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `first_name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `last_name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `city` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `phone_number` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `mail` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `state_id` int NULL DEFAULT NULL,
  `reg_date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`person_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of person
-- ----------------------------
INSERT INTO `person` VALUES (1, 'Enrique', 'López', NULL, 'Cd. México', '5536598524', 'enrique@easylex.com', 1, '2021-02-10 15:53:34');
INSERT INTO `person` VALUES (2, 'Carlos', 'Castillo', NULL, 'Cd. México', '5564218973', 'carlos@easylex.com', 1, '2021-02-10 16:59:29');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` int NOT NULL,
  `description` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `state_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'Administrador', 1);
INSERT INTO `role` VALUES (2, 'Usuario estandar', 1);

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `role_permission_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NULL DEFAULT NULL,
  `permission_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`role_permission_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES (1, 1, 1);
INSERT INTO `role_permission` VALUES (2, 1, 2);
INSERT INTO `role_permission` VALUES (3, 1, 3);
INSERT INTO `role_permission` VALUES (4, 1, 4);
INSERT INTO `role_permission` VALUES (5, 1, 5);
INSERT INTO `role_permission` VALUES (6, 1, 6);
INSERT INTO `role_permission` VALUES (7, 1, 7);
INSERT INTO `role_permission` VALUES (8, 1, 8);
INSERT INTO `role_permission` VALUES (9, 1, 9);
INSERT INTO `role_permission` VALUES (10, 1, 10);
INSERT INTO `role_permission` VALUES (11, 1, 11);
INSERT INTO `role_permission` VALUES (12, 1, 12);
INSERT INTO `role_permission` VALUES (13, 1, 13);
INSERT INTO `role_permission` VALUES (14, 1, 14);
INSERT INTO `role_permission` VALUES (15, 1, 15);
INSERT INTO `role_permission` VALUES (16, 1, 16);
INSERT INTO `role_permission` VALUES (17, 1, 17);
INSERT INTO `role_permission` VALUES (18, 1, 18);
INSERT INTO `role_permission` VALUES (19, 1, 19);
INSERT INTO `role_permission` VALUES (20, 1, 20);
INSERT INTO `role_permission` VALUES (21, 1, 21);
INSERT INTO `role_permission` VALUES (22, 1, 22);
INSERT INTO `role_permission` VALUES (23, 1, 23);
INSERT INTO `role_permission` VALUES (24, 1, 24);
INSERT INTO `role_permission` VALUES (25, 1, 25);
INSERT INTO `role_permission` VALUES (26, 1, 26);
INSERT INTO `role_permission` VALUES (27, 1, 27);
INSERT INTO `role_permission` VALUES (28, 1, 28);
INSERT INTO `role_permission` VALUES (29, 1, 29);
INSERT INTO `role_permission` VALUES (30, 1, 30);
INSERT INTO `role_permission` VALUES (31, 1, 31);
INSERT INTO `role_permission` VALUES (32, 1, 32);
INSERT INTO `role_permission` VALUES (33, 1, 33);
INSERT INTO `role_permission` VALUES (34, 1, 34);
INSERT INTO `role_permission` VALUES (35, 1, 35);
INSERT INTO `role_permission` VALUES (36, 1, 36);
INSERT INTO `role_permission` VALUES (37, 1, 37);
INSERT INTO `role_permission` VALUES (38, 1, 38);
INSERT INTO `role_permission` VALUES (39, 1, 39);
INSERT INTO `role_permission` VALUES (40, 1, 40);
INSERT INTO `role_permission` VALUES (41, 1, 41);
INSERT INTO `role_permission` VALUES (42, 1, 42);
INSERT INTO `role_permission` VALUES (43, 1, 43);
INSERT INTO `role_permission` VALUES (44, 1, 44);
INSERT INTO `role_permission` VALUES (45, 1, 45);
INSERT INTO `role_permission` VALUES (46, 1, 46);
INSERT INTO `role_permission` VALUES (47, 1, 47);
INSERT INTO `role_permission` VALUES (48, 1, 48);
INSERT INTO `role_permission` VALUES (49, 1, 49);
INSERT INTO `role_permission` VALUES (50, 1, 50);
INSERT INTO `role_permission` VALUES (51, 1, 51);
INSERT INTO `role_permission` VALUES (52, 1, 52);
INSERT INTO `role_permission` VALUES (53, 1, 53);
INSERT INTO `role_permission` VALUES (54, 1, 54);
INSERT INTO `role_permission` VALUES (55, 1, 55);
INSERT INTO `role_permission` VALUES (56, 2, 2);
INSERT INTO `role_permission` VALUES (57, 2, 7);
INSERT INTO `role_permission` VALUES (58, 2, 12);
INSERT INTO `role_permission` VALUES (59, 2, 17);
INSERT INTO `role_permission` VALUES (60, 2, 22);
INSERT INTO `role_permission` VALUES (61, 2, 27);
INSERT INTO `role_permission` VALUES (62, 2, 32);
INSERT INTO `role_permission` VALUES (63, 2, 37);
INSERT INTO `role_permission` VALUES (64, 2, 42);
INSERT INTO `role_permission` VALUES (65, 2, 47);
INSERT INTO `role_permission` VALUES (66, 2, 52);
INSERT INTO `role_permission` VALUES (67, 1, 56);

-- ----------------------------
-- Table structure for session
-- ----------------------------
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session`  (
  `session_id` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_id` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `client` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `session_start` datetime(0) NULL DEFAULT NULL,
  `session_con` datetime(0) NULL DEFAULT NULL,
  `session_end` datetime(0) NULL DEFAULT NULL,
  `state_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of session
-- ----------------------------
INSERT INTO `session` VALUES ('DPOVf/hKOoC1gyBDmakmOYbV5KzzTYrYVazN0SUE4JIpJ3PeKp9DLIw2ocX9GU5I05c71A3T5G46sDpumOTmaTb7BtiVjBYJZ9fIDKfA7g3kD9C3VkeSytr2xWsWvuTg', 'admin', 'PostmanRuntime/7.26.10', '2021-02-11 07:29:24', '2021-02-11 04:09:51', NULL, 1);
INSERT INTO `session` VALUES ('DPOVf/hKOoC1gyBDmakmOYbV5KzzTYrYVazN0SUE4JIpJ3PeKp9DLIw2ocX9GU5ID+Mr3UtHtw8Gz1BlrIDAk0JJGUX6cnqgiUZc30VZMKA2Qmf2Rx64mmMAkg0tnGYF', 'admin', 'PostmanRuntime/7.26.10', '2021-02-11 07:27:06', '2021-02-11 07:27:29', NULL, 3);

-- ----------------------------
-- Table structure for state
-- ----------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state`  (
  `state_id` int NOT NULL,
  `description` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`state_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of state
-- ----------------------------
INSERT INTO `state` VALUES (1, 'Activo');
INSERT INTO `state` VALUES (2, 'Inactivo');
INSERT INTO `state` VALUES (3, 'Eliminado');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `person_id` int NULL DEFAULT NULL,
  `role_id` int NULL DEFAULT NULL,
  `state_id` int NULL DEFAULT NULL,
  `reg_date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', 'admin', 1, 1, 1, '2021-02-10 15:54:15');
INSERT INTO `user` VALUES ('user', 'user', 2, 2, 1, '2021-02-10 16:58:30');

-- ----------------------------
-- Table structure for user_document
-- ----------------------------
DROP TABLE IF EXISTS `user_document`;
CREATE TABLE `user_document`  (
  `user_document_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `document_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`user_document_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_document
-- ----------------------------
INSERT INTO `user_document` VALUES (1, 'admin', 22);
INSERT INTO `user_document` VALUES (2, 'user', 20);
INSERT INTO `user_document` VALUES (3, 'user', 21);

-- ----------------------------
-- Procedure structure for LOGIN
-- ----------------------------
DROP PROCEDURE IF EXISTS `LOGIN`;
delimiter ;;
CREATE PROCEDURE `LOGIN`(IN usuario VARCHAR(50), IN pass VARCHAR(100))
BEGIN
		SELECT 
			u.user_id, 
			CONCAT_WS(" ", p.name, p.first_name) AS "name", 
			u.role_id
		FROM user u
		INNER JOIN person p ON u.person_id = p.person_id
		WHERE u.user_id = usuario AND u.password = pass
		AND u.state_id = 1 AND p.state_id = 1;
	END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PERMISSION_CHECK
-- ----------------------------
DROP PROCEDURE IF EXISTS `PERMISSION_CHECK`;
delimiter ;;
CREATE PROCEDURE `PERMISSION_CHECK`(IN idusuario INT, IN permiso VARCHAR(255))
BEGIN
		SELECT 
			p.name
			FROM user u
			INNER JOIN role_permission rp ON u.role_id = rp.role_id 
            INNER JOIN permission p ON p.permission_id = rp.permission_id AND p.state_id = 1
			WHERE u.user_id = idusuario AND u.state_id = 1 AND p.name = permiso;
	END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SESSION_CHECK
-- ----------------------------
DROP PROCEDURE IF EXISTS `SESSION_CHECK`;
delimiter ;;
CREATE PROCEDURE `SESSION_CHECK`(IN sesion VARCHAR(1000))
BEGIN
		SELECT 
			se.user_id,
			se.client
		FROM session se
		INNER JOIN user u ON u.user_id = se.user_id AND u.state_id = 1
		WHERE se.session_id = sesion AND se.state_id = 1 AND DATE(se.session_start) = CURDATE();
	END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
