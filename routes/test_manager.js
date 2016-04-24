var express = require('express');
var router = express.Router(); 
var sqlclient = require('../lib/mysql_cli');


router.get('/get_product_count', function(req, res, next) {
	var product_name = req.query.product_name;
	var cp_name = req.query.cp_name;
	var wl_no = req.query.wl_no;
	var cp_no = req.query.cp_no;
	var sale_type = req.query.sale_type;
	var term_type = req.query.term_type;

	var query_sql = "";
	if(product_name.replace(/\s*/,"")!=""){
		query_sql += " AND product_name = '"+product_name+"' ";
	}
	if(cp_name.replace(/\s*/,"")!=""){
		query_sql += " AND cp_name = '"+cp_name+"' ";
	}
	if(wl_no.replace(/\s*/,"")!=""){
		query_sql += " AND wl_no = '"+wl_no+"' ";
	}
	if(cp_no.replace(/\s*/,"")!=""){
		query_sql += " AND cp_no = '"+cp_no+"' ";
	}
	if(sale_type.replace(/\s*/,"")!=""){
		query_sql += " AND sale_type = '"+sale_type+"' ";
	}
	if(term_type.replace(/\s*/,"")!=""){
		if(term_type==1){//不区分
			query_sql += " AND 1=1 ";
		}else{
			query_sql += " AND term_type = '"+term_type+"' ";
		}
		
	}

	var get_product_count_sql = "SELECT COUNT(1) pcount FROM test_product WHERE 1=1 "+query_sql;
	console.log(get_product_count_sql+'-------------------------get_product_count_sql');
	sqlclient.init();
	sqlclient.query(get_product_count_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows[0].pcount});
	});
});

router.get('/get_products_of_one_page', function(req, res, next) {
	var display = req.query.display;
	var page_now = req.query.page_now;

	var product_name = req.query.product_name;
	var cp_name = req.query.cp_name;
	var wl_no = req.query.wl_no;
	var cp_no = req.query.cp_no;
	var sale_type = req.query.sale_type;
	var term_type = req.query.term_type;

	var query_sql = "";
	if(product_name.replace(/\s*/,"")!=""){
		query_sql += " AND product_name = '"+product_name+"' ";
	}
	if(cp_name.replace(/\s*/,"")!=""){
		query_sql += " AND cp_name = '"+cp_name+"' ";
	}
	if(wl_no.replace(/\s*/,"")!=""){
		query_sql += " AND wl_no = '"+wl_no+"' ";
	}
	if(cp_no.replace(/\s*/,"")!=""){
		query_sql += " AND cp_no = '"+cp_no+"' ";
	}
	if(sale_type.replace(/\s*/,"")!=""){
		query_sql += " AND sale_type = '"+sale_type+"' ";
	}
	if(term_type.replace(/\s*/,"")!=""){
		if(term_type==1){//不区分
			query_sql += " AND 1=1 ";
		}else{
			query_sql += " AND term_type = '"+term_type+"' ";
		}
	}

	var get_products_of_one_page_sql = "SELECT * FROM test_product WHERE 1=1 "+query_sql+" LIMIT "+(page_now-1)*display+","+display+";";
	console.log(get_products_of_one_page_sql+'---------------------------get_products_of_one_page_sql');
	sqlclient.init();
	sqlclient.query(get_products_of_one_page_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows});
	});
});

//以下接口通过nginx反向代理，用作懂的通讯本地开发时调试
router.get('/get_productS', function(req, res, next) {
	var yys = req.query.yys;
	var own_province = req.query.own_province;
	var own_city = req.query.own_city;
	var productC_name = req.query.productC_name;
	var productS_code = req.query.productS_code;
	var productS_name = req.query.productS_name;
	var status = req.query.status;
	var package_ID = req.query.package_ID;
	var package_price = req.query.package_price;

	var query_sql = "SELECT s.*,(CASE s.status WHEN 1 THEN '已分配套餐' WHEN 2 THEN '已分配产品' WHEN 3 THEN '产品上架' WHEN 4 THEN '产品下架' WHEN 5 THEN '删除' ELSE '状态不明' END) status_show,(CASE s.yys WHEN 1 THEN '中国电信' ELSE '状态不明' END) yys_show,(CASE s.own_province WHEN 1 THEN '北京' WHEN 2 THEN '上海' WHEN 3 THEN '天津' WHEN 4 THEN '安徽' ELSE '其他' END) own_province_show,(CASE s.own_city WHEN 1 THEN '北京' WHEN 2 THEN '上海' WHEN 3 THEN '天津' WHEN 4 THEN '合肥' ELSE '其他' END) own_city_show FROM productS s  WHERE 1=1 ";
	if(yys!=""){
		if(yys==0){//不区分
			query_sql += " AND 1=1 ";
		}else{
			query_sql += " AND yys = '"+yys+"' ";
		}
	}
	if(own_province!=""){
		if(own_province==0){//不区分
			query_sql += " AND 1=1 ";
		}else{
			query_sql += " AND own_province = '"+own_province+"' ";
		}
		
	}
	if(own_city!=""){
		if(own_city==0){//不区分
			query_sql += " AND 1=1 ";
		}else{
			query_sql += " AND own_city = '"+own_city+"' ";
		}
		
	}
	if(productC_name.replace(/\s*/,"")!=""){
		query_sql += " AND productC_name = '"+productC_name+"' ";
	}
	if(productS_code.replace(/\s*/,"")!=""){
		query_sql += " AND productS_code = '"+productS_code+"' ";
	}

	if(productS_name.replace(/\s*/,"")!=""){
		query_sql += " AND productS_name = '"+productS_name+"' ";
	}
	if(status!=""){
		if(status==0){//不区分
			query_sql += " AND 1=1 ";
		}else{
			query_sql += " AND status = '"+status+"' ";
		}
		
	}
	if(package_ID.replace(/\s*/,"")!=""){
		query_sql += " AND package_ID = '"+package_ID+"' ";
	}
	if(package_price.replace(/\s*/,"")!=""){
		query_sql += " AND package_price = '"+package_price+"' ";
	}
	
	console.log(query_sql+'-------------------query_sql');
	sqlclient.init();
	sqlclient.query(query_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({msg:rows});
	});
});

//online
//以下接口通过nginx反向代理，用作懂的通讯本地开发时调试
router.get('/online', function(req, res, next) {
	var ids = req.query.cpgid;
	var query_ids = get_query_ids(ids);
	console.log(query_ids);
	
	//上架操作
	var online_sql = "UPDATE productS s SET s.`status` = 3 WHERE s.`id` IN ("+query_ids+")";

	console.log(online_sql+'-------------------online_sql');
	sqlclient.init();
	sqlclient.query(online_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({errorCode:0});
	});
});

//downline
router.get('/downline', function(req, res, next) {
	var ids = req.query.cpgid;
	var query_ids = get_query_ids(ids);
	console.log(query_ids);
	
	var downline_sql = "UPDATE productS s SET s.`status` = 4 WHERE s.`id` IN ("+query_ids+")";

	console.log(downline_sql+'-------------------downline_sql');
	sqlclient.init();
	sqlclient.query(downline_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({errorCode:0});
	});
});

//delete
router.get('/delete', function(req, res, next) {
	var ids = req.query.cpgid;
	var query_ids = get_query_ids(ids);
	console.log(query_ids);
	
	var delete_sql = "UPDATE productS s SET s.`status` = 5 WHERE s.`id` IN ("+query_ids+")";

	console.log(delete_sql+'-------------------delete_sql');
	sqlclient.init();
	sqlclient.query(delete_sql,function(err,rows,fields){
		if(err) throw err;
		res.json({errorCode:0});
	});
});

//返回运营商接口信息
router.get('/getallcactelecomoperators', function(req, res, next) {
	res.json({errorCode:0,datas:[{id:"1111111",telcode:1,describe:"中国电信"},{id:"1111112",telcode:2,describe:"中国移动"}]});
});

//返回套餐状态接口信息
router.get('/getpackagestatus', function(req, res, next) {
	res.json({errorCode:0,datas:[{id:"aaa",code:1,describe:"已分配套餐"},{id:"bbb",code:2,describe:"已分配产品"},{id:"ccc",code:3,describe:"产品上架"},{id:"ddd",code:4,describe:"产品下架"},{id:"eee",code:5,describe:"删除"}]});
});


function get_query_ids(ids){
	var query_ids = "";
	if(ids){
		var arr = ids.split(',');
		for(var i = 0,j = arr.length;i < j;i++){
			query_ids += "'"+arr[i]+"',";
		}
		query_ids = query_ids.substring(0,query_ids.length-1);
	}
	return query_ids;
}

module.exports = router;