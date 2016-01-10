var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var uuid = require('node-uuid'); 
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

router.get('/get_f_css_by_fid', function(req, res, next) {

	var fid = req.query.fid;

	var sql = " SELECT f.id,f.style fstyle FROM c_floor f WHERE f.id='"+fid+"'; ";
	console.log(sql+'-----------------get_f_css_by_fid');
	var result = {};
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			var fid = rows[0].id;add_attr(result,fid,"fid");
			//var f_width = get_value_by_name(rows[0].fstyle,"width");add_attr(result,f_width,"width");
			var f_margin_top = get_value_by_name(rows[0].fstyle,"margin-top");add_attr(result,f_margin_top,"marginA");
			var f_margin_bottom = get_value_by_name(rows[0].fstyle,"margin-bottom");add_attr(result,f_margin_bottom,"marginB");

			res.json({reCode:1,msg:result});
		}else{
			res.json({reCode:10000,msg:"没有数据"});
		}
	});

});

router.get('/get_all_pages', function(req, res, next) {

	var sql = " SELECT name,id pid,url,project_name,c_layout_id FROM c_page ";
	
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			res.json({reCode:1,msg:rows});
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

router.post('/set_f_css_by_fid', function(req, res, next) {
	var fid = req.body.fid;
	var update_val = req.body.update_val;

	var sql = "UPDATE c_floor SET style='"+update_val+"' WHERE id='"+fid+"'";
	console.log(sql+'--------------------set_f_css_by_fid');
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'更新成功'});
	});
});

router.post('/save_or_update_page_info', function(req, res, next) {
	var name = req.body.name;
	var url = req.body.url;
	var project_name = req.body.project_name;
	var layout_id = req.body.layout_id;
	var page_id = req.body.page_id;

	//首先根据layout_id得到bs_id及b_id
	var get_bs_b_ids_sql = "SELECT l.id lid,bs.id bsid,bs.content bsc,b.`id` bid FROM c_layout l,c_blocks bs,c_block b "+
				" WHERE l.`id` = bs.`layout_id` "+
			    " AND bs.`id` = b.`c_blocks_id` "+
			    " AND l.id = '"+layout_id+"'";
	console.log(get_bs_b_ids_sql+'--------------------------------get_bs_b_ids_sql');
	var bs_id_obj = {};	
	var b_id_obj = {};	    //在得到bid的过程中，如果bsc为空，则这样的bid略过不要
	sqlclient.init();
	sqlclient.query(get_bs_b_ids_sql,function(err,rows,fields){
		if(err) throw err;
		
		if(rows.length){
			for(var i = 0,j = rows.length;i < j;i++){
				bs_id_obj[rows[i].bsid] = rows[i].bsid;
				var bsc = rows[i].bsc;
				if(bsc){
					b_id_obj[rows[i].bid] = rows[i].bid;
				}
				
			}
			if(page_id){//更新操作
				update_page();
			}else{//新增操作
				add_page(page_id,url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res);
			}

		}else{
			console.log('该布局记录没有对应的bs,b信息');
		}

	});


			

	/*var sql = "UPDATE "+table+" SET style = '"+update_val+"' WHERE "+col_name+" = '"+id_val+"'";
	console.log(sql+'--------------------update_css_by_id_table_col');
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'更新成功'});
	});*/
});

//操作c_page,c_page_blocks,c_page_block三张表
function add_page(page_id,url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res){
	//对于新增来说，传过来的page_id是undefined
	page_id = uuid.v1();
	var insert_to_page_sql = "INSERT INTO c_page(id,name,url,create_time,project_name,c_layout_id) VALUES('"+page_id+"','"+name+"','"+url+"',NOW(),'"+project_name+"','"+layout_id+"');";
	console.log(insert_to_page_sql+'-----------------insert_to_page_sql');
	sqlclient.query(insert_to_page_sql,function(err,rows,fields){
		if(err) throw err;
		console.log('c_page插入成功！');
	});
	
	for(var i in bs_id_obj){
		var bsid = bs_id_obj[i];
		var insert_to_page_blocks_sql = "INSERT INTO c_page_blocks(id,c_page_id,c_blocks_id,create_time) VALUES(UUID(),'"+page_id+"','"+bsid+"',NOW());";
		console.log(insert_to_page_blocks_sql+'-----------------insert_to_page_blocks_sql');
		sqlclient.query(insert_to_page_blocks_sql,function(err,rows,fields){
			if(err) throw err;
			console.log('c_page_blocks插入成功！');
		});
	}

	for(var i in b_id_obj){ //这里不能所有的都增加
		var bid = b_id_obj[i];
		var insert_to_page_block_sql = "INSERT INTO c_page_block(id,c_page_id,c_block_id,create_time) VALUES(UUID(),'"+page_id+"','"+bid+"',NOW());";
		console.log(insert_to_page_block_sql+'-----------------insert_to_page_block_sql');
		sqlclient.query(insert_to_page_block_sql,function(err,rows,fields){
			if(err) throw err;
			console.log('c_page_block插入成功！');
		});
	}

	res.json({reCode:1,msg:'插入成功',pid:page_id});
}

//操作c_page,c_page_blocks,c_page_block三张表
function update_page(page_id,url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res){

}


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
