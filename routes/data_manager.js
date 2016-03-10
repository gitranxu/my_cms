var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

//增加之前先判断一下,如果有记录，则更新connect_time时间，如果没有记录则插入一条
router.post('/add', function(req, res, next) {
	var _pool = sqlclient.init()._pool;

	var fid = _pool.escape(req.body.fid);
	var mid = _pool.escape(req.body.mid);
	var fidmid = _pool.escape(req.body.fid+''+req.body.mid);
	

	var sql_query = "SELECT 1 FROM c_data d WHERE d.`c_model_id`="+mid+" AND d.`c_floor_id`="+fid;
	var sql_insert = " INSERT INTO c_data (id,c_model_id,c_floor_id,data,c_floor_model_id,connect_time) VALUES(UUID(),"+mid+","+fid+",NULL,"+fidmid+",NOW()) ";
	var sql_update = "UPDATE c_data d SET d.`connect_time`=NOW() WHERE d.`c_model_id`="+mid+" AND d.`c_floor_id`="+fid+"";

	console.log(sql_query+'----------------data_add_sql_query');
	//sqlclient.init();
	sqlclient.query(sql_query,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){//
			console.log(sql_update+'----------------data_add_sql_update');
			sqlclient.query(sql_update,function(err,rows,fields){
				if(err) throw err;
				res.json({reCode:1,msg:"更新成功"});
			});
		}else{
			console.log(sql_insert+'----------------data_add_sql_insert');
			sqlclient.query(sql_insert,function(err,rows,fields){
				if(err) throw err;
				res.json({reCode:1,msg:"增加成功"});
			});
		}
	});
		
});

router.post('/save_data',function(req,res,next){
	var _pool = sqlclient.init()._pool;

	var to_save_data = req.body.to_save_data;
	//将to_save_data中的单引号进行转义
	to_save_data = to_save_data.replace(/\'/g,"\\\'");
	//console.log(to_save_data);
	var fid = _pool.escape(req.body.fid);
	var mid = _pool.escape(req.body.mid);
	var data = null;
	if(to_save_data){
		//data = "'"+to_save_data+"'";
		data = _pool.escape(to_save_data);
	}
	var sql_update = "UPDATE c_data d "+
					  " SET d.`data` ="+data+
					  " ,d.connect_time = NOW() "+
					  " WHERE d.`c_floor_id` = "+fid+" "+
					    " AND d.`c_model_id` = "+mid;
	console.log(sql_update+'--------------save_data_sql_update');
	//sqlclient.init();
	sqlclient.query(sql_update,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:"更新成功"});
	});
});

module.exports = router;