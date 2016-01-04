var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

router.post('/add', function(req, res, next) {

	var fid = req.body.fid;
	var mid = req.body.mid;

	var sql = " INSERT INTO c_data VALUES (UUID(),'"+mid+"','"+fid+"',NULL,'"+fid+mid+"') ";

	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:"增加成功"});
	});



	//1.通过dataid得到layout.content及cb_id数组
	//2.通过cb_id数组得到cb_content,及b_content,如果有cb_content则将其对应的b_content放入其中
		
});

module.exports = router;