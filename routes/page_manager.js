var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var howdo = require('howdo');
var router = express.Router();
var uuid = require('node-uuid'); 
var sqlclient = require('../lib/mysql_cli');


router.get('/get_all_pages', function(req, res, next) {
	var get_all_pages = "SELECT "+
						  " p.name, "+
						  " c.`page_url`, "+
						  " c.`prev_view_url`, "+
						  " c.`edit_page_url`, "+
						  " pl.*,  "+
						  " l.name layout_name,  "+
						  " l.img_data  "+
						" FROM "+
						  " c_page p, "+
						  " c_page_layout pl, "+
						  " c_generate_html_config c, "+
						  " c_layout l "+
						" WHERE p.id = pl.`c_page_id` "+
						  " AND pl.`c_layout_id` = c.`c_layout_id` "+
						  " AND pl.`c_layout_id` = l.`id` "+
						  " AND pl.`c_page_id` = c.`c_page_id` "+
						  " AND pl.`last_edit_time` =  "+
						  " (SELECT  "+
						    " MAX(last_edit_time)  "+
						  " FROM "+
						    " c_page_layout  "+
						  " WHERE c_page_id = p.id) "+ 
						" ORDER BY last_edit_time DESC ";

	console.log(get_all_pages+'------------------------get_all_pages');
	sqlclient.init();
	sqlclient.query(get_all_pages,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			res.json({reCode:1,msg:rows});
		}else{
			res.json({reCode:10000,msg:"没有页面列表数据"});
		}
	});

});

router.get('/get_page_layout_info_by_pid_lid', function(req, res, next) {
	var _pool = sqlclient.init()._pool;

	var pid = _pool.escape(req.query.pid);
	var lid = _pool.escape(req.query.lid);
	var get_page_layout_info_by_pid_lid = "SELECT "+
											  " pl.`project_name`, "+
											  " c.`page_url`, "+
											  " c.`prev_view_url`, "+
											  " c.`edit_page_url` "+
											" FROM "+
											  " c_page_layout pl, "+
											  " c_generate_html_config c "+
											" WHERE pl.`c_page_id` = c.`c_page_id` "+
											  " AND pl.`c_layout_id` = c.`c_layout_id` "+
											  " AND pl.c_page_id = "+pid+
											  " AND pl.`c_layout_id` = "+lid;

	console.log(get_page_layout_info_by_pid_lid+'------------------------get_page_layout_info_by_pid_lid');
	//sqlclient.init();
	sqlclient.query(get_page_layout_info_by_pid_lid,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			res.json({reCode:1,page_url:rows[0].page_url,prev_view_url:rows[0].prev_view_url,edit_page_url:rows[0].edit_page_url,project_name:rows[0].project_name});
		}else{
			res.json({reCode:10000,msg:"没有数据"});
		}
	});

});


router.get('/get_bs_b_css_by_bsid', function(req, res, next) {
	var _pool = sqlclient.init()._pool;

	var bsid = req.query.bsid;
	var pid = req.query.pid;
	var sql = " SELECT pbs.`c_blocks_id` bsid,pbs.`style` bsstyle,m.bid,m.bstyle,m.border "+
				  " FROM c_page_blocks pbs  "+
			      " LEFT JOIN  "+
				    " (SELECT pb.c_block_id bid,pb.style bstyle,b.c_blocks_id bsid,pb.order border  "+
				    	" FROM c_page_block pb,c_block b  "+
				      " WHERE pb.`c_block_id` = b.`id`  "+
				        " AND b.c_blocks_id = "+_pool.escape(bsid)+" AND pb.c_page_id="+_pool.escape(pid)+") m  "+
				  " ON pbs.c_blocks_id = m.bsid  "+
				 " WHERE pbs.`c_blocks_id` = "+_pool.escape(bsid)+" AND pbs.c_page_id="+_pool.escape(pid)+" ORDER BY m.border ASC ";
	console.log(sql+'-----------------get_bs_b_css_by_bsid');
	var result = {b_items:[]};
	//sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			var bsid = rows[0].bsid;add_attr(result,bsid,"bsid");
			if(rows[0].bsstyle){
				var bs_width = get_value_by_name(rows[0].bsstyle,"width");add_attr(result,bs_width,"width");
				var bs_margin_top = get_value_by_name(rows[0].bsstyle,"margin-top");add_attr(result,bs_margin_top,"marginA");
				var bs_margin_bottom = get_value_by_name(rows[0].bsstyle,"margin-bottom");add_attr(result,bs_margin_bottom,"marginB");
			}
			

			
			for(var i = 0,j = rows.length;i < j;i++){
				var item = {};
				if(!rows[i].bid){//如果为空，说明这个bs下面没有b，直接结束循环
					break;
				}
				var bid = rows[i].bid;add_attr(item,bid,"bid");
				if(rows[i].bstyle){
					var b_width = get_value_by_name(rows[i].bstyle,'width');add_attr(item,b_width,"width");
					var b_margin_left = get_value_by_name(rows[i].bstyle,'margin-left');add_attr(item,b_margin_left,"marginA");
					var b_margin_right = get_value_by_name(rows[i].bstyle,'margin-right');add_attr(item,b_margin_right,"marginB");
				}
				result.b_items.push(item);
			}

			res.json({reCode:1,msg:result});
		}else{
			res.json({reCode:10000,msg:"没有数据"});
		}
	});



});

router.get('/get_f_css_by_fid', function(req, res, next) {
	var _pool = sqlclient.init()._pool;

	var fid = req.query.fid;
	var pid = req.query.pid;

	var get_f_css_by_fid_sql = " SELECT f.c_floor_id id,f.style fstyle,f.model_type,f.term_type,f.query_height FROM c_page_floor f WHERE f.`c_floor_id` = "+_pool.escape(fid)+" AND f.`c_page_id` = "+_pool.escape(pid);
	console.log(get_f_css_by_fid_sql+'-----------------get_f_css_by_fid');
	var result = {};
	//sqlclient.init();
	sqlclient.query(get_f_css_by_fid_sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			var fid = rows[0].id;add_attr(result,fid,"fid");
			//var f_width = get_value_by_name(rows[0].fstyle,"width");add_attr(result,f_width,"width");
			var f_margin_top = get_value_by_name(rows[0].fstyle,"margin-top");add_attr(result,f_margin_top,"marginA");
			var f_margin_bottom = get_value_by_name(rows[0].fstyle,"margin-bottom");add_attr(result,f_margin_bottom,"marginB");
			add_attr(result,rows[0].model_type,"model_type");
			add_attr(result,rows[0].term_type,"term_type");
			result["query_height"] = rows[0].query_height;

			res.json({reCode:1,msg:result});
		}else{
			res.json({reCode:10000,msg:"没有数据"});
		}
	});

});

router.post('/set_f_css_by_fid', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var fid = _pool.escape(req.body.fid);
	var pid = _pool.escape(req.body.pid);
	var model_type = _pool.escape(req.body.model_type);
	var term_type = _pool.escape(req.body.term_type);
	var query_height = _pool.escape(req.body.query_height);

	var update_val = _pool.escape(req.body.update_val);

	var sql = "UPDATE c_page_floor pf SET pf.style = "+update_val+",last_edit_time = NOW(),pf.model_type="+model_type+",pf.term_type="+term_type+",query_height="+query_height+" WHERE pf.`c_floor_id` = "+fid+" AND pf.`c_page_id` = "+pid;
	console.log(sql+'--------------------set_f_css_by_fid');
	//sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'更新成功'});
	});
});

router.post('/update_css_by_id_table_col', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	//console.log(req.body.col_name)
	var col_name = _pool.escape(req.body.col_name);
	var table = req.body.table;
	var id_val = _pool.escape(req.body.id_val);
	var update_val = _pool.escape(req.body.update_val);
	var pid = _pool.escape(req.body.pid);
	if(table){
		if(table.toLowerCase().indexOf('delete')!=-1 || table.toLowerCase().indexOf('drop')!=-1){
			console.log('参数不合法');
			return;
		}
	}

	var sql = "UPDATE "+table+" SET style = "+update_val+" WHERE "+col_name+" = "+id_val+" AND c_page_id = "+pid;
	console.log(sql+'--------------------update_css_by_id_table_col');
	//sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'更新成功'});
	});
});



//主要操作c_page,c_blocks,c_block三张表
router.post('/save_or_update_page_info', function(req, res, next) {
	var _pool = sqlclient.init()._pool;

	var name = _pool.escape(req.body.name);
	var page_url = _pool.escape(req.body.page_url);
	var prev_view_url = _pool.escape(req.body.prev_view_url);
	var edit_page_url = _pool.escape(req.body.edit_page_url);
	var project_name = _pool.escape(req.body.project_name);
	var layout_id = _pool.escape(req.body.layout_id);
	var page_id = req.body.page_id;

	//首先根据layout_id得到bs_id及b_id
	var get_bs_b_ids_sql = "SELECT l.id lid,bs.id bsid,bs.content bsc,b.`id` bid FROM c_layout l,c_blocks bs,c_block b "+
				" WHERE l.`id` = bs.`c_layout_id` "+
			    " AND bs.`id` = b.`c_blocks_id` "+
			    " AND l.id = "+layout_id;
	console.log(get_bs_b_ids_sql+'--------------------------------get_bs_b_ids_sql');
	var bs_id_obj = {};	
	var b_id_obj = {};	    //在得到bid的过程中，如果bsc为空，则这样的bid略过不要
	//sqlclient.init();
	sqlclient.query(get_bs_b_ids_sql,function(err,rows,fields){
		if(err) throw err;
		
		if(rows.length){
			for(var i = 0,j = rows.length;i < j;i++){
				bs_id_obj[rows[i].bsid] = rows[i].bsid;
				b_id_obj[rows[i].bid] = rows[i].bid;//如果是blocks_move.c_block这种情况，因下面没有c_block，所以这个元素的c_block样式无法编辑，同时这个元素的类中也只会加入c_blocks_id的类名，不会加入c_block_id，所以第二个类样式也不会起作用
				/*var bsc = rows[i].bsc;
				if(bsc){
					b_id_obj[rows[i].bid] = rows[i].bid;
				}*/
				
			}
			
			if(page_id){//更新操作
				update_page(page_id,page_url,prev_view_url,edit_page_url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res,_pool);
			}else{//新增操作
				add_page(page_id,page_url,prev_view_url,edit_page_url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res,_pool);
			}

		}else{
			console.log('该布局记录没有对应的bs,b信息');
		}

	});


});

//新增操作，操作c_page,c_page_layout,c_page_blocks,c_page_block四张表
function add_page(page_id,page_url,prev_view_url,edit_page_url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res,_pool){
	//对于新增来说，传过来的page_id是undefined
	var b_page_id = page_id;
	howdo
		.task(function(done){
			if(!b_page_id){ //如果新增页面，该id为空，如果是更新（可能是页面已有，但选择了另外的布局，这时候也是新增，但该id有值）
				b_page_id = page_id = uuid.v1();
				page_id = _pool.escape(page_id);
				var insert_to_page_sql = "INSERT INTO c_page(id,name,create_time) VALUES("+page_id+","+name+",NOW())";
				console.log(insert_to_page_sql+'-----------------insert_to_page_sql');
				sqlclient.query(insert_to_page_sql,function(err,rows,fields){
					if(err) throw err;
					console.log('c_page插入成功！');
					done(null,'c_page插入成功！');
				});
			}else{
				b_page_id = page_id = _pool.escape(page_id);
			}
		})
		.task(function(done){
			var insert_to_page_layout_sql = "INSERT INTO c_page_layout(id,c_layout_id,c_page_id,project_name,create_time,last_edit_time) VALUES(UUID(),"+layout_id+","+page_id+","+project_name+",NOW(),NOW());";
			console.log(insert_to_page_layout_sql+'-----------------insert_to_page_layout_sql');
			//console.log(sqlclient)
			//console.log(sqlclient.query)
			sqlclient.query(insert_to_page_layout_sql,function(err,rows,fields){
				if(err) throw err;
				console.log('c_page_layout插入成功！');
				done(null,'c_page_layout插入成功！');
			});
		})
		.task(function(done){
			var insert_to_generate_config_sql = "INSERT INTO c_generate_html_config(id,c_page_id,c_layout_id,page_url,edit_page_url,prev_view_url,create_time,last_edit_time) VALUES(UUID(),"+page_id+","+layout_id+","+page_url+","+edit_page_url+","+prev_view_url+",NOW(),NOW())";
			console.log(insert_to_generate_config_sql+'-----------------insert_to_generate_config_sql');
			sqlclient.query(insert_to_generate_config_sql,function(err,rows,fields){
				if(err) throw err;
				console.log('c_generate_html_config插入成功！');
				done(null,'c_generate_html_config插入成功！');
			});
		})
		.task(function(done){
			var list = [];
			for(var i in bs_id_obj){
				list.push(bs_id_obj[i]);
			}

			howdo
				.each(list,function(key,val,next,bsid){
					if(bsid){
						//第一步，先得到默认order
						//第二步，再插入到相应表中
						var get_default_order_sql = "SELECT bs.default_order FROM c_blocks bs WHERE bs.`id` = '"+bsid+"'";
						console.log(get_default_order_sql+'-----------------get_default_order_sql');
						sqlclient.query(get_default_order_sql,function(err,rows,fields){
							if(err) throw err;
							if(rows.length){
								var default_order = rows[0].default_order;
								var insert_to_page_blocks_sql = "INSERT INTO c_page_blocks(id,c_blocks_id,c_page_id,`order`,create_time,last_edit_time) VALUES(UUID(),'"+bsid+"',"+page_id+","+default_order+",NOW(),NOW());";
								console.log(insert_to_page_blocks_sql+'-----------------insert_to_page_blocks_sql');
								sqlclient.query(insert_to_page_blocks_sql,function(err,rows,fields){
									if(err) throw err;
									console.log('c_page_blocks插入成功！');
									next(null,val);
								});

							}else{
								console.log('查询c_blocks记录默认order，未查到数据');
								next(null,val);
							}
							
						});

								
					}else{
						next(null,val);
					}
					
				})
				.follow()
				.try(function(bsid){
					var get_default_order_sql = "SELECT bs.default_order FROM c_blocks bs WHERE bs.`id` = '"+bsid+"'";
					console.log(get_default_order_sql+'-----------------get_default_order_sql');
					sqlclient.query(get_default_order_sql,function(err,rows,fields){
						if(err) throw err;
						if(rows.length){
							var default_order = rows[0].default_order;
							var insert_to_page_blocks_sql = "INSERT INTO c_page_blocks(id,c_blocks_id,c_page_id,`order`,create_time,last_edit_time) VALUES(UUID(),'"+bsid+"',"+page_id+","+default_order+",NOW(),NOW());";
							console.log(insert_to_page_blocks_sql+'-----------------insert_to_page_blocks_sql');
							sqlclient.query(insert_to_page_blocks_sql,function(err,rows,fields){
								if(err) throw err;
								console.log('c_page_blocks插入成功！');
								done(null,'c_page_blocks插入成功！');
							});

						}else{
							console.log('查询c_blocks记录默认order，未查到数据');
							done('查询c_blocks记录默认order，未查到数据');
						}
						
					});
				});
			
		})
		.task(function(done){
			var list = [];
			for(var i in b_id_obj){
				list.push(b_id_obj[i]);
			}

			howdo
				.each(list,function(key,val,next,bid){
					if(bid){
						var get_default_order_sql = "SELECT b.default_order FROM c_block b WHERE b.`id` = '"+bid+"'";
						console.log(get_default_order_sql+'-----------------get_default_order_sql');
						sqlclient.query(get_default_order_sql,function(err,rows,fields){
							if(err) throw err;
							if(rows.length){
								var default_order = rows[0].default_order;
								var insert_to_page_block_sql = "INSERT INTO c_page_block(id,c_block_id,c_page_id,`order`,create_time,last_edit_time) VALUES(UUID(),'"+bid+"',"+page_id+","+default_order+",NOW(),NOW());";
								console.log(insert_to_page_block_sql+'-----------------insert_to_page_block_sql');
								sqlclient.query(insert_to_page_block_sql,function(err,rows,fields){
									if(err) throw err;
									console.log('c_page_block插入成功！');
									next(null,val);
								});

							}else{
								console.log('查询c_block记录默认order，未查到数据');
								next(null,val);
							}
							
						});
					}else{
						next(null,val);
					}
					
				})
				.follow()
				.try(function(bid){
					var get_default_order_sql = "SELECT b.default_order FROM c_block b WHERE b.`id` = '"+bid+"'";
					console.log(get_default_order_sql+'-----------------get_default_order_sql');
					sqlclient.query(get_default_order_sql,function(err,rows,fields){
						if(err) throw err;
						if(rows.length){
							var default_order = rows[0].default_order;
							var insert_to_page_block_sql = "INSERT INTO c_page_block(id,c_block_id,c_page_id,`order`,create_time,last_edit_time) VALUES(UUID(),'"+bid+"',"+page_id+","+default_order+",NOW(),NOW());";
							console.log(insert_to_page_block_sql+'-----------------insert_to_page_block_sql');
							sqlclient.query(insert_to_page_block_sql,function(err,rows,fields){
								if(err) throw err;
								console.log('c_page_block插入成功！');
								done(null,'c_page_block插入成功！');
							});

						}else{
							console.log('查询c_block记录默认order，未查到数据');
							done('查询c_block记录默认order，未查到数据');
						}
						
					});
				});
			
		})
		.together()
		.try(function(m1,m2,m3,m4){
			console.log("=========----------=========--------======-----")
			res.json({reCode:1,msg:'插入成功',pid:b_page_id});
		})
		.catch(function(err){
			res.json({reCode:10002,msg:'插入失败',pid:b_page_id});
		});
	
}

//操作c_page_layout,c_page_blocks,c_page_block三张表
//先根据相应id进行判断，如果没有记录则新增，如果有记录则不进行任何操作
function update_page(page_id,page_url,prev_view_url,edit_page_url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res,_pool){
	var b_page_id = page_id;
	page_id = _pool.escape(page_id);
	var is_c_page_layout_update_sql = "SELECT 1 FROM c_page_layout pl WHERE pl.`c_page_id`="+page_id+" AND pl.`c_layout_id` = "+layout_id;
	
	console.log(is_c_page_layout_update_sql+'-----------------is_c_page_layout_update_sql');
	sqlclient.query(is_c_page_layout_update_sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){//如果查到进行更新,只需更新c_page_layout及c_generate_html_config表即可
			var c_page_layout_update_sql = "UPDATE c_page_layout SET project_name = "+project_name+",last_edit_time = NOW() WHERE c_layout_id = "+layout_id+" AND c_page_id = "+page_id;
			console.log(c_page_layout_update_sql+'-----------------c_page_layout_update_sql');
			sqlclient.query(c_page_layout_update_sql,function(err,rows,fields){
				if(err) throw err;
				console.log('c_page_layout更新成功！');

				var c_generate_html_config_update_sql = "UPDATE c_generate_html_config SET page_url = "+page_url+",prev_view_url = "+prev_view_url+",edit_page_url = "+edit_page_url+",last_edit_time = NOW() WHERE c_page_id = "+page_id+" AND c_layout_id = "+layout_id;
				sqlclient.query(c_generate_html_config_update_sql,function(err,rows,fields){
					if(err) throw err;
					console.log('c_generate_html_config更新成功！');
					res.json({reCode:1,msg:'更新成功',pid:b_page_id});
				});
				
			});

		}else{//如果未查到，直接添加
			add_page(b_page_id,page_url,prev_view_url,edit_page_url,project_name,layout_id,name,bs_id_obj,b_id_obj,sqlclient,res,_pool);
		}
	});

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
