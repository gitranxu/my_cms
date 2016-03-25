var express = require('express');
var router = express.Router(); 
var sqlclient = require('../lib/mysql_cli');
var crypto = require('crypto');
var uuid = require('node-uuid'); 

router.get('/get_all_users', function(req, res, next) {
	var get_all_users_sql = "SELECT * FROM c_user";
	console.log(get_all_users_sql+'-------------------------get_all_users_sql');
	sqlclient.init();
	sqlclient.query(get_all_users_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows});
	});
});

router.get('/cancel_user_url', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);

	var cancel_user_url_sql = "UPDATE c_user u SET u.`status` = '2' WHERE u.`id`="+user_id;
	console.log(cancel_user_url_sql+'-------------------------cancel_user_url_sql');
	sqlclient.query(cancel_user_url_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:"注销成功",reCode:1});
	});
});

router.get('/register_user_url', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);

	var register_user_url_sql = "UPDATE c_user u SET u.`status` = '1' WHERE u.`id`="+user_id;
	console.log(register_user_url_sql+'-------------------------register_user_url_sql');
	sqlclient.query(register_user_url_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:"注册成功",reCode:1});
	});
});

router.get('/get_all_btns', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);

	var get_all_btns_sql = "SELECT "+
							  " CASE "+
							    " (SELECT  "+
							      " COUNT(1)  "+
							    " FROM "+
							      " c_user_btns  "+
							    " WHERE user_id =  "+user_id+ 
							      " AND btns_id = b.id)  "+
							    " WHEN 0  "+
							    " THEN 0  "+
							    " ELSE 1  "+
							  " END flag, "+
							  " b.`name`, "+
							  " b.id "+
							" FROM "+
							 " c_btns b ";
	console.log(get_all_btns_sql+'-------------------------get_all_btns_sql');
	sqlclient.query(get_all_btns_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows});
	});
});

//得到某个用户某个页面未授权的模板列表
router.get('/get_unright_models_by_user_id_page_id', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var p_id = _pool.escape(req.query.p_id);
	var user_id = _pool.escape(req.query.user_id);
	var get_unright_models_by_user_id_page_id_sql = "SELECT DISTINCT "+
							  " d.`c_model_id`, "+
							  " (SELECT  "+
							    " c.`name`  "+
							  " FROM "+
							    " c_model c  "+
							  " WHERE c.id = d.`c_model_id`) `name`  "+
							" FROM "+
							  " c_data d  "+
							" WHERE d.`c_floor_id` IN  "+
							  " (SELECT  "+
							    " f.`c_floor_id`  "+
							  " FROM "+
							    " c_page_floor f  "+
							  " WHERE f.`c_page_id` = "+p_id+")  "+
							  " AND d.`c_model_id` NOT IN "+ 
							  " (SELECT  "+
							    " upm.model_id  "+
							  " FROM "+
							    " c_user_page_model upm  "+
							  " WHERE upm.`page_id` = "+p_id+"  "+
							    " AND upm.`user_id` = "+user_id+")";
	console.log(get_unright_models_by_user_id_page_id_sql+'-------------------------get_unright_models_by_user_id_page_id_sql');
	sqlclient.query(get_unright_models_by_user_id_page_id_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows});
	});
});

router.get('/get_all_pages', function(req, res, next) {
	var get_all_pages_sql = "SELECT * FROM c_page";
	console.log(get_all_pages_sql+'-------------------------get_all_pages_sql');
	sqlclient.init();
	sqlclient.query(get_all_pages_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows});
	});
});


//得到某个用户的已有的模板页的权限列表
router.get('/get_has_page_model_rights', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);
	var get_has_page_model_rights = "SELECT "+
							  " (SELECT  "+
							    " p.name  "+
							  " FROM "+
							    " c_page p  "+
							  " WHERE p.id = upm.page_id) p_name, "+
							" upm.page_id p_id,"+
							  " (SELECT  "+
							    " m.name  "+
							  " FROM "+
							    " c_model m  "+
							  " WHERE m.id = upm.`model_id`) m_name,  "+
							" upm.`model_id` m_id "+
							" FROM "+
							  " c_user_page_model upm  "+
							" WHERE upm.user_id = "+user_id;
	console.log(get_has_page_model_rights+'-------------------------get_has_page_model_rights');
	sqlclient.query(get_has_page_model_rights,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows});
	});
});

//给用户填加一条模板页权限
router.get('/add_page_model_right_url', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);
	var p_id = _pool.escape(req.query.p_id);
	var m_id = _pool.escape(req.query.m_id);

	var add_page_model_right_url_sql = "INSERT INTO c_user_page_model(id,user_id,page_id,model_id,create_time) VALUES(UUID(),"+user_id+","+p_id+","+m_id+",NOW())";
	console.log(add_page_model_right_url_sql+'-------------------------add_page_model_right_url_sql');
	sqlclient.query(add_page_model_right_url_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:'插入成功',reCode:1});
	});
});

router.get('/delete_page_model_right_url', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);
	var p_id = _pool.escape(req.query.p_id);
	var m_id = _pool.escape(req.query.m_id);

	var delete_page_model_right_url_sql = "DELETE FROM c_user_page_model WHERE user_id = "+user_id+" AND page_id = "+p_id+" AND model_id = "+m_id;
	console.log(delete_page_model_right_url_sql+'-------------------------delete_page_model_right_url_sql');
	sqlclient.query(delete_page_model_right_url_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:'删除成功',reCode:1});
	});
});

//给用户填加一条按钮权限
router.get('/add_btns_right_url', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);
	var btn_id = _pool.escape(req.query.btn_id);

	var add_btns_right_url_sql = "INSERT INTO c_user_btns(id,user_id,btns_id,create_time) VALUES(UUID(),"+user_id+","+btn_id+",NOW())";
	console.log(add_btns_right_url_sql+'-------------------------add_btns_right_url_sql');
	sqlclient.query(add_btns_right_url_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:'插入成功',reCode:1});
	});
});

router.get('/delete_btns_right_url', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_id = _pool.escape(req.query.user_id);
	var btn_id = _pool.escape(req.query.btn_id);

	var delete_btns_right_url_sql = "DELETE FROM c_user_btns WHERE user_id = "+user_id+" AND btns_id = "+btn_id;
	console.log(delete_btns_right_url_sql+'-------------------------delete_btns_right_url_sql');
	sqlclient.query(delete_btns_right_url_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:'删除成功',reCode:1});
	});
});

router.get('/is_user_exist', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_name = _pool.escape(req.query.user_name);

	var is_user_exist_sql = "SELECT COUNT(1) count FROM c_user u WHERE u.`name`="+user_name;
	console.log(is_user_exist_sql+'-------------------------is_user_exist_sql');
	sqlclient.query(is_user_exist_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows[0],reCode:1});
	});
});

router.post('/save_user', function(req, res, next) {
	var _pool = sqlclient.init()._pool;
	var user_old_id = req.body.user_id;
	var user_id = _pool.escape(user_old_id);
	var user_old_name = req.body.name;
	var user_name = _pool.escape(user_old_name);
	var password = _pool.escape(req.body.password);
	var sha1 = crypto.createHash('sha1');
	sha1.update(password);
	var mi_password = sha1.digest('hex');
	console.log('--------------------------------------111')
	console.log(user_id)
	if(user_id&&user_id.length>10){//更新操作
		var update_user_sql = "UPDATE c_user u SET u.name = "+user_name+",u.password='"+mi_password+"',create_time=NOW() WHERE u.id="+user_id;
		console.log(update_user_sql+'-------------------------update_user_sql');
		sqlclient.query(update_user_sql,function(err,rows,fields){
			if(err) throw err;
			res.json({msg:{id:user_old_id,name:user_old_name,type:2},reCode:1});
		});
	}else{//新增操作
		var uuid_s = uuid.v1();
		var save_user_sql = "INSERT INTO c_user(id,`name`,`password`,create_time) VALUES('"+uuid_s+"',"+user_name+",'"+mi_password+"',NOW())";
		console.log(save_user_sql+'-------------------------save_user_sql');
		sqlclient.query(save_user_sql,function(err,rows,fields){
			if(err) throw err;
			res.json({msg:{id:uuid_s,name:user_old_name,type:1},reCode:1});
		});
	}

		
});

module.exports = router;