var express = require('express');
var fs = require('fs');
var uuid = require('node-uuid'); 
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');


router.post('/saveOrUpdateModel',function(req,res,next){
	var _pool = sqlclient.init()._pool;
	var id = req.body.id;
	var name = _pool.escape(req.body.name);
	var content_name = _pool.escape(req.body.content_name);
	var render_type = _pool.escape(req.body.render_type);
	var term_type = _pool.escape(req.body.term_type);
	var model_height = _pool.escape(req.body.model_height);
	var model_width = _pool.escape(req.body.model_width);
	var model_type = _pool.escape(req.body.model_type);
	var img_url = _pool.escape(req.body.img_url);

	var data = fs.readFileSync('public/model/'+req.body.content_name,"utf-8");
	//这里对data进行一个校验，如果不是以<div class="c_model css_namespace开始，则格式不对

	//data = _pool.escape(data.replace(/\'/g,"\\\'"));
	//var data_model = _pool.escape(req.body.data_model.replace(/\'/g,"\\\'"));
	data = _pool.escape(data);
	var data_model = _pool.escape(req.body.data_model);

	var saveOrUpdateModel_sql = "";
	var msg = "";
	if(id){//如果id有值，则为更新
		saveOrUpdateModel_sql = "UPDATE c_model c SET c.`name` = "+name+",c.`content` = "+data+",c.`content_name` = "+content_name+",c.`data_model` = "+data_model+",c.`img_url` = "+img_url+","+"c.`render_type` = "+render_type+",c.`last_edit_time` = NOW(),c.`term_type` = "+term_type+",c.`model_height` = "+model_height+",c.`model_width` = "+model_width+",c.`model_type` = "+model_type+" "+" WHERE c.`id` = "+_pool.escape(id);
		//console.log(1);
		msg = "更新成功";
	}else{//如果id没值，则为新增
		saveOrUpdateModel_sql = "INSERT INTO c_model(id,`name`,content,content_name,data_model,img_url,render_type,create_time,last_edit_time,term_type,model_height,model_width,model_type) VALUES(UUID(),"+name+","+data+","+content_name+","+data_model+","+img_url+","+render_type+",NOW(),NOW(),"+term_type+","+model_height+","+model_width+","+model_type+");";
		msg = "新增成功";
		//console.log(2);
	}
	console.log(saveOrUpdateModel_sql+'---------------saveOrUpdateModel_sql');
	//sqlclient.init();
	sqlclient.query(saveOrUpdateModel_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:msg});//这里调用一个查询模板列表方法，然后跳转到一个HTML页面
		//res.render('index.html',{abc:'test'});
	});
});

router.get('/allModel',function(req,res,next){
	var sql = "SELECT * FROM c_model ORDER BY last_edit_time DESC ";
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:rows});
	});
});

router.post('/delModel',function(req,res,next){
	var _pool = sqlclient.init()._pool;
	var id = _pool.escape(req.body.id);

	var delModel_sql = "DELETE FROM c_model WHERE id = "+id;
	console.log(delModel_sql+'---------------delModel_sql');
	sqlclient.init();
	sqlclient.query(delModel_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'删除成功'});
	});
});




module.exports = router;


