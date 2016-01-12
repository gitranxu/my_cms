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
  `default_order` int(5) DEFAULT NULL COMMENT '块的默认顺序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_block` */

insert  into `c_block`(`id`,`content`,`c_blocks_id`,`create_time`,`default_order`) values ('0f211848-b857-11e5-8208-003067b83487','<div class=\"cb3 c_block fl_rx c11 h300\"></div>','91834cab-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:33:26',1),('25349997-b857-11e5-8208-003067b83487','<div class=\"cb2 c_block fl_rx c9 h300\"></div>','91834cab-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:33:55',2),('2c59d845-b031-11e5-b189-003067b83487','<div class=\"cb2 c_block fl_rx c15 h300\"></div>','86352d1d-af67-11e5-baf7-68f728f3bf19','2016-01-11 20:30:22',1),('420fd0b9-b857-11e5-8208-003067b83487','<div class=\"c_block c5 h200 blocks_move\"></div>','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:34:48',1),('a58973ff-b85e-11e5-8208-003067b83487','<div class=\"c_block c5 h200 blocks_move\"></div>','7219122a-af67-11e5-baf7-68f728f3bf19','2016-01-11 20:27:07',1),('eaf8632e-b856-11e5-8208-003067b83487','<div class=\"cb1 c_block fl_rx c2 h300\"></div>','91834cab-af67-11e5-baf7-68f728f3bf19','2016-01-11 19:32:50',3),('fc4145b2-b85e-11e5-8208-003067b83487','<div class=\"cb1 c_block fl_rx c2 h300\"></div>','86352d1d-af67-11e5-baf7-68f728f3bf19','2016-01-11 20:29:34',2);

/*Table structure for table `c_blocks` */

DROP TABLE IF EXISTS `c_blocks`;

CREATE TABLE `c_blocks` (
  `id` char(36) NOT NULL,
  `content` text,
  `c_layout_id` char(36) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `default_order` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_blocks` */

insert  into `c_blocks`(`id`,`content`,`c_layout_id`,`create_time`,`default_order`) values ('7219122a-af67-11e5-baf7-68f728f3bf19',NULL,'60f01bfd-b841-11e5-a0bb-68f728f3bf19','2016-01-11 20:26:00',1),('86352d1d-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>','60f01bfd-b841-11e5-a0bb-68f728f3bf19','2016-01-11 20:28:33',2),('91834cab-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','2016-01-11 19:29:36',1),('9e0eaa3e-af67-11e5-baf7-68f728f3bf19',NULL,'2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','2016-01-11 19:29:56',2);

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

insert  into `c_data`(`id`,`c_model_id`,`c_floor_id`,`c_floor_model_id`,`data`,`connect_time`) values ('1569815f-b916-11e5-ab10-68f728f3bf19','1729a8ac-b3a7-11e5-a091-003067b83487','664aa2c0-b914-11e5-8b70-9d643bcef57d','664aa2c0-b914-11e5-8b70-9d643bcef57d1729a8ac-b3a7-11e5-a091-003067b83487',NULL,'2016-01-12 18:21:10'),('167338a8-b92b-11e5-94eb-003067b83487','1729a8ac-b3a7-11e5-a091-003067b83487','bc9255e0-b92a-11e5-8a82-6175a5d924c6','bc9255e0-b92a-11e5-8a82-6175a5d924c61729a8ac-b3a7-11e5-a091-003067b83487',NULL,'2016-01-12 20:50:41'),('2f547105-b916-11e5-ab10-68f728f3bf19','51a8d2d1-b0f0-11e5-a998-003067b83487','664aa2c0-b914-11e5-8b70-9d643bcef57d','664aa2c0-b914-11e5-8b70-9d643bcef57d51a8d2d1-b0f0-11e5-a998-003067b83487','[{\"imgurl\":\"/images/sys/default128X128.jpg\",\"name\":\"默认图片\",\"href\":\"http://www.baidu.com\",\"new_open\":false,\"zone_key\":\"1aa\"},{\"imgurl\":\"/images/upload/5.jpg\",\"name\":\"\",\"href\":\"http://www.sohu.com\",\"new_open\":\"yes\",\"zone_key\":\"2cc\"},{\"imgurl\":\"/images/sys/default128X128.jpg\",\"name\":\"默认图片\",\"href\":\"http://www.hao123.com\",\"new_open\":true,\"zone_key\":\"3td\"}]','2016-01-12 18:21:12'),('318816c3-b916-11e5-ab10-68f728f3bf19','bae3367f-b460-11e5-9d60-68f728f3bf19','664aa2c0-b914-11e5-8b70-9d643bcef57d','664aa2c0-b914-11e5-8b70-9d643bcef57dbae3367f-b460-11e5-9d60-68f728f3bf19',NULL,'2016-01-12 18:21:08'),('5b209fb1-b929-11e5-94eb-003067b83487','1729a8ac-b3a7-11e5-a091-003067b83487','undefined','undefined1729a8ac-b3a7-11e5-a091-003067b83487',NULL,'2016-01-12 20:38:17'),('899682c8-b928-11e5-94eb-003067b83487','51a8d2d1-b0f0-11e5-a998-003067b83487','7c3ad910-b928-11e5-8087-03c5c606ffcb','7c3ad910-b928-11e5-8087-03c5c606ffcb51a8d2d1-b0f0-11e5-a998-003067b83487',NULL,'2016-01-12 20:32:26'),('8b87d944-b928-11e5-94eb-003067b83487','1729a8ac-b3a7-11e5-a091-003067b83487','7c3ad910-b928-11e5-8087-03c5c606ffcb','7c3ad910-b928-11e5-8087-03c5c606ffcb1729a8ac-b3a7-11e5-a091-003067b83487',NULL,'2016-01-12 20:32:29');

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

insert  into `c_floor`(`id`,`content`,`c_block_id`,`create_time`) values ('3eaf4d50-b901-11e5-bf20-e782aec63d74','<div class=\"c_floor h200 c11\"></div>','fc4145b2-b85e-11e5-8208-003067b83487','2016-01-12 15:51:10'),('41614df0-b901-11e5-bf20-e782aec63d74','<div class=\"c_floor h200 c12\"></div>','fc4145b2-b85e-11e5-8208-003067b83487','2016-01-12 15:51:14'),('649e82c0-b8fb-11e5-9c9e-099525a01bc3','<div class=\"c_floor h200 c13\"></div>','2c59d845-b031-11e5-b189-003067b83487','2016-01-12 15:09:16'),('664aa2c0-b914-11e5-8b70-9d643bcef57d','<div class=\"c_floor h200 c14\"></div>','fc4145b2-b85e-11e5-8208-003067b83487','2016-01-12 18:08:17'),('667c9190-b8fb-11e5-9c9e-099525a01bc3','<div class=\"c_floor h200 c15\"></div>','2c59d845-b031-11e5-b189-003067b83487','2016-01-12 15:09:20'),('6990d670-b8fb-11e5-9c9e-099525a01bc3','<div class=\"c_floor h200 c16\"></div>','2c59d845-b031-11e5-b189-003067b83487','2016-01-12 15:09:25'),('bc9255e0-b92a-11e5-8a82-6175a5d924c6','<div class=\"c_floor h200 c15\"></div>','fc4145b2-b85e-11e5-8208-003067b83487','2016-01-12 20:48:10'),('c012eff0-b910-11e5-9a4e-8f0bc3cd6a2f','<div class=\"c_floor h200 c17\"></div>','0f211848-b857-11e5-8208-003067b83487','2016-01-12 17:42:09');

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

insert  into `c_model`(`id`,`name`,`content`,`data_model`,`img_url`,`type`,`create_time`,`last_edit_time`) values ('1729a8ac-b3a7-11e5-a091-003067b83487','模板2','<div class=\"c_model\">\r\n	<style>\r\n		.css_namespaceliumeiling ul li{float: left;}\r\n		.css_namespaceliumeiling ul li img{width: 140px;height: 110px;}\r\n	</style>\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<ul class=\"clear_rx\">\r\n			{@each model_list as it}\r\n				<li class=\"c_edit\" zone_key=\"${it.zone_key}\"><a href=\"${it.href}\" {@if it.new_open==\"yes\"}target=\"_blank\"{@/if}><img src=\"${it.imgurl}\" alt=\"${it.name}\"></a></li>\r\n			{@/each}\r\n		</ul>\r\n	</script>\r\n	<div class=\"translated css_namespaceliumeiling\"></div>\r\n</div>','[\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.baidu.com\",new_open:false,zone_key:\"1aa\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sohu.com\",new_open:false,zone_key:\"2cc\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.hao123.com\",new_open:true,zone_key:\"3td\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sina.com.cn\",new_open:true,zone_key:\"4eh\"}\r\n]',NULL,2,'2016-01-12 17:40:56','2016-01-12 17:40:58'),('51a8d2d1-b0f0-11e5-a998-003067b83487','模板1','<div class=\"c_model\">\r\n	<style>\r\n		.css_namespaceshiyuanyuan ul li{float: left;}\r\n		.css_namespaceshiyuanyuan ul li img{width: 200px;height: 170px;}\r\n	</style>\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<ul class=\"clear_rx\">\r\n			{@each model_list as it}\r\n				<li class=\"c_edit\" zone_key=\"${it.zone_key}\"><a href=\"${it.href}\" {@if it.new_open==\"yes\"}target=\"_blank\"{@/if}><img src=\"${it.imgurl}\" alt=\"${it.name}\"></a></li>\r\n			{@/each}\r\n		</ul>\r\n	</script>\r\n	<div class=\"translated css_namespaceshiyuanyuan\"></div>\r\n</div>','[\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.baidu.com\",new_open:false,zone_key:\"1aa\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sohu.com\",new_open:false,zone_key:\"2cc\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.hao123.com\",new_open:true,zone_key:\"3td\"}\r\n]',NULL,2,'2016-01-12 17:38:35','2016-01-12 17:38:37'),('bae3367f-b460-11e5-9d60-68f728f3bf19','模板3(普通)','<div class=\"c_model\">\r\n	<style>\r\n		.ccc{width:180px;height:100px;background:yellow;}\r\n	</style>\r\n	<div class=\"translated ccc\"></div>\r\n</div>',NULL,NULL,1,'2016-01-12 17:41:42','2016-01-12 17:41:43');

/*Table structure for table `c_page` */

DROP TABLE IF EXISTS `c_page`;

CREATE TABLE `c_page` (
  `id` char(36) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page` */

insert  into `c_page`(`id`,`name`,`create_time`) values ('0a837a20-b8dd-11e5-9489-5bbed8ab9e88','页面十','2016-01-12 11:32:00'),('0ee8a300-b91f-11e5-8066-1f0433d754c2','第二个页面','2016-01-12 19:24:34'),('296c2940-b8d4-11e5-895b-d98c6716cd3a','test2','2016-01-12 10:28:27'),('3459a000-b8d2-11e5-8af0-6784fb279264','test','2016-01-12 10:14:26'),('3ad91ea0-b86a-11e5-8d14-01dbcdd8712f','页面四','2016-01-11 21:50:09'),('5b8be980-b8dc-11e5-b2a1-c30c31e1bd41','页页面产','2016-01-12 11:27:07'),('72b10ca0-b90c-11e5-8b1d-056140831062','第一个页面','2016-01-12 17:11:21'),('83ddb850-b8dc-11e5-bc09-235f66f3d6ed','aaaa','2016-01-12 11:28:14'),('9d224bc0-b8da-11e5-9174-05e19784a36e','test3','2016-01-12 11:14:38'),('a19d4dab-b840-11e5-a0bb-68f728f3bf19','页面一','2016-01-11 16:53:03'),('a8398ee0-b85a-11e5-a707-5bfd3c677619','页面三','2016-01-11 19:58:41'),('b57e5e80-b8d9-11e5-9d2a-b9e1e7fce42d','页面t','2016-01-12 11:08:09'),('b71e304c-b840-11e5-a0bb-68f728f3bf19','页面二','2016-01-11 16:53:30');

/*Table structure for table `c_page_block` */

DROP TABLE IF EXISTS `c_page_block`;

CREATE TABLE `c_page_block` (
  `id` char(36) NOT NULL,
  `c_block_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `style` varchar(100) DEFAULT 'margin-left:0px!important;margin-right:0px!important;width:200px!important;',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_block` */

insert  into `c_page_block`(`id`,`c_block_id`,`c_page_id`,`order`,`style`,`create_time`,`last_edit_time`) values ('0eee422f-b91f-11e5-94eb-003067b83487','0f211848-b857-11e5-8208-003067b83487','0ee8a300-b91f-11e5-8066-1f0433d754c2',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 19:24:35','2016-01-12 19:24:35'),('0eeeeece-b91f-11e5-94eb-003067b83487','eaf8632e-b856-11e5-8208-003067b83487','0ee8a300-b91f-11e5-8066-1f0433d754c2',3,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 19:24:35','2016-01-12 19:24:35'),('0ef57f48-b91f-11e5-94eb-003067b83487','420fd0b9-b857-11e5-8208-003067b83487','0ee8a300-b91f-11e5-8066-1f0433d754c2',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 19:24:35','2016-01-12 19:24:35'),('0ef57f83-b91f-11e5-94eb-003067b83487','25349997-b857-11e5-8208-003067b83487','0ee8a300-b91f-11e5-8066-1f0433d754c2',2,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 19:24:35','2016-01-12 19:24:35'),('499186d9-b912-11e5-ab10-68f728f3bf19','a58973ff-b85e-11e5-8208-003067b83487','72b10ca0-b90c-11e5-8b1d-056140831062',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 17:53:10','2016-01-12 17:53:10'),('49929ab2-b912-11e5-ab10-68f728f3bf19','2c59d845-b031-11e5-b189-003067b83487','72b10ca0-b90c-11e5-8b1d-056140831062',1,'width:500px!important;margin-left:0px!important;margin-right:0px!important;','2016-01-12 17:53:10','2016-01-12 17:53:10'),('49932cfc-b912-11e5-ab10-68f728f3bf19','fc4145b2-b85e-11e5-8208-003067b83487','72b10ca0-b90c-11e5-8b1d-056140831062',2,'width:700px!important;margin-left:0px!important;margin-right:0px!important;','2016-01-12 17:53:10','2016-01-12 17:53:10'),('727460ca-b90c-11e5-ab10-68f728f3bf19','25349997-b857-11e5-8208-003067b83487','72b10ca0-b90c-11e5-8b1d-056140831062',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 17:11:21','2016-01-12 17:11:21'),('72756a0f-b90c-11e5-ab10-68f728f3bf19','eaf8632e-b856-11e5-8208-003067b83487','72b10ca0-b90c-11e5-8b1d-056140831062',3,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 17:11:21','2016-01-12 17:11:21'),('72756a42-b90c-11e5-ab10-68f728f3bf19','420fd0b9-b857-11e5-8208-003067b83487','72b10ca0-b90c-11e5-8b1d-056140831062',1,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 17:11:21','2016-01-12 17:11:21'),('7275721b-b90c-11e5-ab10-68f728f3bf19','0f211848-b857-11e5-8208-003067b83487','72b10ca0-b90c-11e5-8b1d-056140831062',2,'margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-12 17:11:21','2016-01-12 17:11:21');

/*Table structure for table `c_page_blocks` */

DROP TABLE IF EXISTS `c_page_blocks`;

CREATE TABLE `c_page_blocks` (
  `id` char(36) NOT NULL,
  `c_blocks_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `style` varchar(100) DEFAULT 'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_blocks` */

insert  into `c_page_blocks`(`id`,`c_blocks_id`,`c_page_id`,`order`,`style`,`create_time`,`last_edit_time`) values ('0eeddac1-b91f-11e5-94eb-003067b83487','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','0ee8a300-b91f-11e5-8066-1f0433d754c2',2,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-12 19:24:35','2016-01-12 19:24:35'),('0ef58368-b91f-11e5-94eb-003067b83487','91834cab-af67-11e5-baf7-68f728f3bf19','0ee8a300-b91f-11e5-8066-1f0433d754c2',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-12 19:24:35','2016-01-12 19:24:35'),('49907631-b912-11e5-ab10-68f728f3bf19','7219122a-af67-11e5-baf7-68f728f3bf19','72b10ca0-b90c-11e5-8b1d-056140831062',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-12 17:53:10','2016-01-12 17:53:10'),('49921418-b912-11e5-ab10-68f728f3bf19','86352d1d-af67-11e5-baf7-68f728f3bf19','72b10ca0-b90c-11e5-8b1d-056140831062',2,'width:1200px!important;margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 17:53:10','2016-01-12 17:53:10'),('7273c160-b90c-11e5-ab10-68f728f3bf19','91834cab-af67-11e5-baf7-68f728f3bf19','72b10ca0-b90c-11e5-8b1d-056140831062',2,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-12 17:11:21','2016-01-12 17:11:21'),('7273f952-b90c-11e5-ab10-68f728f3bf19','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','72b10ca0-b90c-11e5-8b1d-056140831062',1,'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-12 17:11:21','2016-01-12 17:11:21');

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

insert  into `c_page_floor`(`id`,`c_floor_id`,`c_page_id`,`order`,`style`,`create_time`,`last_edit_time`) values ('3e57a303-b901-11e5-ab10-68f728f3bf19','3eaf4d50-b901-11e5-bf20-e782aec63d74','83ddb850-b8dc-11e5-bc09-235f66f3d6ed',1,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 15:51:10','2016-01-12 15:51:10'),('41094610-b901-11e5-ab10-68f728f3bf19','41614df0-b901-11e5-bf20-e782aec63d74','83ddb850-b8dc-11e5-bc09-235f66f3d6ed',0,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 15:51:14','2016-01-12 15:51:14'),('6453bba3-b8fb-11e5-ab10-68f728f3bf19','649e82c0-b8fb-11e5-9c9e-099525a01bc3','0a837a20-b8dd-11e5-9489-5bbed8ab9e88',0,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 15:09:16','2016-01-12 15:09:16'),('65e20054-b914-11e5-ab10-68f728f3bf19','664aa2c0-b914-11e5-8b70-9d643bcef57d','72b10ca0-b90c-11e5-8b1d-056140831062',1,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 18:08:17','2016-01-12 21:26:34'),('66305246-b8fb-11e5-ab10-68f728f3bf19','667c9190-b8fb-11e5-9c9e-099525a01bc3','0a837a20-b8dd-11e5-9489-5bbed8ab9e88',2,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 15:09:20','2016-01-12 15:09:20'),('694458da-b8fb-11e5-ab10-68f728f3bf19','6990d670-b8fb-11e5-9c9e-099525a01bc3','0a837a20-b8dd-11e5-9489-5bbed8ab9e88',1,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 15:09:25','2016-01-12 15:09:25'),('bc93dc06-b92a-11e5-94eb-003067b83487','bc9255e0-b92a-11e5-8a82-6175a5d924c6','72b10ca0-b90c-11e5-8b1d-056140831062',0,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 20:48:10','2016-01-12 21:26:45'),('bfb8c224-b910-11e5-ab10-68f728f3bf19','c012eff0-b910-11e5-9a4e-8f0bc3cd6a2f','72b10ca0-b90c-11e5-8b1d-056140831062',1,'margin-top:0px!important;margin-bottom:0px!important;','2016-01-12 17:42:09','2016-01-12 17:42:09');

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

insert  into `c_page_layout`(`id`,`c_layout_id`,`c_page_id`,`url`,`project_name`,`create_time`,`last_edit_time`) values ('0eeb4633-b91f-11e5-94eb-003067b83487','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','0ee8a300-b91f-11e5-8066-1f0433d754c2','aaaa','aaaa','2016-01-12 19:24:34','2016-01-12 19:24:34'),('498f1e73-b912-11e5-ab10-68f728f3bf19','60f01bfd-b841-11e5-a0bb-68f728f3bf19','72b10ca0-b90c-11e5-8b1d-056140831062','2','2','2016-01-12 17:53:10','2016-01-12 18:08:11'),('7272cd24-b90c-11e5-ab10-68f728f3bf19','2e2ebb2c-b841-11e5-a0bb-68f728f3bf19','72b10ca0-b90c-11e5-8b1d-056140831062','/pc-common/home/index.html','pc商城','2016-01-12 17:11:21','2016-01-12 18:04:55');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
