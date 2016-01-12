var express = require('express');
var router = express.Router();
var uuid = require('node-uuid'); 
var howdo = require('howdo');
var sqlclient = require('../lib/mysql_cli');

router.get('/floor_save_orders', function(req, res, next) {

	var current_floor_id = req.query.current_floor_id;
	var target_floor_id = req.query.target_floor_id;
	var current_floor_order = req.query.current_floor_order;
	var target_floor_order = req.query.target_floor_order;
	var page_id = req.query.pid;
	var floor_save_orders_sql = " UPDATE c_page_floor pf SET pf.order = CASE pf.c_floor_id WHEN '"+current_floor_id+"' THEN "+target_floor_order+" WHEN '"+target_floor_id+"' THEN "+current_floor_order+
			" ELSE pf.order END WHERE pf.c_page_id='"+page_id+"'";
	console.log(floor_save_orders_sql+'--------------------------floor_save_orders_sql');
	sqlclient.init();
	sqlclient.query(floor_save_orders_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,changedRows:rows.changedRows});
	});


});

//直接删除，不保存原数据，麻烦（有一个可行的方案，将原id,原关联的c_block_id保留，并改变原来的值，但还是麻烦，直接删除）
router.post('/floor_delete', function(req, res, next) {

	var fid = req.body.fid;
	var page_id = req.body.pid;

	if(!fid){
		console.log('floor_id的值不合法:'+fid);
		res.json({reCode:10001,msg:"参数不合法"});
		return;
	}
		

	howdo
		.task(function(done){
			var sql = " DELETE FROM c_floor WHERE id='"+fid+"' ";
			sqlclient.init();
			sqlclient.query(sql,function(err,rows,fields){
				if(err) throw err;
				done(null,'c_floor删除成功！');
			});
		})
		.task(function(done){
			var sql = " DELETE FROM c_page_floor WHERE c_floor_id='"+fid+"' AND c_page_id='"+page_id+"' ";
			sqlclient.init();
			sqlclient.query(sql,function(err,rows,fields){
				if(err) throw err;
				done(null,'c_page_floor删除成功！');
			});
		})
		.together()
		.try(function(m1,m2){
			console.log(m1);
			console.log(m2);
			res.json({reCode:1,msg:"删除成功"});
		})
		.catch(function(err){
			res.json({reCode:10004,msg:err});
		});

});


module.exports = router;
