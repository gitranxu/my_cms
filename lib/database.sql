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

insert  into `c_block`(`id`,`content`,`order`,`c_blocks_id`) values ('1','<div class=\"c_block c5 h200 blocks_move\"></div>',1,'7219122a-af67-11e5-baf7-68f728f3bf19'),('10','<div class=\"c_block c8 h250 blocks_move\"></div>',3,'327951f3-af67-11e5-baf7-68f728f3bf19'),('11','<div class=\"c_block c9 h200 blocks_move\"></div>',24,'4f0a4e60-af67-11e5-baf7-68f728f3bf19'),('1476e03e-b031-11e5-b189-003067b83487','<div class=\"cb1 c_block fl_rx c2 h300\"></div>',2,'86352d1d-af67-11e5-baf7-68f728f3bf19'),('25f548dc-b53f-11e5-a9bb-003067b83487','<div class=\"wrap1200 c_block c4 h200 blocks_move\"></div>',1,'feb3666e-b53e-11e5-a9bb-003067b83487'),('2c59d845-b031-11e5-b189-003067b83487','<div class=\"cb2 c_block fl_rx c15 h300\"></div>',3,'86352d1d-af67-11e5-baf7-68f728f3bf19'),('4','<div class=\"cb1 c_block fl_rx c2 h300\"></div>',2,'91834cab-af67-11e5-baf7-68f728f3bf19'),('44cc7970-b53f-11e5-a9bb-003067b83487','<div class=\"c_block c8 h250 blocks_move\"></div>',1,'32e16059-b53f-11e5-a9bb-003067b83487'),('6','<div class=\"cb3 c_block fl_rx c11 h300\"></div>',1,'91834cab-af67-11e5-baf7-68f728f3bf19'),('7','<div class=\"c_block c5 h200 blocks_move\"></div>',1,'9e0eaa3e-af67-11e5-baf7-68f728f3bf19'),('77aeb765-b53e-11e5-a9bb-003067b83487','<div class=\"cb1 c_block fl_rx c2 h300\"></div>',1,'4b1df39f-b53e-11e5-a9bb-003067b83487'),('8','<div class=\"c_block c4 h200 blocks_move\"><span>块一对于布局来说，可以设置块类型，块宽高，块边距,块最大楼层数,f_w等信息</span></div>',1,'de293ad3-af66-11e5-baf7-68f728f3bf19'),('9','<div class=\"c_block c5 h200 blocks_move\"><div>块二还可以维护布局所属终端类型</div></div>',2,'08fd8d8b-af67-11e5-baf7-68f728f3bf19'),('cb317eaf-b53f-11e5-a9bb-003067b83487','<div class=\"c_block c7 h200\"></div>',1,'a3af304c-b53f-11e5-a9bb-003067b83487'),('d22e1a4e-b53e-11e5-a9bb-003067b83487','<div class=\"cb2 c_block fl_rx c12 h300\"></div>',3,'4b1df39f-b53e-11e5-a9bb-003067b83487'),('db7acfc0-af6b-11e5-baf7-68f728f3bf19','<div class=\"cb2 c_block fl_rx c9 h300\"></div>',3,'91834cab-af67-11e5-baf7-68f728f3bf19'),('e0878447-b53f-11e5-a9bb-003067b83487','<div class=\"c_block c10 h100\" style=\"width:600px\"></div>',2,'a3af304c-b53f-11e5-a9bb-003067b83487'),('e189d867-b53e-11e5-a9bb-003067b83487','<div class=\"cb3 c_block fl_rx c17 h300\"></div>',2,'4b1df39f-b53e-11e5-a9bb-003067b83487'),('f4e890bd-b53f-11e5-a9bb-003067b83487','<div class=\"c_block c14 h150\"></div>',3,'a3af304c-b53f-11e5-a9bb-003067b83487');

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

insert  into `c_blocks`(`id`,`order`,`layout_id`,`content`) values ('08fd8d8b-af67-11e5-baf7-68f728f3bf19',4,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL),('327951f3-af67-11e5-baf7-68f728f3bf19',2,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL),('32e16059-b53f-11e5-a9bb-003067b83487',2,'097aa415-b53e-11e5-a9bb-003067b83487',NULL),('4b1df39f-b53e-11e5-a9bb-003067b83487',3,'097aa415-b53e-11e5-a9bb-003067b83487','<div class=\"wrap1200 clear_rx blocks_move\"></div>'),('4f0a4e60-af67-11e5-baf7-68f728f3bf19',3,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL),('7219122a-af67-11e5-baf7-68f728f3bf19',1,'f8464c72-af67-11e5-baf7-68f728f3bf19',NULL),('86352d1d-af67-11e5-baf7-68f728f3bf19',2,'f8464c72-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>'),('91834cab-af67-11e5-baf7-68f728f3bf19',3,'c232ed09-af67-11e5-baf7-68f728f3bf19','<div class=\"clear_rx blocks_move\"></div>'),('9e0eaa3e-af67-11e5-baf7-68f728f3bf19',6,'c232ed09-af67-11e5-baf7-68f728f3bf19',NULL),('a3af304c-b53f-11e5-a9bb-003067b83487',4,'097aa415-b53e-11e5-a9bb-003067b83487','<div class=\"xx blocks_move\">\r\n	<div class=\"wrap1200\"></div>\r\n</div>'),('de293ad3-af66-11e5-baf7-68f728f3bf19',1,'5b763f4b-af66-11e5-baf7-68f728f3bf19',NULL),('feb3666e-b53e-11e5-a9bb-003067b83487',1,'097aa415-b53e-11e5-a9bb-003067b83487',NULL);

/*Table structure for table `c_data` */

DROP TABLE IF EXISTS `c_data`;

CREATE TABLE `c_data` (
  `id` char(36) NOT NULL,
  `c_model_id` char(36) DEFAULT NULL,
  `c_floor_id` char(36) DEFAULT NULL,
  `data` text,
  `c_floor_model_id` char(72) DEFAULT NULL COMMENT 'c_floor_id在前，c_model_id在后的联合查询列，便于批量查询',
  `connect_time` datetime DEFAULT NULL COMMENT '建立关联关系的时间，取时间最新的值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_data` */

insert  into `c_data`(`id`,`c_model_id`,`c_floor_id`,`data`,`c_floor_model_id`,`connect_time`) values ('0a2477e9-b461-11e5-9d60-68f728f3bf19','bae3367f-b460-11e5-9d60-68f728f3bf19','07bb2200-b461-11e5-9c04-311336a737bb',NULL,'07bb2200-b461-11e5-9c04-311336a737bbbae3367f-b460-11e5-9d60-68f728f3bf19','2016-01-06 18:34:18'),('0d6409f3-b45f-11e5-9d60-68f728f3bf19','1729a8ac-b3a7-11e5-a091-003067b83487','0b8a8b70-b45f-11e5-a670-c7d5e12a6915',NULL,'0b8a8b70-b45f-11e5-a670-c7d5e12a69151729a8ac-b3a7-11e5-a091-003067b83487','2016-01-06 18:20:04'),('55ba57cb-b471-11e5-a674-003067b83487','1729a8ac-b3a7-11e5-a091-003067b83487','e1c614a0-b470-11e5-8a99-2f21767f8ddb',NULL,'e1c614a0-b470-11e5-8a99-2f21767f8ddb1729a8ac-b3a7-11e5-a091-003067b83487','2016-01-06 20:30:56'),('5a900a52-b42c-11e5-9d60-68f728f3bf19','51a8d2d1-b0f0-11e5-a998-003067b83487','d1c4d7c0-b42b-11e5-9e85-29c7959f4a0d','[{\"imgurl\":\"/images/upload/2.jpg\",\"name\":\"\",\"href\":\"http://www.baidu.com\",\"new_open\":\"no\",\"zone_key\":\"1aa\"},{\"imgurl\":\"/images/upload/7.jpg\",\"name\":\"\",\"href\":\"http://www.sohu.com\",\"new_open\":\"no\",\"zone_key\":\"2cc\"},{\"imgurl\":\"/images/upload/8.jpg\",\"name\":\"\",\"href\":\"http://www.hao123.com\",\"new_open\":\"no\",\"zone_key\":\"3td\"}]','d1c4d7c0-b42b-11e5-9e85-29c7959f4a0d51a8d2d1-b0f0-11e5-a998-003067b83487','2016-01-06 12:17:09'),('85a677d1-b42c-11e5-9d60-68f728f3bf19','1729a8ac-b3a7-11e5-a091-003067b83487','82c22370-b42c-11e5-b87e-c730a79e960f','[{\"imgurl\":\"/images/upload/1.jpg\",\"name\":\"\",\"href\":\"http://www.baidu.com\",\"new_open\":\"no\",\"zone_key\":\"1aa\"},{\"imgurl\":\"/images/upload/3.jpg\",\"name\":\"\",\"href\":\"http://www.sohu.com\",\"new_open\":\"no\",\"zone_key\":\"2cc\"},{\"imgurl\":\"/images/upload/5.jpg\",\"name\":\"\",\"href\":\"http://www.hao123.com\",\"new_open\":\"no\",\"zone_key\":\"3td\"},{\"imgurl\":\"/images/upload/4.jpg\",\"name\":\"\",\"href\":\"http://www.sina.com.cn\",\"new_open\":\"no\",\"zone_key\":\"4eh\"}]','82c22370-b42c-11e5-b87e-c730a79e960f1729a8ac-b3a7-11e5-a091-003067b83487','2016-01-06 12:18:21'),('e651b881-b470-11e5-a674-003067b83487','51a8d2d1-b0f0-11e5-a998-003067b83487','e1c614a0-b470-11e5-8a99-2f21767f8ddb',NULL,'e1c614a0-b470-11e5-8a99-2f21767f8ddb51a8d2d1-b0f0-11e5-a998-003067b83487','2016-01-06 20:38:09');

/*Table structure for table `c_floor` */

DROP TABLE IF EXISTS `c_floor`;

CREATE TABLE `c_floor` (
  `id` char(36) NOT NULL,
  `content` text,
  `order` int(5) NOT NULL,
  `c_block_id` char(36) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `style` varchar(80) DEFAULT 'margin-top:0px!important;margin-bottom:0px!important;' COMMENT '楼层宽度及外边距样式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_floor` */

insert  into `c_floor`(`id`,`content`,`order`,`c_block_id`,`create_time`,`style`) values ('',NULL,0,NULL,NULL,'margin-top:0px!important;margin-bottom:0px!important;width:200px!important;'),('039e04d0-b673-11e5-9a00-eb986ab4bb89','<div class=\"c_floor h200 c5\"></div>',0,'4','2016-01-09 09:48:00','margin-top:0px!important;margin-bottom:0px!important;'),('07bb2200-b461-11e5-9c04-311336a737bb','<div class=\"c_floor h200 c10\"></div>',1,'11','2016-01-06 18:34:13',NULL),('0b8a8b70-b45f-11e5-a670-c7d5e12a6915','<div class=\"c_floor h200 c9\"></div>',1,'10','2016-01-06 18:20:01',NULL),('82c22370-b42c-11e5-b87e-c730a79e960f','<div class=\"c_floor h200 c12\"></div>',1,'2c59d845-b031-11e5-b189-003067b83487','2016-01-06 12:18:17',NULL),('d1c4d7c0-b42b-11e5-9e85-29c7959f4a0d','<div class=\"c_floor h200 c14\"></div>',0,'2c59d845-b031-11e5-b189-003067b83487','2016-01-06 12:13:20',NULL),('e1c614a0-b470-11e5-8a99-2f21767f8ddb','<div class=\"c_floor h200 c12\"></div>',1,'8','2016-01-06 20:27:42',NULL),('ff6f7650-b672-11e5-9a00-eb986ab4bb89','<div class=\"c_floor h200 c7\"></div>',1,'4','2016-01-09 09:47:53','margin-top:0px!important;margin-bottom:0px!important;');

/*Table structure for table `c_layout` */

DROP TABLE IF EXISTS `c_layout`;

CREATE TABLE `c_layout` (
  `id` char(36) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `content` text NOT NULL COMMENT '布局的html',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `img_url` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_layout` */

insert  into `c_layout`(`id`,`name`,`content`,`create_time`,`img_url`) values ('097aa415-b53e-11e5-a9bb-003067b83487','第4种布局','<div class=\"cntr\" id=\"layout4\">\r\n	<style>\r\n		#layout4 .cb1{width: 200px;}\r\n		#layout4 .cb2{width: 600px;}\r\n		#layout4 .cb3{width: 400px;}\r\n		#layout4 .xx{background: #0790A5;}\r\n	</style>\r\n	\r\n</div>','2016-01-07 20:56:32','/images/upload/1.jpg'),('5b763f4b-af66-11e5-baf7-68f728f3bf19','第1种布局','<div class=\"cntr wrap1200 hid_rx\" id=\"layout0\"></div>',NULL,'/images/upload/2.jpg'),('c232ed09-af67-11e5-baf7-68f728f3bf19','第2种布局','<div class=\"cntr hid_rx wrap1200\" id=\"layout1\">\r\n	<style>\r\n		#layout1 .cb1{width: 200px;}\r\n		#layout1 .cb2{width: 700px;}\r\n		#layout1 .cb3{width: 300px;}\r\n	</style>\r\n	\r\n</div>',NULL,'/images/upload/3.jpg'),('f8464c72-af67-11e5-baf7-68f728f3bf19','第3种布局','<div class=\"cntr wrap1200\" id=\"layout2\">\r\n	<style>\r\n		#layout2 .cb1{width: 400px;}\r\n		#layout2 .cb2{width: 800px;}\r\n	</style>\r\n</div>','2015-12-29 16:10:21','/images/upload/4.jpg');

/*Table structure for table `c_model` */

DROP TABLE IF EXISTS `c_model`;

CREATE TABLE `c_model` (
  `id` char(36) NOT NULL,
  `content` text,
  `data_model` text COMMENT '模板需要的数据的json格式',
  `name` varchar(80) DEFAULT NULL,
  `type` char(1) NOT NULL DEFAULT '1' COMMENT '模板类型，1.普通html模板，2.juicer模板',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_model` */

insert  into `c_model`(`id`,`content`,`data_model`,`name`,`type`) values ('1729a8ac-b3a7-11e5-a091-003067b83487','<div class=\"c_model\">\r\n	<style>\r\n		.css_namespaceliumeiling ul li{float: left;}\r\n		.css_namespaceliumeiling ul li img{width: 140px;height: 110px;}\r\n	</style>\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<ul class=\"clear_rx\">\r\n			{@each model_list as it}\r\n				<li class=\"c_edit\" zone_key=\"${it.zone_key}\"><a href=\"${it.href}\" {@if it.new_open==\"yes\"}target=\"_blank\"{@/if}><img src=\"${it.imgurl}\" alt=\"${it.name}\"></a></li>\r\n			{@/each}\r\n		</ul>\r\n	</script>\r\n	<div class=\"translated css_namespaceliumeiling\"></div>\r\n</div>','[\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.baidu.com\",new_open:false,zone_key:\"1aa\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sohu.com\",new_open:false,zone_key:\"2cc\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.hao123.com\",new_open:true,zone_key:\"3td\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sina.com.cn\",new_open:true,zone_key:\"4eh\"}\r\n]','模板2','2'),('51a8d2d1-b0f0-11e5-a998-003067b83487','<div class=\"c_model\">\r\n	<style>\r\n		.css_namespaceshiyuanyuan ul li{float: left;}\r\n		.css_namespaceshiyuanyuan ul li img{width: 200px;height: 170px;}\r\n	</style>\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<ul class=\"clear_rx\">\r\n			{@each model_list as it}\r\n				<li class=\"c_edit\" zone_key=\"${it.zone_key}\"><a href=\"${it.href}\" {@if it.new_open==\"yes\"}target=\"_blank\"{@/if}><img src=\"${it.imgurl}\" alt=\"${it.name}\"></a></li>\r\n			{@/each}\r\n		</ul>\r\n	</script>\r\n	<div class=\"translated css_namespaceshiyuanyuan\"></div>\r\n</div>','[\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.baidu.com\",new_open:false,zone_key:\"1aa\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sohu.com\",new_open:false,zone_key:\"2cc\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.hao123.com\",new_open:true,zone_key:\"3td\"}\r\n]','模板1','2'),('bae3367f-b460-11e5-9d60-68f728f3bf19','<div class=\"c_model\">\r\n	<style>\r\n		.ccc{width:180px;height:100px;background:yellow;}\r\n	</style>\r\n	<div class=\"translated ccc\"></div>\r\n</div>',NULL,'模板3(普通)','1');

/*Table structure for table `c_page` */

DROP TABLE IF EXISTS `c_page`;

CREATE TABLE `c_page` (
  `id` char(36) NOT NULL,
  `name` varchar(80) DEFAULT NULL COMMENT '页面名称',
  `url` varchar(200) DEFAULT NULL COMMENT '页面url地址',
  `create_time` datetime DEFAULT NULL,
  `project_name` varchar(80) DEFAULT NULL COMMENT '页面所属项目名称',
  `c_layout_id` char(36) DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page` */

insert  into `c_page`(`id`,`name`,`url`,`create_time`,`project_name`,`c_layout_id`,`last_edit_time`) values ('6a7ded55-b670-11e5-828f-003067b83487','商城首页','fkmodel/project/home/index.html','2016-01-09 09:30:14','联想商城','c232ed09-af67-11e5-baf7-68f728f3bf19',NULL),('b56b45d0-b793-11e5-9ccc-296f107b23d2','ih c','aaa','2016-01-10 20:14:33','fff','c232ed09-af67-11e5-baf7-68f728f3bf19',NULL),('fa139ba0-b794-11e5-abdc-f55f41894cee','小B','aaaa','2016-01-10 20:23:38','aaaa','c232ed09-af67-11e5-baf7-68f728f3bf19',NULL);

/*Table structure for table `c_page_block` */

DROP TABLE IF EXISTS `c_page_block`;

CREATE TABLE `c_page_block` (
  `id` char(36) NOT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `c_block_id` char(36) DEFAULT NULL,
  `style` varchar(80) DEFAULT 'margin-left:0px!important;margin-right:0px!important;width:200px!important;' COMMENT '块宽度及外边距样式',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_block` */

insert  into `c_page_block`(`id`,`c_page_id`,`c_block_id`,`style`,`create_time`,`last_edit_time`) values ('0436306e-b671-11e5-828f-003067b83487','6a7ded55-b670-11e5-828f-003067b83487','4','width:200px!important;margin-left:0px!important;margin-right:0px!important;',NULL,NULL),('29c1b82c-b795-11e5-b9d3-003067b83487','fa139ba0-b794-11e5-abdc-f55f41894cee','4','margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-10 20:23:38',NULL),('29c1c979-b795-11e5-b9d3-003067b83487','fa139ba0-b794-11e5-abdc-f55f41894cee','6','margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-10 20:23:38',NULL),('29c1e05f-b795-11e5-b9d3-003067b83487','fa139ba0-b794-11e5-abdc-f55f41894cee','db7acfc0-af6b-11e5-baf7-68f728f3bf19','margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-10 20:23:38',NULL),('9bffab69-b671-11e5-828f-003067b83487','6a7ded55-b670-11e5-828f-003067b83487','6','width:300px!important;margin-left:0px!important;margin-right:0px!important;',NULL,NULL),('c22cf6a9-b671-11e5-828f-003067b83487','6a7ded55-b670-11e5-828f-003067b83487','db7acfc0-af6b-11e5-baf7-68f728f3bf19','width:700px!important;margin-left:0px!important;margin-right:0px!important;',NULL,NULL),('e519c698-b793-11e5-b9d3-003067b83487','b56b45d0-b793-11e5-9ccc-296f107b23d2','4','margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-10 20:14:33',NULL),('e5221fdc-b793-11e5-b9d3-003067b83487','b56b45d0-b793-11e5-9ccc-296f107b23d2','db7acfc0-af6b-11e5-baf7-68f728f3bf19','margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-10 20:14:33',NULL),('e5222065-b793-11e5-b9d3-003067b83487','b56b45d0-b793-11e5-9ccc-296f107b23d2','6','margin-left:0px!important;margin-right:0px!important;width:200px!important;','2016-01-10 20:14:33',NULL);

/*Table structure for table `c_page_blocks` */

DROP TABLE IF EXISTS `c_page_blocks`;

CREATE TABLE `c_page_blocks` (
  `id` char(36) NOT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `c_blocks_id` char(36) DEFAULT NULL,
  `style` varchar(80) DEFAULT 'margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;' COMMENT '块组宽度，外边距样式',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_blocks` */

insert  into `c_page_blocks`(`id`,`c_page_id`,`c_blocks_id`,`style`,`create_time`,`last_edit_time`) values ('29c19873-b795-11e5-b9d3-003067b83487','fa139ba0-b794-11e5-abdc-f55f41894cee','91834cab-af67-11e5-baf7-68f728f3bf19','margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-10 20:23:38',NULL),('29c1a78f-b795-11e5-b9d3-003067b83487','fa139ba0-b794-11e5-abdc-f55f41894cee','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-10 20:23:38',NULL),('6ff201c7-b6b4-11e5-828f-003067b83487','6a7ded55-b670-11e5-828f-003067b83487','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','width:1200px!important;margin-top:0px!important;margin-bottom:10px!important;',NULL,NULL),('8f3fb09c-b671-11e5-828f-003067b83487','6a7ded55-b670-11e5-828f-003067b83487','91834cab-af67-11e5-baf7-68f728f3bf19','width:1200px!important;margin-top:0px!important;margin-bottom:0px!important;',NULL,NULL),('e519a5fa-b793-11e5-b9d3-003067b83487','b56b45d0-b793-11e5-9ccc-296f107b23d2','91834cab-af67-11e5-baf7-68f728f3bf19','margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-10 20:14:33',NULL),('e519bb5d-b793-11e5-b9d3-003067b83487','b56b45d0-b793-11e5-9ccc-296f107b23d2','9e0eaa3e-af67-11e5-baf7-68f728f3bf19','margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;','2016-01-10 20:14:33',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
