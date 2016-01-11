var express = require('express');
var cheerio = require('cheerio');//后台经量的jquery
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');

/* GET users listing. */
router.get('/query', function(req, res, next) {
	var query_all_layout = "SELECT id,name,img_url t_url FROM  c_layout";
	console.log(query_all_layout+'--------------------query_all_layout');
	sqlclient.init();
	sqlclient.query(query_all_layout,function(err,rows,fields){
		if(err) throw err;
		res.status(200).json({ list: rows });
	});
});
router.get('/layout_query_content_by_id', function(req, res, next) {

	//var layoutid = req.query.layoutid;'"+layoutid+"'
	var pageid = req.query.pid;
	var layoutid = req.query.lid;
	var core_sql = "SELECT "+
					  " b.*, "+
					  " cm.id 'mid', "+
					  " cm.content mc, "+
					  " cm.type mtype  "+
					" FROM "+
					  " (SELECT  "+
					    " a.*, "+
					    " f.`content` fc, "+
					    " f.id fid, "+
					    " f.order forder, "+
					    " f.style fstyle  "+
					  " FROM "+
					    " (SELECT  "+
					      " l.content lc, "+
					      " bs.content bsc, "+
					      " pbs.order bsorder, "+
					      " pbs.`style` bsstyle, "+
					      " bs.id bsid, "+
					      " b.content bc, "+
					      " pb.order border, "+
					      " pb.`style` bstyle, "+
					      " b.id bid  "+
					    " FROM "+
					      " c_layout l, "+
					      " c_blocks bs, "+
					      " c_block b, "+
					      " c_page_blocks pbs, "+
					      " c_page_block pb  "+
					    " WHERE l.id = bs.c_layout_id  "+
					      " AND bs.id = b.c_blocks_id  "+
					      " AND bs.id = pbs.`c_blocks_id` "+ 
					      " AND b.id = pb.c_block_id  "+
					      " AND l.id = '"+layoutid+"'  "+
					      " AND pbs.`c_page_id` = '"+pageid+"'  "+
					      " AND pb.`c_page_id` = '"+pageid+"') a "+ 
					    " LEFT JOIN  "+
					      " (SELECT  "+
					        " cf.`content`, "+
					        " cf.`id`, "+
					        " cf.`c_block_id`, "+
					        " pf.`order`, "+
					        " pf.`style`  "+
					      " FROM "+
					        " c_floor cf, "+
					        " c_page_floor pf  "+
					      " WHERE cf.`id` = pf.`c_floor_id` "+ 
					        " AND pf.`c_page_id` = '"+pageid+"') f "+ 
					      " ON a.bid = f.`c_block_id`) b  "+
					  " LEFT JOIN  "+
					    " (SELECT  "+
					      " f.`id` c_floor_id, "+
					      " m.`content`, "+
					      " m.`id`, "+
					      " m.type  "+
					    " FROM "+
					      " c_floor f, "+
					      " c_model m, "+
					      " c_data d  "+
					    " WHERE f.`id` = d.`c_floor_id`  "+
					      " AND d.`c_model_id` = m.`id` "+ 
					      " AND d.`connect_time` =  "+
					      " (SELECT  "+
					        " MAX(d1.connect_time)  "+
					      " FROM "+
					        " c_data d1  "+
					      " WHERE d1.`c_floor_id` = f.`id`)) cm  "+
					    " ON b.fid = cm.c_floor_id  "+
					" ORDER BY b.bsorder ASC, "+
					  " b.border ASC, "+
					 " b.forder ASC ";
				 
		console.log(core_sql+'-----layout_query_content_by_id(core_sql)');
	sqlclient.init();
	sqlclient.query(core_sql,function(err,rows,fields){
		if(err) throw err;

		if(rows.length){
			var $ = cheerio.load(rows[0].lc);//layout的主体

			var css_obj = {};
			var css_s = "";
			for(var i = 0,j = rows.length;i < j;i++){

				var bs_content = rows[i].bsc;
				var bsid = rows[i].bsid;
				var bid = rows[i].bid;

				css_obj[rows[i].bsid] = rows[i].bsstyle;
				css_obj[rows[i].bid] = rows[i].bstyle;
				css_obj[rows[i].fid] = rows[i].fstyle;


				if(bs_content){ //如果bs_content存在

					var bs_appended_length = $('.cntr').find('#'+bsid).length;
					if(!bs_appended_length){ //如果不存在，加入bs_content
						var $2 = cheerio.load(bs_content);
						$2('.blocks_move').attr('id',bsid).attr('bs_order',rows[i].bsorder).addClass('c_'+bsid);
						$('.cntr').append($2.html());
					}
					//加入bs_content后，下一步加入c_block
					var b_appended_length = $('.cntr').find('.c_block[bid="'+bid+'"]').length;
					if(!b_appended_length){//如果不存在，加入b_content
						var $3 = cheerio.load(rows[i].bc);
						$3('.c_block').attr('bid',rows[i].bid).attr('b_order',rows[i].border).addClass('c_'+rows[i].bid);;
						//如果bs_content里面有wrap1200元素，则b_content加入到该元素下面
						var $wrap1200 = $('#'+bsid).find('.wrap1200');
						if($wrap1200.length){
							$wrap1200.append($3.html());
						}else{
							$('#'+bsid).append($3.html());
						}
						
					}

					block_append_floor($('.cntr').find('.c_block[bid="'+bid+'"]'),rows[i]);



				}else{//如果bs_content不存在,这种的元素同时居有id,bid属性，利用哪个找都可以确定该元素是不是已经存在了

					var $2 = cheerio.load(rows[i].bc);
					$2('.blocks_move').attr('id',bsid).attr('bid',rows[i].bid).attr('bs_order',rows[i].bsorder).addClass('c_'+bsid);
					var b_appended_length = $('.cntr').find('#'+bsid).length;
					if(!b_appended_length){//如果不存在
						$('.cntr').append($2.html());
					}

					block_append_floor($('#'+bsid),rows[i]);
				}
			}

			for(var i in css_obj){

				if(i=='null'||i==null){
					continue;
				}
				css_s += '.c_'+i+'{'+css_obj[i]+'}';
			}
			$('.cntr > style').prepend(css_s);
			$('.cntr').attr('pid',pageid).attr('lid',layoutid);
			res.status(200).send($.html());
			
		}else{
			res.send('');
		}

	});



});

//得到某个页面中所有的楼层模板数据json,如果模板没有数据，则使用默认数据
router.post('/get_floor_model_datas_of_layout',function(req,res,next){
	var queryparams = req.body.queryparams;
	if(!queryparams){
		res.json({reCode:10001,msg:'传入的参数违法'});
		return;
	}
	var sql = "SELECT d.data,d.c_floor_model_id c_floor_model_id,m.data_model "+
				"  FROM c_data d,c_model m "+
				" WHERE m.id = d.c_model_id AND d.c_floor_model_id IN ("+queryparams+")";
	console.log(sql+'---------------get_floor_model_datas_of_layout');
	sqlclient.init();
	sqlclient.query(sql,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			res.json({reCode:0,msg:rows});
		}else{
			res.json({reCode:10000,msg:''});
		}
	});
});


function block_append_floor($obj,row_obj){
	if(row_obj.fid){
		$obj.append(row_obj.fc).find('.c_floor').not('[fid]').attr('fid',row_obj.fid).attr('f_order',row_obj.forder).addClass('c_'+row_obj.fid);
		floor_append_model($obj.find('.c_floor[fid="'+row_obj.fid+'"]'),row_obj);
	}
	
}

function floor_append_model($obj,row_obj){
	if(row_obj.mid){
		//var html = replace_css_namespace(row_obj.mc,row_obj.mid);
		$obj.append(row_obj.mc).find('.c_model').attr('mid',row_obj.mid).attr('mtype',row_obj.mtype);
	}
}

//将css_namespace格式的字符串用c_mid代替,这个替换功能交由前端完成
//function replace_css_namespace(html,id){
//	return html.replace(/css_namespace\w*/g,'c_'+id);
//}


function add_layout_css(sqlclient,pageid,$,res){
	var query_bs_style = "SELECT c_blocks_id,style bsstyle "+
							" FROM c_page_blocks  "+
							" WHERE c_page_id = '"+pageid+"'  "+
							  " AND c_blocks_id IN  "+
									  " (SELECT bs.id  "+
									  	" FROM c_blocks bs,c_page p  "+
									  	" WHERE bs.layout_id = p.c_layout_id "+
									   " AND p.id = '"+pageid+"')";
	var query_b_style = " SELECT c_block_id,style bstyle  "+
							" FROM c_page_block  "+
						   " WHERE c_page_id = '"+pageid+"'  "+
  							 " AND c_block_id IN (SELECT id  "+
  							                      " FROM c_block  "+
  							                     " WHERE c_blocks_id IN(SELECT bs.id  "+
																	    " FROM c_blocks bs,c_page p  "+
																	    " WHERE bs.layout_id = p.c_layout_id "+
																	   " AND p.id = '"+pageid+"'))";
	var query_f_style = "SELECT id fid,style fstyle "+
						   " FROM c_floor  "+
						  " WHERE c_block_id IN (SELECT id  "+
						                         " FROM c_block  "+
						                        " WHERE c_blocks_id IN(SELECT bs.id  "+
																	  " FROM c_blocks bs,c_page p  "+
																	    " WHERE bs.layout_id = p.c_layout_id "+
																	   " AND p.id = '"+pageid+"'))";
	var css_s = "";
	//console.log(query_bs_style+'-------------------query_bs_style');
	sqlclient.query(query_bs_style,function(err,rows,fields){
		if(err) throw err;
		if(rows.length){
			for(var i = 0,j = rows.length;i < j;i++){
				css_s += '.c_'+rows[i].c_blocks_id+'{'+rows[i].bsstyle+'}';
			}
		}else{
			console.log('查找块组样式数据为空');
		}
		//console.log(query_b_style+'-------------------query_b_style')
		sqlclient.query(query_b_style,function(err,rows,fields){
			if(err) throw err;
			if(rows.length){
				for(var i = 0,j = rows.length;i < j;i++){
					css_s += '.c_'+rows[i].c_block_id+'{'+rows[i].bstyle+'}';
				}
			}else{
				console.log('查找块样式数据为空');
			}
			//console.log(query_f_style+'-------------------query_f_style')
			sqlclient.query(query_f_style,function(err,rows,fields){
				if(err) throw err;
				if(rows.length){
					for(var i = 0,j = rows.length;i < j;i++){
						css_s += '.c_'+rows[i].fid+'{'+rows[i].fstyle+'}';
					}
				}else{
					console.log('查找楼层样式数据为空');
				}
				css_s += '.css_layout_end_rx{}';
				//这里还要把css_s入到$.html中去
				$('.cntr > style').prepend(css_s);
				$('.cntr').attr('pid',pageid);
				res.status(200).send($.html());
			});
		});
	});
}

module.exports = router;
