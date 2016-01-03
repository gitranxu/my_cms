var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var uuid = require('node-uuid'); 
var sqlclient = require('../lib/mysql_cli');

router.get('/floor_save_orders', function(req, res, next) {

	var current_floor_id = req.query.current_floor_id;
	var target_floor_id = req.query.target_floor_id;
	var current_floor_order = req.query.current_floor_order;
	var target_floor_order = req.query.target_floor_order;
	var sql = " UPDATE c_floor b SET b.order = CASE b.id WHEN '"+current_floor_id+"' THEN "+target_floor_order+
			" WHEN '"+target_floor_id+"' THEN "+current_floor_order+
			" ELSE b.order END";
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,changedRows:rows.changedRows});
	});


});


module.exports = router;
