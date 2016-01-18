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
  `default_order` int(5) DEFAULT NULL COMMENT '块的默认顺序',
  `default_style` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_block` */

insert  into `c_block`(`id`,`content`,`c_blocks_id`,`create_time`,`default_order`,`default_style`) values ('1561ad81-bcdf-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c2\"></div>','1561ad80-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',1,'width:50%!important;'),('1561ad82-bcdf-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c3\"></div>','1561ad80-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',2,'width:50%!important;'),('1561ad84-bcdf-11e5-a880-79053797b1e5','<div class=\"c_block h300 c6\"></div>','1561ad83-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',1,NULL),('1561ad86-bcdf-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c4\"></div>','1561ad85-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',1,'width:50%!important;'),('1561ad87-bcdf-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c5\"></div>','1561ad85-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',2,'width:50%!important;'),('81d21010-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c2\"></div>','81d1e901-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',1,'width:33%!important;'),('81d21011-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c3\"></div>','81d1e901-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',2,'width:33%!important;'),('81d21012-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c4\"></div>','81d1e901-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',3,'width:33%!important;'),('81d28540-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c15\"></div>','81d21013-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',1,'width:33%!important;'),('81d28541-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c17\"></div>','81d21013-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',2,'width:33%!important;'),('81d2ac50-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c18\"></div>','81d21013-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',3,'width:33%!important;'),('9b03d772-bcde-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c15\"></div>','9b03d771-bcde-11e5-a880-79053797b1e5','2016-01-17 13:53:17',1,'width:50%!important;'),('9b03d773-bcde-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c3\"></div>','9b03d771-bcde-11e5-a880-79053797b1e5','2016-01-17 13:53:17',2,'width:50%!important;'),('9c031472-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c2\"></div>','9c031471-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',1,'width:33%!important;'),('9c031473-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c3\"></div>','9c031471-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',2,'width:33%!important;'),('9c031474-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c4\"></div>','9c031471-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',3,'width:33%!important;'),('9c033b80-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c15\"></div>','9c031475-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',1,'width:33%!important;'),('9c033b81-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c17\"></div>','9c031475-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',2,'width:33%!important;'),('9c033b82-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c18\"></div>','9c031475-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',3,'width:33%!important;'),('9c033b84-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c3\"></div>','9c033b83-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',1,'width:33%!important;'),('9c036290-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c4\"></div>','9c033b83-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',2,'width:33%!important;'),('9c036291-bcdd-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c1\"></div>','9c033b83-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',3,'width:33%!important;'),('da0d2630-bcdc-11e5-a880-79053797b1e5','<div class=\"c_block h300 c18\"></div>','da0cff20-bcdc-11e5-a880-79053797b1e5','2016-01-17 13:40:44',1,NULL),('f9aefd11-bcdc-11e5-a880-79053797b1e5','<div class=\"c_block h300 c18\"></div>','f9aefd10-bcdc-11e5-a880-79053797b1e5','2016-01-17 13:41:37',1,NULL),('f9aefd13-bcdc-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c2\"></div>','f9aefd12-bcdc-11e5-a880-79053797b1e5','2016-01-17 13:41:37',1,'width:50%!important;'),('f9aefd14-bcdc-11e5-a880-79053797b1e5','<div class=\"c_block fl_rx h300 c3\"></div>','f9aefd12-bcdc-11e5-a880-79053797b1e5','2016-01-17 13:41:37',2,'width:50%!important;');

/*Table structure for table `c_blocks` */

DROP TABLE IF EXISTS `c_blocks`;

CREATE TABLE `c_blocks` (
  `id` char(36) NOT NULL,
  `content` text,
  `c_layout_id` char(36) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `default_order` int(5) DEFAULT NULL,
  `default_style` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_blocks` */

insert  into `c_blocks`(`id`,`content`,`c_layout_id`,`create_time`,`default_order`,`default_style`) values ('1561ad80-bcdf-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','15613850-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',1,NULL),('1561ad83-bcdf-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','15613850-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',2,NULL),('1561ad85-bcdf-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','15613850-bcdf-11e5-a880-79053797b1e5','2016-01-17 13:56:42',3,NULL),('81d1e901-bcdd-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','81d1e900-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',1,NULL),('81d21013-bcdd-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','81d1e900-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:45:25',2,NULL),('9b03d771-bcde-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','9b03d770-bcde-11e5-a880-79053797b1e5','2016-01-17 13:53:17',1,NULL),('9c031471-bcdd-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','9c031470-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',1,NULL),('9c031475-bcdd-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','9c031470-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',2,NULL),('9c033b83-bcdd-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','9c031470-bcdd-11e5-a880-79053797b1e5','2016-01-17 13:46:09',3,NULL),('da0cff20-bcdc-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','da0cb100-bcdc-11e5-a880-79053797b1e5','2016-01-17 13:40:44',1,NULL),('f9aefd10-bcdc-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','f9aed600-bcdc-11e5-a880-79053797b1e5','2016-01-17 13:41:37',1,NULL),('f9aefd12-bcdc-11e5-a880-79053797b1e5','<div class=\"clear_rx blocks_move wrap1200\"></div>','f9aed600-bcdc-11e5-a880-79053797b1e5','2016-01-17 13:41:37',2,NULL);

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

/*Table structure for table `c_generate_html_config` */

DROP TABLE IF EXISTS `c_generate_html_config`;

CREATE TABLE `c_generate_html_config` (
  `id` char(36) NOT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `c_layout_id` char(36) DEFAULT NULL,
  `page_url` varchar(100) DEFAULT NULL COMMENT '正式地址',
  `prev_view_url` varchar(100) DEFAULT NULL COMMENT '预览地址',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_generate_html_config` */

/*Table structure for table `c_layout` */

DROP TABLE IF EXISTS `c_layout`;

CREATE TABLE `c_layout` (
  `id` char(36) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `content` text,
  `img_data` varchar(5800) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `edit_model` text COMMENT '布局的编辑模型',
  `last_edit_time` datetime DEFAULT NULL,
  `valid` int(1) DEFAULT '1' COMMENT '1:合法，2:禁用',
  `type` int(1) DEFAULT '2' COMMENT '1:系统布局，2:用户定义',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_layout` */

insert  into `c_layout`(`id`,`name`,`content`,`img_data`,`create_time`,`edit_model`,`last_edit_time`,`valid`,`type`) values ('15613850-bcdf-11e5-a880-79053797b1e5','五宫格布局','<div class=\"cntr\"></div>','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB4CAYAAAC3kr3rAAAEE0lEQVR4Xu3dobWWZxQFYVCUkA7SQlwawQURR3xkSsAjEdSApAQUJcTHk3VrmE/sdXiu32fdd+Yf/b1+9fDfb9/+/vHwyZ/q3J9vfvmp3vv0Y//49a/XT9589NjLPyaQpkcgjZ9AGr/5tUCaIoE0fvNrgTRFAmn85tcCaYoE0vjNrwXSFAmk8ZtfC6QpEkjjN78WSFMkkMZvfi2Qpkggjd/8WiBNkUAav/m1QJoigTR+82uBNEUCafzm1wJpigTS+M2vBdIUCaTxm18LpCkSSOM3vxZIUySQxm9+LZCmSCCN3/xaIE2RQBq/+bVAmiKBNH7za4E0RQJp/ObXAmmKBNL4za8F0hQJpPGbXwukKRJI4ze/FkhTJJDGb34tkKZIII3f/FogTZFAGr/5tUCaIoE0fvNrgTRFAmn85tcCaYoE0vjNrwXSFAmk8ZtfC6QpEkjjN78WSFMkkMZvfi2Qpkggjd/8WiBNkUAav/m1QJoigTR+82uBNEUCafzm1wJpigTS+M2vBdIUCaTxm18LpCkSSOM3vxZIUzQfyKePH3wnvTm2DgTevnv/6KfNHz328i6BBLummYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJCCQjdOAyAYFctuttmYBAMkIHLhMQyGW73pYJzAfy5d93vpMeNH/9/jmsTf/5/b9HP23+6LEXPQJpP1KBNH4Cafzm1wJpigTS+M2vBdIUCaTxm18LpCkSSOM3vxZIUySQxm9+LZCmSCCN3/xaIE2RQBq/+bVAmiKBNH7za4E0RQJp/ObXAmmKBNL4za8F0hQJpPGbXwukKRJI4ze/FkhTJJDGb34tkKZIII3f/FogTZFAGr/5tUCaIoE0fvNrgTRFAmn85tcCaYoE0vjNrwXSFAmk8ZtfC6QpEkjjN78WSFMkkMZvfi2Qpkggjd/8WiBNkUAav/m1QJoigTR+82uBNEUCafzm1wJpigTS+M2vBdIUCaTxm18LpCkSSOM3vxZIUySQxm9+LZCmSCCN3/xaIE2RQBq/+bVAmiKBNH7za4E0RQJp/ObXAmmKBNL4za8F0hQJpPGbXwukKRJI4ze/FkhTJJDGb34tkKZIII3f/FogTdHTgfwPbuFYl2Obwk8AAAAASUVORK5CYII=','2016-01-17 13:56:42','\n                <div class=\"cntr\">\n                    \n                <div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c2\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c3\"><div class=\"need_remove del_btn\">删除</div></div></div><div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block h300 c6\"><div class=\"need_remove del_btn\">删除</div></div></div><div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c4\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c5\"><div class=\"need_remove del_btn\">删除</div></div></div></div>\n                <div class=\"hint_info\">请拖动【A,B,C,D】至这里进行编辑(变绿时释放鼠标)</div>\n        	','2016-01-17 13:56:42',1,1),('81d1e900-bcdd-11e5-a880-79053797b1e5','六宫格布局','<div class=\"cntr\"></div>','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABQCAYAAABcbTqwAAADtUlEQVR4Xu2dsW0QURQEuYiM1BFdIFEBtSBKgBTRgwMiAmogpAAnCAJqIKUAcAEOVqvdv7I1jvftO488/qef3PUs/PP654d/4cp53dvnN/NniD7Add29fPHjVbRzWnbdvrn5/K7xCFe6FEHSRAt9CCJDRRABFSeIAGka4QSZ4keQKX5hOYIIkHoRBOmxzTQjSIaj2YIgJrhjYwhyDPVDixBkil9YjiACpF4EQXpsM80IkuFotiCICe7YGIIcQ80r1hS1uRxBTHCZMU6QDMdeC4L02ArNCCJAmkYQZIofQab4heUIIkDqRRCkxzbTjCAZjmYLgpjgjo0hyDHU3GJNUZvLEcQElxnjBMlw7LUgSI+t0IwgAqRpBEGm+BFkil9YjiACpF4EQXpsM80IkuFotiCICe7YGIIcQ80t1hS1uRxBTHCZMU6QDMdeC4L02ArNCCJAmkYQZIofQab4heUIIkDqRRCkxzbTjCAZjmYLgpjgjo0hyDHU3GJNUZvLEcQElxnjBMlw7LUgSI+t0IwgAqRpBEGm+BFkil9YjiACpF4EQXpsM80IkuFotiCICe7YGIIcQ80t1hS1uRxBTHCZMU6QDMdeC4L02ArNCCJAmkYQZIofQab4heUIIkDqRRCkxzbTjCAZjmYLgpjgjo0hyDHU3GJNUZvLH5Egv99/fHLfSf/z9wl9Uvz+T/D+08Z33359eUK/1HX76fvXx/GddAQx/wkeHEMQHXb8O+kIosNfJRFEJ48gAitesQRI0wivWFP8CDLFLyxHEAFSL4IgPbaZZgTJcDRbEMQEd2wMQY6hfmgRgkzxC8sRRIDUiyBIj22mGUEyHM0WBDHBHRtDkGOoecWaojaXI4gJLjPGCZLh2GtBkB5boRlBBEjTCIJM8SPIFL+wHEEESL0IgvTYZpoRJMPRbEEQE9yxMQQ5hppbrClqczmCmOAyY5wgGY69FgTpsRWaEUSANI0gyBQ/gkzxC8sRRIDUiyBIj22mGUEyHM0WBDHBHRtDkGOoucWaojaXI4gJLjPGCZLh2GtBkB5boRlBBEjTCIJM8SPIFL+wHEEESL0IgvTYZpoRJMPRbEEQE9yxMQQ5hppbrClqczmCmOAyY5wgGY69FgTpsRWaEUSANI0gyBQ/gkzxC8sRRIDUiyBIj22mGUEyHM0WBDHBHRtDkGOoucWaojaXI4gJLjPGCZLh2GtBkB5boRlBBEjTCIJM8SPIFL+wHEEESL0IgvTYZpoRJMPRbEEQE9yxsZ4g/wHqm9Bv8dhBjwAAAABJRU5ErkJggg==','2016-01-17 13:45:25','\n                <div class=\"cntr\">\n                    \n                <div class=\"clear_rx blocks_move wrap1200\" style=\"\n    /* display: none; */\n\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c2\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c3\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c4\"><div class=\"need_remove del_btn\">删除</div></div></div><div class=\"clear_rx blocks_move wrap1200\" style=\"\n    /* display: none; */\n\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c15\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c17\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c18\"><div class=\"need_remove del_btn\">删除</div></div></div></div>\n                <div class=\"hint_info\">请拖动【A,B,C,D】至这里进行编辑(变绿时释放鼠标)</div>\n        	','2016-01-17 13:45:25',1,1),('9b03d770-bcde-11e5-a880-79053797b1e5','中分布局','<div class=\"cntr\"></div>','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAYAAAC7HLUcAAABh0lEQVR4Xu3TwW0CQRREQUiAMJyXScBnzs6NGMjGyDG8ObRE7b2/drpV18vh7/X4/Tt88qPOPb9vH/Xe04+9f/1cT948euz/xwBp8wDS+gOk9TefBqRNBEjrbz4NSJsIkNbffBqQNhEgrb/5NCBtIkBaf/NpQNpEgLT+5tOAtIkAaf3NpwFpEwHS+ptPA9ImAqT1N58GpE0ESOtvPg1ImwiQ1t98GpA2ESCtv/k0IG0iQFp/82lA2kSAtP7m04C0iQBp/c2nAWkTAdL6m08D0iYCpPU3nwakTQRI628+DUibCJDW33wakDYRIK2/+TQgbSJAWn/zaUDaRIC0/ubTgLSJAGn9zacBaRMB0vqbTwPSJgKk9TefBqRNBEjrbz4NSJsIkNbffBqQNhEgrb/5NCBtIkBaf/NpQNpEgLT+5tOAtIkAaf3NpwFpEwHS+ptPA9ImAqT1N58GpE0ESOtvPg1ImwiQ1t98GpA2ESCtv/k0IG0iQFp/82lA2kSAtP7m04C0iU4DeQN4UMgp3PH7cgAAAABJRU5ErkJggg==','2016-01-17 13:53:17','\n                <div class=\"cntr\">\n                    \n                <div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c15\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c3\"><div class=\"need_remove del_btn\">删除</div></div></div></div>\n                <div class=\"hint_info\">请拖动【A,B,C,D】至这里进行编辑(变绿时释放鼠标)</div>\n        	','2016-01-17 13:53:17',1,1),('9c031470-bcdd-11e5-a880-79053797b1e5','九宫格布局','<div class=\"cntr\"></div>','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB4CAYAAAC3kr3rAAAFNElEQVR4Xu2dLW5WARBFeQoHsgrLCkhYAQtBEQSWBCxhAbgKgkAQloBkATX8CILFYVkAFN+Em+HO3OmXg56fcm5P5+WZd9ww/7v/5flv88j4uEc3z+I/g/UHOI6LO7c+3bPOjA47zh+cvX7c8SMc7qEI4ibaMA9BZKgIIqDiggiQoiVckCh+BIniF5YjiACprwRB+th6JiOIh2NxCoIUwY21IcgY6qsWIUgUv7AcQQRIfSUI0sfWMxlBPByLUxCkCG6sDUHGUPOIFUVdXI4gRXCeNi6Ih2PfFATpYytMRhABUrQEQaL4ESSKX1iOIAKkvhIE6WPrmYwgHo7FKQhSBDfWhiBjqHmLFUVdXI4gRXCeNi6Ih2PfFATpYytMRhABUrQEQaL4ESSKX1iOIAKkvhIE6WPrmYwgHo7FKQhSBDfWhiBjqHmLFUVdXI4gRXCeNi6Ih2PfFATpYytMRhABUrQEQaL4ESSKX1iOIAKkvhIE6WPrmYwgHo7FKQhSBDfWhiBjqHmLFUVdXI4gRXCeNi6Ih2PfFATpYytMRhABUrQEQaL4ESSKX1iOIAKkvhIE6WPrmYwgHo7FKQhSBDfWhiBjqHmLFUVdXI4gRXCeNi6Ih2PfFATpYytMRhABUrQEQaL4ESSKX1iOIAKkvhIE6WPrmYwgHo7FKQhSBDfWhiBjqHmLFUVdXH6NBPn27MXJfSf9568T+qT45a/g5aeNLz58fXtC/6nj/OXHd9fjO+kIUvwjONiGIDps+3fSEUSHn6pEEJ08ggiseMQSIEVLeMSK4keQKH5hOYIIkPpKEKSPrWcygng4FqcgSBHcWBuCjKG+ahGCRPELyxFEgNRXgiB9bD2TEcTDsTgFQYrgxtoQZAw1j1hR1MXlCFIE52njgng49k1BkD62wmQEESBFSxAkih9BoviF5QgiQOorQZA+tp7JCOLhWJyCIEVwY20IMoaat1hR1MXlCFIE52njgng49k1BkD62wmQEESBFSxAkih9BoviF5QgiQOorQZA+tp7JCOLhWJyCIEVwY20IMoaat1hR1MXlCFIE52njgng49k1BkD62wmQEESBFSxAkih9BoviF5QgiQOorQZA+tp7JCOLhWJyCIEVwY20IMoaat1hR1MXlCFIE52njgng49k1BkD62wmQEESBFSxAkih9BoviF5QgiQOorQZA+tp7JCOLhWJyCIEVwY20IMoaat1hR1MXlCFIE52njgng49k1BkD62wmQEESBFSxAkih9BoviF5QgiQOorQZA+tp7JCOLhWJyCIEVwY23XSJA331+d3HfS79z+PBb1yKLjxsWP909P5jvpx3GcP3xy93p8Jx1BRn7F/28Jgsj87J+BRhCZfa4QQWT2CCKg4hFLgBQs4RErCP/vagQJB/CP9QgSzgdBwgEgyO4AEGR3PlyQcD4IEg6AC7I7AATZnQ8XJJwPgoQD4ILsDgBBdufDBQnngyDhALgguwNAkN35cEHC+SBIOAAuyO4AEGR3PlyQcD4IEg6AC7I7AATZnQ8XJJwPgoQD4ILsDgBBdufDBQnngyDhALgguwNAkN35cEHC+SBIOAAuyO4AEGR3PlyQcD4IEg6AC7I7AATZnQ8XJJwPgoQD4ILsDgBBdufDBQnngyDhALgguwNAkN35cEHC+SBIOAAuyO4AEGR3PlyQcD4IEg6AC7I7AATZnQ8XJJwPgoQD4ILsDgBBdufDBQnngyDhALgguwNAkN35cEHC+SBIOAAuyO4AEGR3PlyQcD4IEg4geEH+AEB1OLW7RWl5AAAAAElFTkSuQmCC','2016-01-17 13:46:09','\n                <div class=\"cntr\">\n                    \n                <div class=\"clear_rx blocks_move wrap1200\" style=\"\n    /* display: none; */\n\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c2\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c3\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c4\"><div class=\"need_remove del_btn\">删除</div></div></div><div class=\"clear_rx blocks_move wrap1200\" style=\"\n    /* display: none; */\n\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c15\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c17\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c18\"><div class=\"need_remove del_btn\">删除</div></div></div><div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c3\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c4\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c1\"><div class=\"need_remove del_btn\">删除</div></div></div></div>\n                <div class=\"hint_info\">请拖动【A,B,C,D】至这里进行编辑(变绿时释放鼠标)</div>\n        	','2016-01-17 13:46:09',1,1),('da0cb100-bcdc-11e5-a880-79053797b1e5','一字布局','<div class=\"cntr\"></div>','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAYAAAC7HLUcAAABRklEQVR4Xu3TsQ0CQRQDUa4z2qAWYmqhDToD0cEFN4n1Nv7yymPNcbv4Pe+P78WR4hA4TeD1eR+nj08cXhr2/48gJ6g7yQgQJEMreIEAQRZW1CEjQJAMreAFAgRZWFGHjABBMrSCFwgQZGFFHTICBMnQCl4gQJCFFXXICBAkQyt4gQBBFlbUISNAkAyt4AUCBFlYUYeMAEEytIIXCBBkYUUdMgIEydAKXiBAkIUVdcgIECRDK3iBAEEWVtQhI0CQDK3gBQIEWVhRh4wAQTK0ghcIEGRhRR0yAgTJ0ApeIECQhRV1yAgQJEMreIEAQRZW1CEjQJAMreAFAgRZWFGHjABBMrSCFwgQZGFFHTICBMnQCl4gQJCFFXXICBAkQyt4gQBBFlbUISNAkAyt4AUCBFlYUYeMAEEytIIXCBBkYUUdMgJXC/IDep2gKVX5g6YAAAAASUVORK5CYII=','2016-01-17 13:40:44','\n                <div class=\"cntr\">\n                    \n                <div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block h300 c18\"><div class=\"need_remove del_btn\">删除</div></div></div></div>\n                <div class=\"hint_info\">请拖动【A,B,C,D】至这里进行编辑(变绿时释放鼠标)</div>\n        	','2016-01-17 13:40:44',1,1),('f9aed600-bcdc-11e5-a880-79053797b1e5','品字布局','<div class=\"cntr\"></div>','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABQCAYAAABcbTqwAAACyElEQVR4Xu3dsW0UYBAFYRxRAh3QAiltkJIQktsxtdAGPVAQyB2cNLfSavU5vrfWP3MT38uHJ/+9ff3278knnUPgYQK//vx+efjDD3zwqcfe/59AHqDuI2MEBDKG1uELBARywaI3jBEQyBhahy8QEMgFi94wRkAgY2gdvkBAIBcsesMYAYGMoXX4AgGBXLDoDWMEBDKG1uELBARywaI3jBEQyBhahy8QEMgFi94wRkAgY2gdvkBAIBcsesMYAYGMoXX4AgGBXLDoDWMEBDKG1uELBARywaI3jBEQyBhahy8QEMgFi94wRkAgY2gdvkBAIBcsesMYAYGMoXX4AgGBXLDoDWMEBDKG1uELBARywaI3jBEQyBhahy8QEMgFi94wRkAgY2gdvkBAIBcsesMYAYGMoXX4AgGBXLDoDWMEBDKG1uELBARywaI3jBEQyBhahy8QEMgFi94wRkAgY2gdvkBAIBcsesMYgfWBfPn76nfSg/4fHz+Ften3zz+f+tPmTz32rkcg7UsqkMZPII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpigTS+K1fC6QpEkjjt34tkKZIII3f+rVAmiKBNH7r1wJpip4dyH/YU0BgaeEmyQAAAABJRU5ErkJggg==','2016-01-17 13:41:37','\n                <div class=\"cntr\">\n                    \n                <div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block h300 c18\"><div class=\"need_remove del_btn\">删除</div></div></div><div class=\"clear_rx blocks_move wrap1200\"><div class=\"need_remove del_btn\">删除</div><div class=\"c_block fl_rx h300 need_move_width200 c2\"><div class=\"need_remove del_btn\">删除</div></div><div class=\"c_block fl_rx h300 need_move_width200 c3\"><div class=\"need_remove del_btn\">删除</div></div></div></div>\n                <div class=\"hint_info\">请拖动【A,B,C,D】至这里进行编辑(变绿时释放鼠标)</div>\n        	','2016-01-17 13:41:37',1,1);

/*Table structure for table `c_model` */

DROP TABLE IF EXISTS `c_model`;

CREATE TABLE `c_model` (
  `id` char(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `content` text,
  `data_model` text,
  `img_url` varchar(100) DEFAULT NULL,
  `render_type` int(1) DEFAULT NULL COMMENT '渲染类型，1.普通html模板，2.juicer模板',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  `term_type` int(1) DEFAULT NULL COMMENT '终端类型，1.PC，2.WAP',
  `model_height` int(5) DEFAULT NULL COMMENT '模板高度',
  `model_width` int(5) DEFAULT NULL COMMENT '模板宽度',
  `model_type` int(1) DEFAULT NULL COMMENT '模板类型，1.综合,2.轮播,3.单图，4.其他',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_model` */

insert  into `c_model`(`id`,`name`,`content`,`data_model`,`img_url`,`render_type`,`create_time`,`last_edit_time`,`term_type`,`model_height`,`model_width`,`model_type`) values ('1729a8ac-b3a7-11e5-a091-003067b83487','模板2','<div class=\"c_model\">\r\n	<style>\r\n		.css_namespaceliumeiling ul li{float: left;}\r\n		.css_namespaceliumeiling ul li img{width: 140px;height: 110px;}\r\n	</style>\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<ul class=\"clear_rx\">\r\n			{@each model_list as it}\r\n				<li class=\"c_edit\" zone_key=\"${it.zone_key}\"><a href=\"${it.href}\" {@if it.new_open==\"yes\"}target=\"_blank\"{@/if}><img src=\"${it.imgurl}\" alt=\"${it.name}\"></a></li>\r\n			{@/each}\r\n		</ul>\r\n	</script>\r\n	<div class=\"translated css_namespaceliumeiling\"></div>\r\n</div>','[\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.baidu.com\",new_open:false,zone_key:\"1aa\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sohu.com\",new_open:false,zone_key:\"2cc\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.hao123.com\",new_open:true,zone_key:\"3td\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sina.com.cn\",new_open:true,zone_key:\"4eh\"}\r\n]',NULL,2,'2016-01-12 17:40:56','2016-01-12 17:40:58',1,NULL,1200,NULL),('48c9c146-bdb1-11e5-ba54-68f728f3bf19','楼层左1右8','<div class=\"c_model css_namespace_first\">\r\n	<style type=\"text/css\">\r\n		.css_namespace_first .floor_section{width: 1200px;margin: 0 auto 30px;color: #000;}\r\n		.css_namespace_first .floor_section .floor_title{height: 48px;}\r\n		.css_namespace_first .floor_section .floor_title h3{float: left;height: 48px;line-height: 48px;font-size: 20px;font-weight: normal;width: 240px;}\r\n		.css_namespace_first .floor_section .floor_links{float: right;width: 960px;text-align: right;padding-top: 20px;}\r\n		.css_namespace_first .floor_section .floor_links a{color: #6f7170;margin-left: 12px;}\r\n		.css_namespace_first .floor_img{width: 1200px;}\r\n		.css_namespace_first .floor_left{float: left;width: 240px;height: 535px;overflow: hidden;}\r\n		.css_namespace_first .floor_section a,.css_namespace_first .floor_section a:focus{outline: none!important;text-decoration: none;color: #000;}\r\n		.css_namespace_first .floor_left img{width: 240px;height: 535px;}\r\n		.css_namespace_first .floor_right{float: right;width: 960px;border-top: 1px solid #dedede;}\r\n		.css_namespace_first .floor_item{width: 239px;height: 266px;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede;float: left;position: relative;background: #fff;text-align: center;}\r\n		.css_namespace_first .floor_item .pro_img{overflow: hidden;padding: 12px 0;}\r\n		.css_namespace_first .floor_item a{display: block;}\r\n		.css_namespace_first .floor_item a img{border: 0;vertical-align: top;}\r\n		.css_namespace_first .floor_item .pro_img img{height: 164px;position: relative;top: 0;}\r\n		.css_namespace_first .floor_item .pro_name{font-size: 14px;height: 22px;line-height: 22px;overflow: hidden;padding: 0 14px;}\r\n		.css_namespace_first .floor_item .pro_description{color: #6f7170;height: 20px;line-height: 20px;overflow: hidden;padding: 0 12px;}\r\n		.css_namespace_first .floor_item .pro_price{font-size: 14px;color: #e2231a;height: 22px;line-height: 22px;overflow: hidden;}\r\n		.css_namespace_first .floor_item .floor_label{display: block;width: 54px;height: 54px;position: absolute;top: 0;right: 0;background-image: url(http://pic.shop.lenovo.com.cn/g1/M00/00/F0/CmBZD1ZynUyAUnWjAAGn0mxLsoI703.png);}\r\n		.css_namespace_first .floor_item .floor_label1{background-position: 0 -700px;}\r\n	</style>\r\n\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<div class=\"floor_section floor_l1_r8\">\r\n		    <div class=\"floor_title clear_rx\">\r\n		        <h3>\r\n		            1F Lenovo 电脑\r\n		        </h3>\r\n		        <div class=\"floor_links\">\r\n		        	{@each linklist as it}\r\n			            <a target=\"_blank\" href=\"${it.href}\"\r\n			            title=\"${it.title}\">\r\n			                YOGA 4 Pro系列\r\n			            </a>\r\n		            {@/each}\r\n		        </div>\r\n		    </div>\r\n		    <div class=\"floor_img clear_rx\">\r\n		        <div class=\"floor_left btn_cntr_in_piece\" datatype=\"3\" sort=\"1\" b_i=\"240,535,40\">\r\n		            <a target=\"_blank\" href=\"http://www.lenovo.com.cn/product/50982.html\"\r\n		            latag=\"latag_home_MD532_9f1edcb1-6b77-4863-8a4b-ef1d77bd3087_p1_goods_code_no_exists\"\r\n		            title=\"\">\r\n		                <img width=\"240\" height=\"535\" src=\"http://pic.shop.lenovo.com.cn/g1/M00/00/7F/CmBZEFZdY9iALGjfAABvbEHIe5s561.jpg\"\r\n		                _src=\"http://pic.shop.lenovo.com.cn/g1/M00/00/7F/CmBZEFZdY9iALGjfAABvbEHIe5s561.jpg\"\r\n		                alt=\"\" class=\"lazy_img\">\r\n		            </a>\r\n		        </div>\r\n		        <div class=\"floor_right\">\r\n		        	{@each gelist as it}\r\n			            <div class=\"floor_item c_edit\" edit_type=1 zone_key=\"${it.zone_key}\">\r\n			                <a target=\"_blank\" href=\"${it.href}\"\r\n			                latag=\"latag_home_MD532_9f1edcb1-6b77-4863-8a4b-ef1d77bd3087_p2_50509\"\r\n			                title=\"${it.title}\" class=\"pro_img\">\r\n			                    <img width=\"164\" height=\"164\" src=\"${it.imgurl}\"\r\n			                    _src=\"${it.imgurl}\"\r\n			                    alt=\"${it.title}\" class=\"lazy_img\" style=\"left: 0px;\">\r\n			                </a>\r\n			                <a target=\"_blank\" href=\"${it.href}\"\r\n			                latag=\"latag_home_MD532_9f1edcb1-6b77-4863-8a4b-ef1d77bd3087_p2_50509\"\r\n			                title=\"${it.title}\" class=\"pro_name\">\r\n			                    ${it.title}\r\n			                </a>\r\n			                <a target=\"_blank\" href=\"${it.href}\"\r\n			                latag=\"latag_home_MD532_9f1edcb1-6b77-4863-8a4b-ef1d77bd3087_p2_50509\"\r\n			                title=\"${it.title}\" class=\"pro_description\">\r\n			                    ${it.description}\r\n			                </a>\r\n			                <a target=\"_blank\" href=\"${it.href}\"\r\n			                latag=\"latag_home_MD532_9f1edcb1-6b77-4863-8a4b-ef1d77bd3087_p2_50509\"\r\n			                title=\"${it.title}\" class=\"pro_price\">\r\n			                    ${it.price}元\r\n			                </a>\r\n			                <span class=\"floor_label floor_label1\">\r\n			                </span>\r\n			            </div>\r\n		            {@/each}\r\n		        </div>\r\n		    </div>\r\n		</div>\r\n	</script>\r\n\r\n	<div class=\"translated\"></div>\r\n</div>','{\r\n	gelist:[\r\n		{zone_key:1,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身1\",price:4299},\r\n		{zone_key:2,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身2\",price:4299},\r\n		{zone_key:3,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身3\",price:4299},\r\n		{zone_key:4,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身4\",price:4299},\r\n		{zone_key:5,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身5\",price:4299},\r\n		{zone_key:6,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身6\",price:4299},\r\n		{zone_key:7,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身7\",price:4299},\r\n		{zone_key:8,href:\"http://www.lenovo.com.cn/product/50828.html\",imgurl:\"http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg\",title:\"LenovoU31-70-IFI(蔷薇红)(H)\",description:\"外观轻薄简约 多彩时尚机身8\",price:4299}\r\n		],\r\n	linklist:[\r\n			{href:\"http://s.lenovo.com.cn/?key=%E4%B9%90%E6%AA%ACx3&index=3&fromhomepage\",title:\"YOGA 4 Pro系列\"},\r\n			{href:\"http://s.lenovo.com.cn/?key=%E8%81%94%E6%83%B3%20p1&index=3&fromhomepage\",title:\"联想P1\"},\r\n			{href:\"http://s.lenovo.com.cn/?key=%E4%B9%90%E6%AA%ACk3%20note&index=3&fromhomepage\",title:\"乐檬K3 Note\"}\r\n		]\r\n}',NULL,2,NULL,NULL,1,NULL,1200,NULL),('51a8d2d1-b0f0-11e5-a998-003067b83487','模板1','<div class=\"c_model\">\r\n	<style>\r\n		.css_namespaceshiyuanyuan ul li{float: left;}\r\n		.css_namespaceshiyuanyuan ul li img{width: 200px;height: 170px;}\r\n	</style>\r\n	<script class=\"tmpl\" type=\"text/template\">\r\n		<ul class=\"clear_rx\">\r\n			{@each model_list as it}\r\n				<li class=\"c_edit\" zone_key=\"${it.zone_key}\"><a href=\"${it.href}\" {@if it.new_open==\"yes\"}target=\"_blank\"{@/if}><img src=\"${it.imgurl}\" alt=\"${it.name}\"></a></li>\r\n			{@/each}\r\n		</ul>\r\n	</script>\r\n	<div class=\"translated css_namespaceshiyuanyuan\"></div>\r\n</div>','[\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.baidu.com\",new_open:false,zone_key:\"1aa\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.sohu.com\",new_open:false,zone_key:\"2cc\"},\r\n	{imgurl:\'/images/sys/default128X128.jpg\',name:\'默认图片\',href:\"http://www.hao123.com\",new_open:true,zone_key:\"3td\"}\r\n]',NULL,2,'2016-01-12 17:38:35','2016-01-12 17:38:37',1,NULL,600,NULL),('bae3367f-b460-11e5-9d60-68f728f3bf19','模板3(普通)','<div class=\"c_model\">\r\n	<style>\r\n		.ccc{width:180px;height:100px;background:yellow;}\r\n	</style>\r\n	<div class=\"translated ccc\"></div>\r\n</div>',NULL,NULL,1,'2016-01-12 17:41:42','2016-01-12 17:41:43',1,NULL,600,NULL);

/*Table structure for table `c_page` */

DROP TABLE IF EXISTS `c_page`;

CREATE TABLE `c_page` (
  `id` char(36) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page` */

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
  `order` int(5) DEFAULT '1',
  `style` varchar(100) DEFAULT 'margin-top:0px!important;margin-bottom:0px!important;',
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  `model_type` int(1) DEFAULT '1' COMMENT '模板类型：1.综合，2.轮播，3.单图，4.其他',
  `term_type` int(1) DEFAULT '1' COMMENT '终端类型：1.PC,2.WAP',
  `query_height` int(5) DEFAULT '0' COMMENT '过滤模板时用，0代表不限高度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_floor` */

/*Table structure for table `c_page_layout` */

DROP TABLE IF EXISTS `c_page_layout`;

CREATE TABLE `c_page_layout` (
  `id` char(36) NOT NULL,
  `c_layout_id` char(36) DEFAULT NULL,
  `c_page_id` char(36) DEFAULT NULL,
  `project_name` varchar(80) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_edit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_page_layout` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
