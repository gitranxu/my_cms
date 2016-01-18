var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var juicer = require('juicer');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

router.get('/query', function(req, res, next) {
	var fid = req.query.fid;
	var pid = req.query.pid;
	var f_width = req.query.f_width;

	var filter_model_sql = "SELECT model_type,term_type,query_height FROM c_page_floor WHERE c_floor_id = '"+fid+"' AND c_page_id = '"+pid+"'";
	console.log(filter_model_sql+'------------filter_model_sql');
	sqlclient.init();
	sqlclient.query(filter_model_sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			var model_type = rows[0].model_type;//如果为综合，则查找全部，否则直等
			var term_type = rows[0].term_type;
			var query_height = rows[0].query_height; //如果为0，则查找全部，否则直等

			var query_model_sql = "SELECT id,name,img_url FROM c_model WHERE term_type ="+term_type+" AND model_width="+f_width;

			if(model_type!=1){//如果不为综合，则直等
				query_model_sql += " AND `model_type`="+model_type;
			}
			if(query_height!=0){
				query_model_sql += " AND `model_height`="+query_height;
			}
			console.log(query_model_sql+'------------query_model_sql');
			sqlclient.query(query_model_sql,function(err,rows,fields){
				if(err) throw err;
				if(rows.length){
					res.json({reCode:1,msg:rows});
				}else{
					res.json({reCode:10000,msg:"没有符合条件的模板"});
				}
			});

		}else{
			res.json({reCode : 10000,msg:"查询模板过滤条件时，记录为空..."});
		}
	});


			
});


router.get('/get_img_data_by_fidmid', function(req, res, next) {
	var fid = req.query.fid;
	var mid = req.query.mid;
	var sql = 'SELECT '+
				  ' d.data, '+
				  ' m.data_model '+ 
				' FROM '+
				  ' c_data d, '+
				  ' c_model m '+ 
				' WHERE d.c_model_id = m.id '+ 
				  ' AND d.c_floor_id = "'+fid+'" '+ 
				  ' AND d.c_model_id = "'+mid+'"';
	console.log(sql+'-----------------get_img_data_by_fidmid');
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			var data = '';
			if(rows[0].data){
				data = rows[0].data;
			}else{
				data = rows[0].data_model;
			}
			res.json({reCode:1,msg:data});
		}else{
			res.json({reCode:10000,msg:""});
		}
	});
});


//1.得到tmp	2.得到data
//如果有数据，取数据，如果没有，则取默认数据
//得到模板，将tmpl去掉，将解析的加到translate元素中
router.get('/model_query_content_data_by_id', function(req, res, next) {
	var mid = req.query.mid;
	var fid = req.query.fid;
	var sql = "SELECT a.*,b.data "+
				  " FROM ( "+
					" SELECT   m.content,m.`data_model`,m.`id`,m.render_type mrendertype "+
					" FROM c_model m  "+
					" WHERE m.id = '"+mid+"' "+
					" ) a LEFT JOIN  "+
					" (SELECT d.`c_model_id`,d.`data`  "+
					" FROM c_data d  "+
					" WHERE d.`c_floor_id`='"+fid+"') b "+
				   " ON a.id = b.`c_model_id`";
	console.log(sql+'------------------------model_query_content_data_by_id_sql');
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){

			var $ = cheerio.load(rows[0].content);
			var mrendertype = rows[0].mrendertype;

			if(mrendertype==2){//模板类型为2时进行这样的处理
				var tmpl = ($('.tmpl').html());
				var data = rows[0].data;
				if(!data){
					data = rows[0].data_model;
				}
				//console.log(data+'---------------------data');
				//console.log(tmpl+'---------------------tmpl');
				var html = juicer(tmpl,eval('('+data+')'));
				//console.log(html+'---------------------html');
				$('.tmpl').remove();
				$('.translated').append(html);
			}else if(mrendertype==1){
				console.log('普通HTML模板不需要进行juicer处理');
			}


			$('.c_model').attr('mid',rows[0].id).attr('mrendertype',mrendertype);
			res.json({reCode:1,msg:$.html()});
		}else{
			res.json({reCode:10000,msg:''});
		}
		
		//res.status(200).json({ list: rows });
	});
});

module.exports = router;
