var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var sys = require('sys');
var formidable = require('formidable');
var sqlclient = require('../lib/mysql_cli');
var router = express.Router();

//生成html文件
//prev_view_page_url="http://localhost:3000/projects/tmp/aaa.html" page_url="http://localhost:3000/projects/xx/aaa.html"

router.post('/generate_html', function(req, res, next) {
	var head = req.body.head;
	var body = req.body.body;
	var generate_type = req.body.generate_type;

	var pid = req.body.pid;
	var lid = req.body.lid;

	var html = "<!DOCTYPE html><html><head></head><body></body></html>";
	var $ = cheerio.load(html);
	$('head').append(head);
	$('body').append(body);
	$('.need_remove').remove();
	$('body').append('<script src="/javascripts/other/lunbo.js" id="back_create"></script>');

	var the_url = '';
	var generate_html_query_url_sql = "SELECT page_url,prev_view_url FROM c_generate_html_config WHERE c_page_id = '"+pid+"' AND c_layout_id = '"+lid+"'";
	console.log(generate_html_query_url_sql+'--------------------------------generate_html_query_url_sql');
	//根据pid,lid,generate_type去查询生成路径，查询出来后先检查一下，如果为空，说明还未配置，进行提醒
	sqlclient.init();
	sqlclient.query(generate_html_query_url_sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			if(generate_type == 1){//预览
				the_url = '/prevview' + rows[0].prev_view_url;
			}else{//正式
				the_url = '/official' + rows[0].page_url;
			}
			the_url = 'http://localhost:3000/generate_html'+the_url;
			var filename_with_houzhui = the_url.substring(the_url.lastIndexOf('/')+1);
			var tmp = the_url.substring(the_url.indexOf('//')+2);
			var path = tmp.substring(tmp.indexOf('/'),tmp.lastIndexOf('/')+1); //path两边都有/,例如：/projects/tmp/
			var file_full_url = 'public'+path+filename_with_houzhui;

			fs.exists('public'+path,function(exists){
				console.log('--------------------------------如果报错的话，看看public/generate_html/prevview(or official)目录有没有手动添加~！');
				if(!exists){//如果不存在，创建目录
					fs.mkdir('public'+path,function(err){
						if(err) throw err;
						fs.writeFile(file_full_url,$.html(),function(err){
							if(err) throw err;
							res.json({reCode:1,msg:'生成成功！',the_url:the_url});
						})
					});
				}else{
					fs.writeFile(file_full_url,$.html(),function(err){
						if(err) throw err;
						res.json({reCode:1,msg:'生成成功！',the_url:the_url});
					})
				}
			});

		}else{
			res.json({reCode:10003,msg:'未找到配置信息.'});
		}
	});

});

//图片上传
router.post('/upload',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.uploadDir = "public/images/upload";
	form.parse(req,function(err,fields,files){
		console.log(files);
		var s = files.content.path.lastIndexOf('\\');
		var path = files.content.path.substring(0,s+1);
		var img_path = path+files.content.name;
		fs.renameSync(files.content.path, img_path);
        res.json({reCode:1,img_path:img_path,msg:'上传成功'});
	});
});

//图片上传
router.post('/uploadImg',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.uploadDir = "public/images/upload";
	form.parse(req,function(err,fields,files){
		console.log(files);
		var s = files.content.path.lastIndexOf('\\');
		var path = files.content.path.substring(0,s+1);
		var img_path = path+files.content.name;
		fs.renameSync(files.content.path, img_path);
        res.json({reCode:1,img_path:img_path,msg:'上传成功'});
	});
});

//模板文件上传
router.post('/uploadmodel',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.uploadDir = "public/model";

	form.parse(req,function(err,fields,files){
		//console.log(files);
		var s = files.content.path.lastIndexOf('\\');
		var path = files.content.path.substring(0,s+1);
		var file_name = path+files.content.name;
		fs.renameSync(files.content.path, file_name);
        res.json({reCode:1,file_name:files.content.name,msg:'上传成功'});
	});
});


router.post('/generate_edit_html', function(req, res, next) {

	var pid = req.body.pid;
	var lid = req.body.lid;
	var edit_url = req.body.edit_url;

	var html = '<!DOCTYPE html>'+
				'<html lang="en">'+
				'<head>'+
					'<meta charset="UTF-8">'+
					'<title>编辑页面区</title>'+
					'<link rel="stylesheet" href="/stylesheets/base.css">'+
					'<link rel="stylesheet" href="/stylesheets/animate.min.css">'+
					'<link rel="stylesheet" href="/stylesheets/back_common.css" class="need_remove">'+
				'</head>'+
				'<body>'+
				  	'<div id="back"><div id="content"><div class="cntr" pid="'+pid+'" lid="'+lid+'"></div></div><div id="config" class="need_remove"></div></div>'+
					'<script src="/javascripts/other/jquery-1.9.1.min.js"></script>'+
					'<script src="/javascripts/other/ajaxfileupload.js" class="need_remove"></script>'+
					'<script src="/javascripts/other/juicer-min.js" class="need_remove"></script>'+
					'<script src="/javascripts/cms_back.js" class="need_remove"></script>'+
				'</body>'+
				'</html>';

	
	var the_url = 'http://localhost:3000/generate_html/edit'+edit_url;
	var filename_with_houzhui = the_url.substring(the_url.lastIndexOf('/')+1);
	var tmp = the_url.substring(the_url.indexOf('//')+2);
	var path = tmp.substring(tmp.indexOf('/'),tmp.lastIndexOf('/')+1); //path两边都有/,例如：/projects/tmp/
	var file_full_url = 'public'+path+filename_with_houzhui;

	fs.exists('public'+path,function(exists){
		console.log('--------------------------------如果报错的话，看看public/generate_html/edit目录有没有手动添加~！');
		if(!exists){//如果不存在，创建目录
			fs.mkdir('public'+path,function(err){
				if(err) throw err;
				fs.writeFile(file_full_url,html,function(err){
					if(err) throw err;
					res.json({reCode:1,msg:'生成成功！',the_url:the_url});
				})
			});
		}else{
			fs.writeFile(file_full_url,html,function(err){
				if(err) throw err;
				res.json({reCode:1,msg:'生成成功！',the_url:the_url});
			})
		}
	});

});


module.exports = router;
