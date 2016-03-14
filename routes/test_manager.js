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

module.exports = router;