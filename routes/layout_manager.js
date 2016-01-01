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
	/*var sql = " SELECT l.content lc,cb.content cbc,cb.order cborder,cb.id cbid,b.content bc,b.order border,b.id bid "+
			" FROM c_layout l,c_blocks cb,c_block b "+
			" WHERE l.id = cb.layout_id "+
			" AND cb.id = b.c_blocks_id "+
			" AND l.id = '"+dataid+
			"' ORDER BY cb.order ASC,b.order ASC ";*/
	var sql = "SELECT b.*,cm.id 'mid',cm.content mc FROM ( "+
				" SELECT a.*,f.`content` fc,f.id fid,f.order forder FROM ( "+
				" SELECT l.content lc,bs.content bsc,bs.order bsorder,bs.id bsid,b.content bc,b.order border,b.id bid   "+
				  " FROM c_layout l,c_blocks bs,c_block b   "+
				 " WHERE l.id = bs.layout_id   "+
				   " AND bs.id = b.c_blocks_id   "+
				   " AND l.id = '"+dataid+"'  "+
				 " ) a LEFT JOIN c_floor f "+
				 " ON a.bid = f.`c_block_id`) b LEFT JOIN c_model cm "+
				 " ON b.fid = cm.c_floor_id "+
				 " ORDER BY b.bsorder ASC,b.border ASC,b.forder ASC";
		//console.log(sql+'-----sql');
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;

		if(rows.length){
			var $ = cheerio.load(rows[0].lc);//layout的主体

			for(var i = 0,j = rows.length;i < j;i++){

				var bs_content = rows[i].bsc;
				var bsid = rows[i].bsid;
				var bid = rows[i].bid;

				if(bs_content){ //如果bs_content存在

					var bs_appended_length = $('.cntr').find('#'+bsid).length;
					if(!bs_appended_length){ //如果不存在，加入bs_content
						var $2 = cheerio.load(bs_content);
						$2('.blocks_move').attr('id',bsid).attr('bs_order',rows[i].bsorder);
						$('.cntr').append($2.html());
					}
					//加入bs_content后，下一步加入c_block
					var b_appended_length = $('.cntr').find('.c_block[bid="'+bid+'"]').length;
					if(!b_appended_length){//如果不存在，加入b_content
						var $3 = cheerio.load(rows[i].bc);
						$3('.c_block').attr('bid',rows[i].bid).attr('b_order',rows[i].border);
						$('.cntr').find('#'+bsid).append($3.html());
					}

					block_append_floor($('.cntr').find('.c_block[bid="'+bid+'"]'),rows[i]);



				}else{//如果bs_content不存在
					var $2 = cheerio.load(rows[i].bc);
					$2('.blocks_move').attr('id',bsid).attr('bid',rows[i].bid).attr('bs_order',rows[i].bsorder);
					$('.cntr').append($2.html());

					block_append_floor($2('.c_block[bid="'+bid+'"]'),rows[i]);
				}
			}
			res.status(200).send($.html());
		}else{
			res.send('');
		}

	});



});


function block_append_floor($obj,row_obj){
	if(row_obj.fid){
		$obj.append(row_obj.fc).find('.c_floor').not('[fid]').attr('fid',row_obj.fid);
		floor_append_model($obj.find('.c_floor[fid="'+row_obj.fid+'"]'),row_obj);
	}
	
}

function floor_append_model($obj,row_obj){
	if(row_obj.mid){
		$obj.append(row_obj.mc).find('.c_model').attr('mid',row_obj.mid);
	}
}

module.exports = router;
