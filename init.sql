 -- * @Author: beyondouyuan
 -- * @Last Modified by:   beyondouyuan
 -- * @E-mail: beyondouyuan@gmail.com
 -- * @Github: https://beyondouyuan.github.io/
 -- * @version: 1.0.0



 -- * Source Server         : localhost
 -- * Source Server Version : 50719
 -- * Source Host           : localhost:3306
 -- * Source Database       : filmsystem
 -- * Target Server Type    : MYSQL
 -- * Target Server Version : 50719
 -- * File Encoding         : 65001
 -- * Date: 2020-06-01 13:30:38


-- init database tables
-- mysql -u your account  -p
-- CREATE DATABASE filmsystem;
-- use filmsystem;
-- source /your path/init.sql;


-- tips: use sql `show full columns from test` show all columns of test's table;



-- ----------------------------
-- Table structure for users
-- ----------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(200) NOT NULL DEFAULT 'http://127.0.0.1:8889/upload/images/avatar/avatar.jpg' COMMENT '头像',
  `role` int(11) NOT NULL DEFAULT '1' COMMENT '0:管理员 1:会员',
  `createTime` bigint(20) NOT NULL DEFAULT '1590987600000',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users
-- user pass use bcryptjs transfer
-- userName: admin password: admin
-- userName: member password: 123456
-- ----------------------------

-- INSERT INTO `users` VALUES ('1', 'admin', 'admin', '', '0', '1590987600000');
-- INSERT INTO `users` VALUES ('2', 'member', '123456', '', '1', '1590987600000');

INSERT INTO `users` VALUES ('1', 'admin', 'admin', '', '0', '1590987600000');
INSERT INTO `users` VALUES ('2', 'member', '123456', '', '1', '1590987600000');