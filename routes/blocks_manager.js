var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

router.get('/blocks_save_orders', function(req, res, next) {

	var current_blocks_id = req.query.current_blocks_id;
	var target_blocks_id = req.query.target_blocks_id;
	var current_blocks_order = req.query.current_blocks_order;
	var target_blocks_order = req.query.target_blocks_order;
	var sql = " UPDATE c_blocks cb SET cb.order = CASE cb.id WHEN "+current_blocks_id+" THEN "+target_blocks_order+
			" WHEN "+target_blocks_id+" THEN "+current_blocks_order+
			" ELSE cb.order END";
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({changedRows:rows.changedRows});
	});



	//1.通过dataid得到layout.content及cb_id数组
	//2.通过cb_id数组得到cb_content,及b_content,如果有cb_content则将其对应的b_content放入其中
		
});

module.exports = router;
