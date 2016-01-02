/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.6.24 : Database - cms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cms` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `cms`;

/*Table structure for table `c_block` */

DROP TABLE IF EXISTS `c_block`;

CREATE TABLE `c_block` (
  `id` char(36) NOT NULL,
  `content` text NOT NULL,
  `order` int(11) NOT NULL,
  `c_blocks_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_block` */

insert  into `c_block`(`id`,`content`,`order`,`c_blocks_id`) values ('1','<div class=\"c_block c5 h200 blocks_move\"></div>',1,'7219122a-af67-11e5-baf7-68f728f3bf19'),('10','<div class=\"c_block c8 h250 blocks_move\"></div>',3,'327951f3-af67-11e5-baf7-68f728f3bf19'),('11','<div class=\"c_block c9 h200 blocks_move\"></div>',24,'4f0a4e60-af67-11e5-baf7-68f728f3bf19'),('1476e03e-b031-11e5-b189-003067b83487','<div class=\"cb1 c_block fl_rx c2 h300\"></div>',3,'86352d1d-af67-11e5-baf7-68f728f3bf19'),('2c59d845-b031-11e5-b189-003067b83487','<div class=\"cb2 c_block fl_rx c15 h300\"></div>',2,'86352d1d-af67-11e5-baf7-68f728f3bf19'),('4','<div class=\"cb1 c_block fl_rx c2 h300\"></div>',1,'91834cab-af67-11e5-baf7-68f728f3bf19'),('6','<div class=\"cb3 c_block fl_rx c11 h300\"></div>',2,'91834cab-af67-11e5-baf7-68f728f3bf19'),('7','<div class=\"c_block c5 h200 blocks_move\"></div>',1,'9e0eaa3e-af67-11e5-baf7-68f728f3bf19'),('8','<div class=\"c_block c4 h200 blocks_move\"><span>块一对于布局来说，可以设置块类型，块宽高，块边距,块最大楼层数,f_w等信息</span></div>',1,'de293ad3-af66-11e5-baf7-68f728f3bf19'),('9','<div class=\"c_block c5 h200 blocks_move\"><div>块二还可以维护布局所属终端类型</div></div>',2,'08fd8d8b-af67-11e5-baf7-68f728f3bf19'),('db7acfc0-af6b-11e5-baf7-68f728f3bf19','<div class=\"cb2 c_block fl_rx c9 h300\"></div>',3,'91834cab-af67-11e5-baf7-68f728f3bf19');

/*Table structure for table `c_blocks` */

DROP TABLE IF EXISTS `c_blocks`;

CREATE TABLE `c_blocks` (
  `id` char(36) NOT NULL,
  `order` int(11) NOT NULL,
  `layout_id` char(36) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_blocks` */

insert  into `c_blocks`(`id`,`order`,`layout_id`,`content`) values ('08fd8d8b-af67-11e5-baf7-68f728f3bf19',4,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL),('327951f3-af67-11e5-baf7-68f728f3bf19',1,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL),('4f0a4e60-af67-11e5-baf7-68f728f3bf19',3,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL),('7219122a-af67-11e5-baf7-68f728f3bf19',2,'f8464c72-af67-11e5-baf7-68f728f3bf19',NULL),('86352d1d-af67-11e5-baf7-68f728f3bf19',1,'f8464c72-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>'),('91834cab-af67-11e5-baf7-68f728f3bf19',3,'c232ed09-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>'),('9e0eaa3e-af67-11e5-baf7-68f728f3bf19',6,'c232ed09-af67-11e5-baf7-68f728f3bf19',NULL),('de293ad3-af66-11e5-baf7-68f728f3bf19',2,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL);

/*Table structure for table `c_data` */

DROP TABLE IF EXISTS `c_data`;

CREATE TABLE `c_data` (
  `id` char(36) NOT NULL,
  `c_model_id` char(36) DEFAULT NULL,
  `c_floor_id` char(36) DEFAULT NULL,
  `data` text,
  `c_floor_model_id` char(72) DEFAULT NULL COMMENT 'c_floor_id在前，c_model_id在后的联合查询列，便于批量查询',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_data` */

insert  into `c_data`(`id`,`c_model_id`,`c_floor_id`,`data`,`c_floor_model_id`) values ('442222111dd','51a8d2d1-b0f0-11e5-a998-003067b83487','6dd588e6-b0f0-11e5-a998-003067b83487','[\r\n	{imgurl:\'1.jpg\',name:\'图片1\'},\r\n	{imgurl:\'2.jpg\',name:\'图片2\'},\r\n	{imgurl:\'3.jpg\',name:\'图片3\'},\r\n	{imgurl:\'4.jpg\',name:\'图片4\'}\r\n]','6dd588e6-b0f0-11e5-a998-003067b8348751a8d2d1-b0f0-11e5-a998-003067b83487'),('55555555578','51a8d2d1-b0f0-11e5-a998-003067b83487','2daeba80-b0f3-11e5-a998-003067b83487','[\r\n	{imgurl:\'5.jpg\',name:\'图片5\'},\r\n	{imgurl:\'6.jpg\',name:\'图片6\'},\r\n	{imgurl:\'7.jpg\',name:\'图片7\'},\r\n	{imgurl:\'8.jpg\',name:\'图片8\'}\r\n]','2daeba80-b0f3-11e5-a998-003067b8348751a8d2d1-b0f0-11e5-a998-003067b83487');

/*Table structure for table `c_floor` */

DROP TABLE IF EXISTS `c_floor`;

CREATE TABLE `c_floor` (
  `id` char(36) NOT NULL,
  `content` text,
  `order` int(5) NOT NULL,
  `c_block_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_floor` */

insert  into `c_floor`(`id`,`content`,`order`,`c_block_id`) values ('2daeba80-b0f3-11e5-a998-003067b83487','<div class=\"c_floor h200 c18\"></div>',3,'2c59d845-b031-11e5-b189-003067b83487'),('6dd588e6-b0f0-11e5-a998-003067b83487','<div class=\"c_floor h100 c17\"></div>',2,'2c59d845-b031-11e5-b189-003067b83487'),('adsfdsf2123','<div class=\"c_floor h200 c7\"></div>',1,'2c59d845-b031-11e5-b189-003067b83487');

/*Table structure for table `c_layout` */

DROP TABLE IF EXISTS `c_layout`;

CREATE TABLE `c_layout` (
  `id` char(36) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `content` text NOT NULL COMMENT '布局的html',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_layout` */

insert  into `c_layout`(`id`,`name`,`content`,`create_time`) values ('5b763f4b-af66-11e5-baf7-68f728f3bf19','第1种布局','<div class=\"cntr hid_rx\" id=\"layout0\"></div>',NULL),('c232ed09-af67-11e5-baf7-68f728f3bf19','第2种布局','<div class=\"cntr hid_rx\" id=\"layout1\">\r\n	<style>\r\n		#layout1 .cb1{width: 200px;}\r\n		#layout1 .cb2{width: 700px;}\r\n		#layout1 .cb3{width: 300px;}\r\n	</style>\r\n	\r\n</div>',NULL),('f8464c72-af67-11e5-baf7-68f728f3bf19','第3种布局','<div class=\"cntr\" id=\"layout2\">\r\n	<style>\r\n		#layout2 .cb1{width: 400px;}\r\n		#layout2 .cb2{width: 800px;}\r\n	</style>\r\n</div>','2015-12-29 16:10:21');

/*Table structure for table `c_model` */

DROP TABLE IF EXISTS `c_model`;

CREATE TABLE `c_model` (
  `id` char(36) NOT NULL,
  `content` text,
  `data_model` text COMMENT '模板需要的数据的json格式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_model` */

insert  into `c_model`(`id`,`content`,`data_model`) values ('51a8d2d1-b0f0-11e5-a998-003067b83487','<div class=\"c_model\">\r\n	<style>\r\n		.aaa ul li{float: left;}\r\n		.aaa ul li img{width: 200px;height: 170px;}\r\n	</style>\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<ul class=\"clear_rx\">\r\n			{@each model_list as it}\r\n				<li><a href=\"\"><img src=\"images/${it.imgurl}\" alt=\"${it.name}\"></a></li>\r\n			{@/each}\r\n		</ul>\r\n	</script>\r\n	<div class=\"translated aaa\"></div>\r\n</div>','[\r\n	{imgurl:\'x.jpg\',name:\'图片a\'},\r\n	{imgurl:\'y.jpg\',name:\'图片b\'},\r\n	{imgurl:\'z.jpg\',name:\'图片c\'}\r\n]');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
