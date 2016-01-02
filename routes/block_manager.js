var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var uuid = require('node-uuid'); 
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
		res.json({changedRows:rows.changedRows});
	});



	//1.通过dataid得到layout.content及cb_id数组
	//2.通过cb_id数组得到cb_content,及b_content,如果有cb_content则将其对应的b_content放入其中
		
});

//增加楼层，先查询一下该楼层最后一条记录(最前或最后)的order,然后加进去
router.get('/create_floor_by_block_id',function(req,res,next){
	//console.log('--------------------119');
	var block_id = req.query.block_id;
	var order_direct = req.query.order_direct;
	var query_order_sql = " SELECT f.order "+
							  "  FROM c_floor f "+
							  " WHERE f.c_block_id = '"+block_id+"' "+
							  " ORDER BY f.order ASC";
	sqlclient.init();
	sqlclient.query(query_order_sql,function(err,rows,fields){
		if(err) throw err;
		var order = 1;
		if(rows.length){
			if(order_direct=="bottom"){
				order = rows[rows.length-1].order + 1;
			}else{
				order = rows[0].order - 1;
			}
			
		}
		
		addFloor(block_id,order,sqlclient,res);
	});
});

function addFloor(block_id,order,sqlclient,res){
	var rand18 = GetRandomNum(1,18);
	var uuid_s = uuid.v1();
	var content = '<div class="c_floor h200 c'+rand18+'" fid="'+uuid_s+'"></div>';
	var inert_sql = "INSERT INTO c_floor VALUES('"+uuid_s+"','"+content+"',"+order+",'"+block_id+"',NOW());";
	sqlclient.query(inert_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:content});
	});
}

function GetRandomNum(Min,Max){ 

        var Range = Max - Min; 

        var Rand = Math.random(); 

        return(Min + Math.round(Rand * Range)); 

} 

module.exports = router;
