/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.6.24 : Database - cms2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cms2` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `cms2`;

/*Table structure for table `c_block` */

DROP TABLE IF EXISTS `c_block`;

CREATE TABLE `c_block` (
  `id` char(36) NOT NULL,
  `content` text,
  `c_blocks_id` char(36) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_block` */

insert  into `c_block`(`id`,`content`,`c_blocks_id`,`create_time`) values ('0f211848-b857-11e5-8208-003067b83487','<div class=\"cb3 c_block fl_rx c11 h300\"></div>','91834cab-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:33:26'),('25349997-b857-11e5-8208-003067b83487','<div class=\"cb2 c_block fl_rx c9 h300\"></div>','91834cab-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:33:55'),('2c59d845-b031-11e5-b189-003067b83487','<div class=\"cb2 c_block fl_rx c15 h300\"></div>','86352d1d-af67-11e5-baf7-68f728f3bf19','2016-01-11 20:30:22'),('420fd0b9-b857-11e5-8208-003067b83487','<div class=\"c_block c5 h200 blocks_move\"></div>','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:34:48'),('a58973ff-b85e-11e5-8208-003067b83487','<div class=\"c_block c5 h200 blocks_move\"></div>','7219122a-af67-11e5-baf7-68f728f3bf19','2016-01-11 20:27:07'),('eaf8632e-b856-11e5-8208-003067b83487','<div class=\"cb1 c_block fl_rx c2 h300\"></div>','91834cab-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:32:50'),('fc4145b2-b85e-11e5-8208-003067b83487','<div class=\"cb1 c_block fl_rx c2 h300\"></div>','86352d1d-af67-11e5-baf7-68f728f3bf19','2016-01-11 20:29:34');

/*Table structure for table `c_blocks` */

DROP TABLE IF EXISTS `c_blocks`;

CREATE TABLE `c_blocks` (
  `id` char(36) NOT NULL,
  `content` text,
  `c_layout_id` char(36) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_blocks` */

insert  into `c_blocks`(`id`,`content`,`c_layout_id`,`create_time`) values ('7219122a-af67-11e5-baf7-68f728f3bf19',NULL,'60f01bfd-b841-11e5-a0bb-68f728f3bf19','2016-01-11 20:26:00'),('86352d1d-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>','60f01bfd-b841-11e5-a0bb-68f728f3bf19','2016-01-11 20:28:33'),('91834cab-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','2016-01-11 19:29:36'),('9e0eaa3e-af67-11e5-baf7-68f728f3bf19',NULL,'2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','2016-01-11 19:29:56');

/*Table structure for table `c_data` */

DROP TABLE IF EXISTS `c_data`;

CREATE TABLE `c_data` (
  `id` char(36) NOT NULL,
  `c_model_id` char(36) DEFAULT NULL,
  `c_floor_id` char(36) DEFAULT NULL,
  `c_floor_model_id` char(72) DEFAULT NULL,
  `data` text,
  `connect_time` datetime DEFAULT NULL COMMENT '建立关联关系的时间，取时间最新的值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_data` */

/*Table structure for table `c_floor` */

DROP TABLE IF EXISTS `c_floor`;

CREATE TABLE `c_floor` (
  `id` char(36) NOT NULL,
  `content` text,
  `c_block_id` char(36) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_floor` */

/*Table structure for table `c_layout` */

DROP TABLE IF EXISTS `c_layout`;

CREATE TABLE `c_layout` (
  `id` char(36) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `content` text,
  `img_url` varchar(80) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_layout` */

insert  into `c_layout`(`id`,`name`,`content`,`img_url`,`create_time`) values ('2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','布局一','<div class=\"cntr hid_rx wrap1200\" id=\"layout1\">\r\n	<style>\r\n		#layout1 .cb1{width: 200px;}\r\n		#layout1 .cb2{width: 700px;}\r\n		#layout1 .cb3{width: 300px;}\r\n	</style>\r\n	\r\n</div>','/images/upload/1.jpg','2016-01-11 16:57:31'),('60f01bfd-b841-11e5-a0bb-68f728f3bf19','布局二','<div class=\"cntr wrap1200\" id=\"layout2\">\r\n	<style>\r\n		#layout2 .cb1{width: 400px;}\r\n		#layout2 .cb2{width: 800px;}\r\n	</style>\r\n</div>','/images/upload/3.jpg','2016-01-11 16:58:41');

/*Table structure for table `c_model` */

DROP TABLE IF EXISTS `c_model`;

CREATE TABLE `c_model` (
  `id` char(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `content` text,
  `data_model` text,
  `img_url` varchar(100) DEFAULT NULL,
  `type` int(1) DEFAULT NULL COMMENT '模板类型，1.普通html模板，2.juicer模板',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_model` */

/*Table structure for table `c_page` */

DROP TABLE IF EXISTS `c_page`;

CREATE TABLE `c_page` (
  `id` char(36) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page` */

insert  into `c_page`(`id`,`name`,`create_time`) values ('3ad91ea0-b86a-11e5-8d14-01dbcdd8712f','页面四','2016-01-11 21:50:09'),('a19d4dab-b840-11e5-a0bb-68f728f3bf19','页面一','2016-01-11 16:53:03'),('a8398ee0-b85a-11e5-a707-5bfd3c677619','页面三','2016-01-11 19:58:41'),('b71e304c-b840-11e5-a0bb-68f728f3bf19','页面二','2016-01-11 16:53:30');

/*Table structure for table `c_page_block` */

DROP TABLE IF EXISTS `c_page_block`;

CREATE TABLE `c_page_block` (
  `id` char(36) NOT NULL,
  `c_block_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT '1',
  `style` varchar(100) DEFAULT 'margin-left:0px!important;margin-right:0px!important;width:200px!important;',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_block` */

insert  into `c_page_block`(`id`,`c_block_id`,`c_page_id`,`order`,`style`,`create_time`,`last_edit_time`) values ('0437a2d2-b866-11e5-8208-003067b83487','2c59d845-b031-11e5-b189-003067b83487','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 21:20:00','2016-01-11 21:20:00'),('0437b939-b866-11e5-8208-003067b83487','fc4145b2-b85e-11e5-8208-003067b83487','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 21:20:00','2016-01-11 21:20:00'),('3adc3069-b86a-11e5-8208-003067b83487','25349997-b857-11e5-8208-003067b83487','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 21:50:09','2016-01-11 21:50:09'),('3adc631d-b86a-11e5-8208-003067b83487','0f211848-b857-11e5-8208-003067b83487','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 21:50:09','2016-01-11 21:50:09'),('3adc70e2-b86a-11e5-8208-003067b83487','eaf8632e-b856-11e5-8208-003067b83487','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 21:50:09','2016-01-11 21:50:09'),('7e7f9dc9-b86a-11e5-8208-003067b83487','2c59d845-b031-11e5-b189-003067b83487','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 21:52:03','2016-01-11 21:52:03'),('7e800f21-b86a-11e5-8208-003067b83487','fc4145b2-b85e-11e5-8208-003067b83487','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 21:52:03','2016-01-11 21:52:03'),('a83d47d9-b85a-11e5-8208-003067b83487','eaf8632e-b856-11e5-8208-003067b83487','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 19:58:41','2016-01-11 19:58:41'),('a83d489d-b85a-11e5-8208-003067b83487','25349997-b857-11e5-8208-003067b83487','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 19:58:41','2016-01-11 19:58:41'),('a83d524b-b85a-11e5-8208-003067b83487','0f211848-b857-11e5-8208-003067b83487','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-11 19:58:41','2016-01-11 19:58:41');

/*Table structure for table `c_page_blocks` */

DROP TABLE IF EXISTS `c_page_blocks`;

CREATE TABLE `c_page_blocks` (
  `id` char(36) NOT NULL,
  `c_blocks_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT '1',
  `style` varchar(100) DEFAULT 'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_blocks` */

insert  into `c_page_blocks`(`id`,`c_blocks_id`,`c_page_id`,`order`,`style`,`create_time`,`last_edit_time`) values ('0436c63a-b866-11e5-8208-003067b83487','7219122a-af67-11e5-baf7-68f728f3bf19','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 21:20:00','2016-01-11 21:20:00'),('043793b2-b866-11e5-8208-003067b83487','86352d1d-af67-11e5-baf7-68f728f3bf19','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 21:20:00','2016-01-11 21:20:00'),('3adc4008-b86a-11e5-8208-003067b83487','91834cab-af67-11e5-baf7-68f728f3bf19','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 21:50:09','2016-01-11 21:50:09'),('3adc52f0-b86a-11e5-8208-003067b83487','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 21:50:09','2016-01-11 21:50:09'),('7e7e75b4-b86a-11e5-8208-003067b83487','7219122a-af67-11e5-baf7-68f728f3bf19','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 21:52:03','2016-01-11 21:52:03'),('7e7f883a-b86a-11e5-8208-003067b83487','86352d1d-af67-11e5-baf7-68f728f3bf19','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 21:52:03','2016-01-11 21:52:03'),('a83d4875-b85a-11e5-8208-003067b83487','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 19:58:41','2016-01-11 19:58:41'),('a83d5054-b85a-11e5-8208-003067b83487','91834cab-af67-11e5-baf7-68f728f3bf19','a8398ee0-b85a-11e5-a707-5bfd3c677619',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-11 19:58:41','2016-01-11 19:58:41');

/*Table structure for table `c_page_floor` */

DROP TABLE IF EXISTS `c_page_floor`;

CREATE TABLE `c_page_floor` (
  `id` char(36) NOT NULL,
  `c_floor_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT '1',
  `style` varchar(100) DEFAULT 'margin-top:0px!important;margin-bottom:0px!important;',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_floor` */

/*Table structure for table `c_page_layout` */

DROP TABLE IF EXISTS `c_page_layout`;

CREATE TABLE `c_page_layout` (
  `id` char(36) NOT NULL,
  `c_layout_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `project_name` varchar(80) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_layout` */

insert  into `c_page_layout`(`id`,`c_layout_id`,`c_page_id`,`url`,`project_name`,`create_time`,`last_edit_time`) values ('0436e0a9-b866-11e5-8208-003067b83487','60f01bfd-b841-11e5-a0bb-68f728f3bf19','a8398ee0-b85a-11e5-a707-5bfd3c677619','u2','s2','2016-01-11 21:20:00','2016-01-11 21:20:00'),('1','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','a19d4dab-b840-11e5-a0bb-68f728f3bf19','url111','proj111','2016-01-11 16:59:27','2016-01-11 17:00:28'),('2','60f01bfd-b841-11e5-a0bb-68f728f3bf19','a19d4dab-b840-11e5-a0bb-68f728f3bf19','url布2','project222','2016-01-11 17:00:17','2016-01-11 17:00:32'),('3','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','b71e304c-b840-11e5-a0bb-68f728f3bf19','ul3','p3','2016-01-11 18:07:55','2016-01-11 18:07:57'),('3adab30f-b86a-11e5-8208-003067b83487','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f','1','1','2016-01-11 21:50:09','2016-01-11 22:58:19'),('4','60f01bfd-b841-11e5-a0bb-68f728f3bf19','b71e304c-b840-11e5-a0bb-68f728f3bf19','ul4','p4','2016-01-11 18:07:49','2016-01-11 18:07:52'),('7e7e8d89-b86a-11e5-8208-003067b83487','60f01bfd-b841-11e5-a0bb-68f728f3bf19','3ad91ea0-b86a-11e5-8d14-01dbcdd8712f','2','2','2016-01-11 21:52:03','2016-01-11 21:52:03'),('a83d4a72-b85a-11e5-8208-003067b83487','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','a8398ee0-b85a-11e5-a707-5bfd3c677619','u','s','2016-01-11 19:58:41','2016-01-11 19:58:41');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
