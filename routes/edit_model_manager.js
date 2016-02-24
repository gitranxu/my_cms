var express = require('express');
var fs = require('fs');
var uuid = require('node-uuid'); 
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');


router.post('/saveOrUpdateModel',function(req,res,next){
	//console.log(req.body);
	var id = req.body.id;
	var name = req.body.name;
	var data = fs.readFileSync('public/model/'+req.body.content_name,"utf-8");
	data = data.replace(/\'/g,"\\\'");
	var saveOrUpdateModel_sql = "";
	var msg = "";
	if(id){//如果id有值，则为更新
		saveOrUpdateModel_sql = "UPDATE c_model c SET c.`name` = '"+req.body.name+"',c.`content` = '"+data+"',c.`content_name` = '"+req.body.content_name+"',c.`data_model` = '"+req.body.data_model+"',c.`img_url` = '"+req.body.img_url+"',"+"c.`render_type` = "+req.body.render_type+",c.`last_edit_time` = NOW(),c.`term_type` = "+req.body.term_type+",c.`model_height` = "+req.body.model_height+",c.`model_width` = "+req.body.model_width+",c.`model_type` = "+req.body.model_type+" "+" WHERE c.`id` = '"+id+"'";
		msg = "更新成功";
	}else{//如果id没值，则为新增
		saveOrUpdateModel_sql = "INSERT INTO c_model(id,`name`,content,content_name,data_model,img_url,render_type,create_time,last_edit_time,term_type,model_height,model_width,model_type) VALUES(UUID(),'"+req.body.name+"','"+data+"','"+req.body.content_name+"','"+req.body.data_model+"','"+req.body.img_url+"',"+req.body.render_type+",NOW(),NOW(),"+req.body.term_type+","+req.body.model_height+","+req.body.model_width+","+req.body.model_type+");";
		msg = "新增成功";
	}
	console.log(saveOrUpdateModel_sql+'---------------saveOrUpdateModel_sql');
	sqlclient.init();
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
	var id = req.body.id;
	var delModel_sql = "DELETE FROM c_model WHERE id = '"+id+"'";
	console.log(delModel_sql+'---------------delModel_sql');
	sqlclient.init();
	sqlclient.query(delModel_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({reCode:1,msg:'删除成功'});
	});
});




module.exports = router;


