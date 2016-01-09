var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

router.get('/get_bs_b_css_by_bsid', function(req, res, next) {

	var bsid = req.query.bsid;
	var sql = " SELECT pbs.`c_blocks_id` bsid,pbs.`style` bsstyle,m.bid,m.bstyle,m.border "+
				  " FROM c_page_blocks pbs  "+
			      " LEFT JOIN  "+
				    " (SELECT pb.c_block_id bid,pb.style bstyle,b.c_blocks_id bsid,b.order border  "+
				    	" FROM c_page_block pb,c_block b  "+
				      " WHERE pb.`c_block_id` = b.`id`  "+
				        " AND b.c_blocks_id = '"+bsid+"') m  "+
				  " ON pbs.c_blocks_id = m.bsid  "+
				 " WHERE pbs.`c_blocks_id` = '"+bsid+"' ORDER BY m.border ASC ";
	console.log(sql+'-----------------get_bs_b_css_by_bsid');
	var result = {b_items:[]};
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			var bsid = rows[0].bsid;add_attr(result,bsid,"bsid");
			var bs_width = get_value_by_name(rows[0].bsstyle,"width");add_attr(result,bs_width,"width");
			var bs_margin_top = get_value_by_name(rows[0].bsstyle,"margin-top");add_attr(result,bs_margin_top,"marginA");
			var bs_margin_bottom = get_value_by_name(rows[0].bsstyle,"margin-bottom");add_attr(result,bs_margin_bottom,"marginB");

			
			for(var i = 0,j = rows.length;i < j;i++){
				var item = {};
				if(!rows[i].bid){//如果为空，说明这个bs下面没有b，直接结束循环
					break;
				}
				var bid = rows[i].bid;add_attr(item,bid,"bid");
				var b_width = get_value_by_name(rows[i].bstyle,'width');add_attr(item,b_width,"width");
				var b_margin_left = get_value_by_name(rows[i].bstyle,'margin-left');add_attr(item,b_margin_left,"marginA");
				var b_margin_right = get_value_by_name(rows[i].bstyle,'margin-right');add_attr(item,b_margin_right,"marginB");
				result.b_items.push(item);
			}

			res.json({reCode:1,msg:result});
		}else{
			res.json({reCode:10000,msg:"没有数据"});
		}
	});



});

router.post('/update_css_by_id_table_col', function(req, res, next) {
	var col_name = req.body.col_name;
	var table = req.body.table;
	var id_val = req.body.id_val;
	var update_val = req.body.update_val;
	var sql = "UPDATE "+table+" SET style = '"+update_val+"' WHERE "+col_name+" = '"+id_val+"'";
	console.log(sql+'--------------------update_css_by_id_table_col');
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'更新成功'});
	});
});


function add_attr(obj,attr,name){
	if(attr){
		obj[name] = attr;
	}
}

function get_value_by_name(target_s,name){
	var result = '';
	var reg = new RegExp(name+"\\s*:\\s*(\\d*)px");
	var result_reg = target_s.match(reg);
	if(result_reg){
		result = result_reg[1];
	}
	return result;
}

module.exports = router;
