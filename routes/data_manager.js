var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

//增加之前先判断一下,如果有记录，则更新connect_time时间，如果没有记录则插入一条
router.post('/add', function(req, res, next) {

	var fid = req.body.fid;
	var mid = req.body.mid;


	var sql_query = "SELECT 1 FROM c_data d WHERE d.`c_model_id`='"+mid+"' AND d.`c_floor_id`='"+fid+"'";
	var sql_insert = " INSERT INTO c_data VALUES (UUID(),'"+mid+"','"+fid+"',NULL,'"+fid+mid+"',NOW()) ";
	var sql_update = "UPDATE c_data d SET d.`connect_time`=NOW() WHERE d.`c_model_id`='"+mid+"' AND d.`c_floor_id`='"+fid+"'";

	sqlclient.init();
	sqlclient.query(sql_query,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){//
			sqlclient.query(sql_update,function(err,rows,fields){
				if(err) throw err;
				res.json({reCode:1,msg:"更新成功"});
			});
		}else{
			sqlclient.query(sql_insert,function(err,rows,fields){
				if(err) throw err;
				res.json({reCode:1,msg:"增加成功"});
			});
		}
	});

		



	//1.通过dataid得到layout.content及cb_id数组
	//2.通过cb_id数组得到cb_content,及b_content,如果有cb_content则将其对应的b_content放入其中
		
});

module.exports = router;