var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

router.get('/block_save_orders', function(req, res, next) {

	var current_block_id = req.query.current_block_id;
	var target_block_id = req.query.target_block_id;
	var current_block_order = req.query.current_block_order;
	var target_block_order = req.query.target_block_order;
	var sql = " UPDATE c_block b SET b.order = CASE b.id WHEN '"+current_block_id+"' THEN "+target_block_order+
			" WHEN '"+target_block_id+"' THEN "+current_block_order+
			" ELSE b.order END";
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		//console.log(rows);
		res.json({changedRows:rows.changedRows});
	});



	//1.通过dataid得到layout.content及cb_id数组
	//2.通过cb_id数组得到cb_content,及b_content,如果有cb_content则将其对应的b_content放入其中
		
});

module.exports = router;
