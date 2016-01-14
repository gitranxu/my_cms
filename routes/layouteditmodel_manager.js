var express = require('express');
var cheerio = require('cheerio');
var howdo = require('howdo');
var uuid = require('node-uuid'); 
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

//得到某个页面中所有的楼层模板数据json,如果模板没有数据，则使用默认数据
router.post('/generate_layout',function(req,res,next){

	var cntr_html = req.body.cntr_html;
	var layout_name = req.body.layout_name;
	var img_url = req.body.img_url;

	var $ = cheerio.load(cntr_html);
	$('.need_remove').remove();
	$('.need_move_width200').removeClass('need_move_width200');

	var layout_id = uuid.v1();

	var c_blocks_obj = [];
	var c_block_obj = [];

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
		c_blocks_obj.push(c_blocks_info);

		$this.find('.c_block').each(function(index){
			var c_block_info = {};
			var $c_block = $(this);
			var c_block_id = uuid.v1();
			var c_block_class = $c_block.attr('class');
			c_block_info.content = '<div class="'+c_block_class+'"></div>';
			c_block_info.c_blocks_id = c_blocks_id;
			c_block_info.id = c_block_id;
			c_block_info.default_order = index+1;
			c_block_obj.push(c_block_info);
		});
	});


	//保存到c_layout,c_blocks,c_block三张表中
	var insert_into_c_layout_sql = "INSERT INTO c_layout(id,`name`,content,img_url,create_time) VALUES('"+layout_id+"','"+layout_name+"','<div class=\"cntr\"></div>','"+img_url+"',NOW())";

	howdo
		.task(function(done){
			console.log(insert_into_c_layout_sql+'------------------insert_into_c_layout_sql');
			sqlclient.init();
			sqlclient.query(insert_into_c_layout_sql,function(err,rows,fields){
				if(err) done(err,'c_layout插入失败！');
				console.log('c_layout插入成功！');
				done(null,'c_floor插入成功！');
			});
		})
		.task(function(done){
			howdo
				.each(c_blocks_obj,function(key,val,next,data){
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
				.each(c_block_obj,function(key,val,next,data){
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
					insert_blocks(sqlclient,data,function(){
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

	var insert_into_c_block_sql = "INSERT INTO c_block(id,content,c_blocks_id,create_time,default_order) VALUES('"+data.id+"','"+data.content+"','"+data.c_blocks_id+"',NOW(),"+data.default_order+");";
	console.log(insert_into_c_block_sql+'------------------insert_into_c_block_sql');
	sqlclient.query(insert_into_c_block_sql,function(err,rows,fields){

		if(err) console.log('c_block插入失败！');
		console.log('c_block插入成功！');

		fn&&fn();

	});
}

module.exports = router;


