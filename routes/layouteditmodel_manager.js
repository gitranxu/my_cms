var express = require('express');
var cheerio = require('cheerio');
var howdo = require('howdo');
var uuid = require('node-uuid'); 
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');


router.post('/change_layout_status',function(req,res,next){
	var layout_id = req.body.layout_id;
	var cur_status = req.body.cur_status;
	var changed_status = 1;
	if(cur_status==1){
		changed_status = 2;
	}
	var change_layout_status_sql = "UPDATE c_layout l SET l.`valid` = "+changed_status+",last_edit_time = NOW() WHERE l.`id` = '"+layout_id+"'";
	console.log(change_layout_status_sql+'------------------------------------------change_layout_status_sql');
	sqlclient.init();
	sqlclient.query(change_layout_status_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'更改状态成功!',changed_status:changed_status});
	});
});

router.get('/query_layout_edit_model',function(req,res,next){
	var isfilter = req.query.isfilter;

	var query_layout_edit_model_sql = " SELECT l.`edit_model`,l.`name`,l.`id`,l.`img_url`,l.valid,l.type FROM c_layout l ORDER BY l.`type` ASC, l.`last_edit_time` DESC";

	if(isfilter==1){//1为过滤禁用记录,2或者空时为不用过滤禁用记录
		query_layout_edit_model_sql = " SELECT l.`edit_model`,l.`name`,l.`id`,l.`img_url`,l.valid,l.type FROM c_layout l WHERE l.valid = 1 ORDER BY l.`type` ASC, l.`last_edit_time` DESC";
	}

	
	console.log(query_layout_edit_model_sql+'------------------------------------------query_layout_edit_model_sql');
	sqlclient.init();
	sqlclient.query(query_layout_edit_model_sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			res.json({reCode:1,msg:rows});
		}else{
			res.json({reCode:10000,msg:'没有记录.'});
		}
	});
});

//得到某个页面中所有的楼层模板数据json,如果模板没有数据，则使用默认数据
router.post('/generate_layout',function(req,res,next){

	var cntr_html = req.body.cntr_html;
	var layout_name = req.body.layout_name;
	var img_url = req.body.img_url;

	//先根据layout_name去查询一下，如果该名字已存在，则给用户提示
	var is_layout_name_exist_sql = "SELECT 1 FROM c_layout l WHERE l.`name` = '"+layout_name+"'";
	console.log(is_layout_name_exist_sql+'------------------------------------------is_layout_name_exist_sql');
	sqlclient.init();
	sqlclient.query(is_layout_name_exist_sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			res.json({reCode:10005,msg:'当前布局名称已存在，请换用其他名称.'});
		}else{
			var $ = cheerio.load(cntr_html);
			$('.need_remove').remove();
			$('.need_move_width200').removeClass('need_move_width200');

			var layout_id = uuid.v1();

			var c_blocks_list = [];
			var c_block_list = [];

			$('.cntr .blocks_move').each(function(index){
				var c_blocks_info = {};
				var $this = $(this);//一个blocks
				var c_blocks_id = uuid.v1();
				var c_blocks_class = $this.attr('class');
				c_blocks_info.content = '<div class="'+c_blocks_class+'"></div>';
				c_blocks_info.layout_id = layout_id;
				c_blocks_info.id = c_blocks_id;
				c_blocks_info.default_order = index+1;
				c_blocks_info.child_num = $this.find('.c_block').length;//如果为0，则在c_block表中要插入一条记录，同时c_blocks中的content为NULL
				c_blocks_list.push(c_blocks_info);

				$this.find('.c_block').each(function(index){
					var c_block_info = {};
					var $c_block = $(this);
					var c_block_id = uuid.v1();
					var c_block_class = $c_block.attr('class');
					c_block_info.content = '<div class="'+c_block_class+'"></div>';
					c_block_info.c_blocks_id = c_blocks_id;
					c_block_info.id = c_block_id;
					c_block_info.default_order = index+1;
					c_block_info.siblings_num = c_blocks_info.child_num;//兄弟个数
					c_block_info.is_float = $c_block.hasClass('fl_rx') || $c_block.hasClass('fr_rx');
					c_block_list.push(c_block_info);
				});
			});


			//保存到c_layout,c_blocks,c_block三张表中
			var insert_into_c_layout_sql = "INSERT INTO c_layout(id,`name`,content,img_url,create_time,edit_model,last_edit_time) VALUES('"+layout_id+"','"+layout_name+"','<div class=\"cntr\"></div>','"+img_url+"',NOW(),'"+cntr_html+"',NOW())";

			howdo
				.task(function(done){
					console.log(insert_into_c_layout_sql+'------------------insert_into_c_layout_sql');
					sqlclient.query(insert_into_c_layout_sql,function(err,rows,fields){
						if(err) done(err,'c_layout插入失败！');
						console.log('c_layout插入成功！');
						done(null,'c_floor插入成功！');
					});
				})
				.task(function(done){
					howdo
						.each(c_blocks_list,function(key,val,next,data){
							if(data){
								insert_blocks(sqlclient,data,function(){
									next(null,val);
								});
							}else{
								next(null,val);
							}
						})
						.follow()
						.try(function(data){
							insert_blocks(sqlclient,data,function(){
								done(null,'c_blocks批量插入成功!')
							});
						})
						.catch(function(err){
							console.log('c_blocks批量插入出错!');
							done('c_blocks批量插入出错!')
						});
				})
				.task(function(done){
					howdo
						.each(c_block_list,function(key,val,next,data){
							if(data){
								insert_block(sqlclient,data,function(){
									next(null,val);
								});
							}else{
								next(null,val);
							}
						})
						.follow()
						.try(function(data){
							insert_block(sqlclient,data,function(){
								done(null,'c_block批量插入成功!')
							});
						})
						.catch(function(err){
							console.log('c_block批量插入出错!');
							done('c_block批量插入出错!')
						});
					
				})
				.follow()
				.try(function(){
					console.log('插入成功');
					res.json({reCode:1,msg:'插入成功!'});
				})
				.catch(function(err){
					console.log(err);
					res.json({reCode:10002,msg:'插入失败'});
				});
		}
	});

			

});

function insert_blocks(sqlclient,data,fn){

	var old_content = data.content;//如果需要在c_block表中插入记录时，需要先保存到这个变量中
	var insert_into_c_blocks_sql = "INSERT INTO c_blocks(id,content,c_layout_id,create_time,default_order) VALUES('"+data.id+"','"+data.content+"','"+data.layout_id+"',NOW(),"+data.default_order+");";
	if(data.child_num==0){//如果为0，1.它本身的content为NULL，2.向c_block表里加入一条记录
		insert_into_c_blocks_sql = "INSERT INTO c_blocks(id,c_layout_id,create_time,default_order) VALUES('"+data.id+"','"+data.layout_id+"',NOW(),"+data.default_order+");";
	}
	
	console.log(insert_into_c_blocks_sql+'------------------insert_into_c_blocks_sql');
	sqlclient.query(insert_into_c_blocks_sql,function(err,rows,fields){
		if(err) console.log('c_blocks插入失败！');
		console.log('c_blocks插入成功！');
		if(data.child_num==0){//2.向c_block表里加入一条记录
			data.content = null;
			var insert_into_c_block_sql = "INSERT INTO c_block(id,content,c_blocks_id,create_time,default_order) VALUES(UUID(),'"+old_content+"','"+data.id+"',NOW(),"+1+");";
			console.log(insert_into_c_block_sql+'------------------insert_into_c_block_sql');
			sqlclient.query(insert_into_c_block_sql,function(err,rows,fields){
				if(err) console.log('c_block单独插入失败！');
				console.log('c_block单独插入成功！');
				fn&&fn();
			});
		}else{
			fn&&fn();
		}

	});
}

function insert_block(sqlclient,data,fn){
	console.log(data);
	console.log('--------------------999');
	if(data){
		var insert_into_c_block_sql = "INSERT INTO c_block(id,content,c_blocks_id,create_time,default_order) VALUES('"+data.id+"','"+data.content+"','"+data.c_blocks_id+"',NOW(),"+data.default_order+");";

		if(data.is_float){
			var default_style = 'width:'+Math.floor(100/data.siblings_num)+'%!important;';
			insert_into_c_block_sql = "INSERT INTO c_block(id,content,c_blocks_id,create_time,default_order,default_style) VALUES('"+data.id+"','"+data.content+"','"+data.c_blocks_id+"',NOW(),"+data.default_order+",'"+default_style+"');";
		}

		console.log(insert_into_c_block_sql+'------------------insert_into_c_block_sql');
		sqlclient.query(insert_into_c_block_sql,function(err,rows,fields){

			if(err) console.log('c_block插入失败！');
			console.log('c_block插入成功！');

			fn&&fn();

		});
	}else{
		fn&&fn();
	}
		
}

module.exports = router;


