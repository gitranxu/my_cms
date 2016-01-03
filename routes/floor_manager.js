var express = require('express');
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

//直接删除，不保存原数据，麻烦（有一个可行的方案，将原id,原关联的c_block_id保留，并改变原来的值，但还是麻烦，直接删除）
router.post('/floor_delete', function(req, res, next) {

	var fid = req.body.fid;
	if(!fid){
		console.log('floor_id的值不合法:'+fid);
		res.json({reCode:10001,msg:"参数不合法"});
		return;
	}
	var sql = " DELETE FROM c_floor WHERE id='"+fid+"' ";
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:"删除成功"});
	});


});


module.exports = router;
