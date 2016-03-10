var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

router.get('/blocks_save_orders', function(req, res, next) {

	var current_blocks_id = req.query.current_blocks_id;
	var target_blocks_id = req.query.target_blocks_id;
	var current_blocks_order = req.query.current_blocks_order;
	var target_blocks_order = req.query.target_blocks_order;
	var page_id = req.query.pid;

	var _pool = sqlclient.init()._pool;

	var blocks_save_orders_sql = " UPDATE c_page_blocks pbs SET pbs.order = CASE pbs.c_blocks_id WHEN "+_pool.escape(current_blocks_id)+" THEN "+_pool.escape(target_blocks_order)+
			" WHEN "+_pool.escape(target_blocks_id)+" THEN "+_pool.escape(current_blocks_order)+
			" ELSE pbs.order END WHERE pbs.c_page_id="+_pool.escape(page_id);

	console.log(blocks_save_orders_sql+'-----------blocks_save_orders_sql');
	//sqlclient.init();
	sqlclient.query(blocks_save_orders_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({changedRows:rows.changedRows});
	});

});

module.exports = router;
