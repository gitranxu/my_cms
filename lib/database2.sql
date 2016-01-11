/*
SQLyog Ultimate v11.27 (32 bit)
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

insert  into `c_page`(`id`,`name`,`create_time`) values ('a19d4dab-b840-11e5-a0bb-68f728f3bf19','页面一','2016-01-11 16:53:03'),('b71e304c-b840-11e5-a0bb-68f728f3bf19','页面二','2016-01-11 16:53:30');

/*Table structure for table `c_page_block` */

DROP TABLE IF EXISTS `c_page_block`;

CREATE TABLE `c_page_block` (
  `id` char(36) NOT NULL,
  `c_block_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `style` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_block` */

/*Table structure for table `c_page_blocks` */

DROP TABLE IF EXISTS `c_page_blocks`;

CREATE TABLE `c_page_blocks` (
  `id` char(36) NOT NULL,
  `c_blocks_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `style` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_blocks` */

/*Table structure for table `c_page_floor` */

DROP TABLE IF EXISTS `c_page_floor`;

CREATE TABLE `c_page_floor` (
  `id` char(36) NOT NULL,
  `c_floor_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `style` varchar(100) DEFAULT NULL,
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

insert  into `c_page_layout`(`id`,`c_layout_id`,`c_page_id`,`url`,`project_name`,`create_time`,`last_edit_time`) values ('1','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','a19d4dab-b840-11e5-a0bb-68f728f3bf19','url111','proj111','2016-01-11 16:59:27','2016-01-11 17:00:28'),('2','60f01bfd-b841-11e5-a0bb-68f728f3bf19','a19d4dab-b840-11e5-a0bb-68f728f3bf19','url布2','project222','2016-01-11 17:00:17','2016-01-11 17:00:32'),('3','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','b71e304c-b840-11e5-a0bb-68f728f3bf19','ul3','p3','2016-01-11 18:07:55','2016-01-11 18:07:57'),('4','60f01bfd-b841-11e5-a0bb-68f728f3bf19','b71e304c-b840-11e5-a0bb-68f728f3bf19','ul4','p4','2016-01-11 18:07:49','2016-01-11 18:07:52');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
