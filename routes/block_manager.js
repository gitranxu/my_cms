var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var howdo = require('howdo');
var router = express.Router();
var uuid = require('node-uuid'); 
var sqlclient = require('../lib/mysql_cli');

router.get('/block_save_orders', function(req, res, next) {

	var current_block_id = req.query.current_block_id;
	var target_block_id = req.query.target_block_id;
	var current_block_order = req.query.current_block_order;
	var target_block_order = req.query.target_block_order;
	var page_id = req.query.pid;
	var _pool = sqlclient.init()._pool;

	var block_save_orders_sql = " UPDATE c_page_block pb SET pb.order = CASE pb.c_block_id WHEN "+_pool.escape(current_block_id)+" THEN "+_pool.escape(target_block_order)+
			" WHEN "+_pool.escape(target_block_id)+" THEN "+_pool.escape(current_block_order)+
			" ELSE pb.order END WHERE pb.c_page_id="+_pool.escape(page_id);
	console.log(block_save_orders_sql+'--------------------------block_save_orders_sql');
	//sqlclient.init();
	sqlclient.query(block_save_orders_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({changedRows:rows.changedRows});
	});


});

//增加楼层，先查询一下该楼层最后一条记录(最前或最后)的order,然后加进去
router.get('/create_floor_by_block_id',function(req,res,next){
	//console.log('--------------------119');
	var block_id = req.query.block_id;
	var page_id = req.query.pid; 

	var _pool = sqlclient.init()._pool;
	var order_direct = req.query.order_direct;
	var query_order_sql = "SELECT pf.order forder FROM c_page_floor pf,c_floor f "+
							" WHERE f.`id` = pf.c_floor_id "+
							  " AND f.`c_block_id` = "+_pool.escape(block_id)+" "+
							  " AND pf.c_page_id = "+_pool.escape(page_id)+" ORDER BY forder ASC";
	console.log(query_order_sql+'------------------query_order_sql');
	//sqlclient.init();
	sqlclient.query(query_order_sql,function(err,rows,fields){
		if(err) throw err;
		var order = 1;
		if(rows.length){
			if(order_direct=="bottom"){
				order = rows[rows.length-1].forder + 1;
			}else{
				order = rows[0].forder - 1;
			}
			
		}
		
		addFloor(_pool.escape(block_id),_pool.escape(page_id),order,sqlclient,res);
	});
});

function addFloor(block_id,page_id,order,sqlclient,res){
	var rand18 = GetRandomNum(1,18);
	var uuid_s = uuid.v1();
	var content_save = '<div class="c_floor h200 c'+rand18+'"></div>';
	var content_show = '<div class="c_floor h200 c'+rand18+'" fid="'+uuid_s+'" f_order="'+order+'"></div>';

	howdo
		.task(function(done){
			var insert_to_c_floor_sql = "INSERT INTO c_floor(id,content,c_block_id,create_time) VALUES('"+uuid_s+"','"+content_save+"',"+block_id+",NOW())";
			console.log(insert_to_c_floor_sql+'------------------insert_to_c_floor_sql');
			sqlclient.query(insert_to_c_floor_sql,function(err,rows,fields){
				if(err) done(err,'c_floor插入失败！');
				console.log('c_floor插入成功！');
				done(null,'c_floor插入成功！');
			});
		})
		.task(function(done){
			var insert_to_c_page_floor_sql = "INSERT INTO c_page_floor(id,c_floor_id,c_page_id,`order`,create_time,last_edit_time) VALUES(UUID(),'"+uuid_s+"',"+page_id+","+order+",NOW(),NOW())";
			console.log(insert_to_c_page_floor_sql+'------------------insert_to_c_page_floor_sql');
			sqlclient.query(insert_to_c_page_floor_sql,function(err,rows,fields){
				if(err) done(err,'c_page_floor插入失败！');
				console.log('c_page_floor插入成功！');
				done(null,'c_page_floor插入成功！');
			});
		})
		.together()
		.try(function(m1,m2){
			res.json({reCode:1,msg:content_show});
		})
		.catch(function(err){
			res.json({reCode:10002,msg:'楼层增加失败'});
		});
}

function GetRandomNum(Min,Max){ 

        var Range = Max - Min; 

        var Rand = Math.random(); 

        return(Min + Math.round(Rand * Range)); 

} 

module.exports = router;
