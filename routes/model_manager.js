var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var juicer = require('juicer');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

router.get('/query', function(req, res, next) {
	sqlclient.init();
	sqlclient.query('SELECT id,name FROM  c_model',function(err,rows,fields){
		if(err) throw err;
		res.status(200).json({ list: rows });
	});
});


router.get('/get_img_data_by_fidmid', function(req, res, next) {
	var sql = '';
	sqlclient.init();
	sqlclient.query('SELECT id,name FROM  c_model',function(err,rows,fields){
		if(err) throw err;
		res.status(200).json({ list: rows });
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
					" SELECT   m.content,m.`data_model`,m.`id` "+
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
			var tmpl = ($('.tmpl').html());
			var data = rows[0].data;
			if(!data){
				data = rows[0].data_model;
			}

			var html = juicer(tmpl,{model_list : eval('('+data+')')});
			$('.tmpl').remove();
			$('.translated').append(html);


			res.json({reCode:1,msg:$.html()});
		}else{
			res.json({reCode:10000,msg:''});
		}
		
		//res.status(200).json({ list: rows });
	});
});

module.exports = router;
