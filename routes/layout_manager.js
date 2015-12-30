var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

/* GET users listing. */
router.get('/query', function(req, res, next) {
	sqlclient.init();
	sqlclient.query('SELECT id,name FROM  c_layout',function(err,rows,fields){
		if(err) throw err;
		res.status(200).json({ layout_list: rows });
	});
});
router.get('/layout_query_content_by_id', function(req, res, next) {

	var dataid = req.query.dataid;
	var sql = " SELECT l.content lc,cb.content cbc,cb.order cborder,cb.id cbid,b.content bc,b.order border "+
			" FROM c_layout l,c_blocks cb,c_block b "+
			" WHERE l.id = cb.layout_id "+
			" AND cb.id = b.c_blocks_id "+
			" AND l.id = "+dataid+
			" ORDER BY cb.order ASC,b.order ASC ";
	
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;

		if(rows.length){
			var $ = cheerio.load(rows[0].lc);//layout的主体

			for(var i = 0,j = rows.length;i < j;i++){

				var cb_content = rows[i].cbc;
				var cbid = rows[i].cbid;
				
				if(cb_content){

					
					var $2 = cheerio.load(cb_content);
					$2('.blocks_move').attr('id',cbid).attr('cb_order',rows[i].cborder);
					var cb_appended_length = $('.cntr').find('#'+cbid).length;

					if(!cb_appended_length){//如果不存在，加入
						$2('.blocks_move').append(rows[i].bc);//加入之前先把b_content加入
						$('.cntr').append($2.html());
					}else{//如果存在的话，则将b_content直接加入bc中
						$('#'+cbid).append(rows[i].bc);
					}
				}else{
					var $2 = cheerio.load(rows[i].bc);
					$2('.blocks_move').attr('id',cbid).attr('cb_order',rows[i].cborder);
					$('.cntr').append($2.html());
				}
			}

			res.status(200).send($.html());
		}else{
			res.send('');
		}

	});



	//1.通过dataid得到layout.content及cb_id数组
	//2.通过cb_id数组得到cb_content,及b_content,如果有cb_content则将其对应的b_content放入其中
		
});

module.exports = router;
