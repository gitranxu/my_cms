//选择商品列表服务
//弹出ajax_win并调用ajax得到商品列表
function chose_product_service(){
	return function($root,$c_edit_btn_of_model_config_win,$cms_model_config_win){
		//console.log('here............')
		show_product_service_win($root);
		chose_product_win_event($cms_model_config_win);
	}
}

//显示商品列表窗口，如果没有动态创建一个，如果有，则显示
function show_product_service_win($root){
	if($('#product_service_id').length){
		$('#product_service_id').show();
	}else{
		$root.append(get_product_service_html());
	}
	//加载JS
	dynamicLoadJs({
		url:"/javascripts/jPaginate/jquery.paginate.js",
		id:"jquery_paginate_js",
		need_remove:true,
		ready:function(){
			//发起ajax请求，并渲染页面
			get_first_page();
		}
	});
}

var display = 3;//每页显示条数

function get_first_page(){

	//得到总数，进行展示
	var count = 50;
	
	show_page_products(1);

	var product_name = $('#product_service_id .product_name').val();
	var cp_name = $('#product_service_id .cp_name').val();
	var wl_no = $('#product_service_id .wl_no').val();
	var cp_no = $('#product_service_id .cp_no').val();
	var sale_type = $('#product_service_id .sale_type').val();
	var term_type = $('#product_service_id .term_type').val();

	$.ajax({
		method:'GET',
		url:'/test_manager/get_product_count',
		data:{
			product_name:product_name,
			cp_name:cp_name,
			wl_no:wl_no,
			cp_no:cp_no,
			sale_type:sale_type,
			term_type:term_type
		},
		success : function(msg){
			console.log(msg.msg);
			$("#product_page_list").paginate({
				count 		: Math.ceil(msg.msg/display),
				start 		: 1,
				display     : display,
				border					: true,
				border_color			: '#BEF8B8',
				text_color  			: '#68BA64',
				background_color    	: '#E3F2E1',	
				border_hover_color		: '#68BA64',
				text_hover_color  		: 'black',
				background_hover_color	: '#CAE6C6', 
				rotate      : false,
				images		: false,
				mouse		: 'press',
				onChange     			: function(page){
					show_page_products(page);			
				}
			});
		}
	});	
}

function dynamicLoadJs(opt){
	if($('#'+opt.id).length==0){
		var oBODY = document.getElementsByTagName('BODY').item(0);
		var oScript= document.createElement("script"); 
	    oScript.type = "text/javascript";
	    oScript.src = opt.url; 
	    oScript.id = opt.id;
	    var need_remove = "";
	    if(opt.need_remove){
	    	need_remove = "need_remove";
	    }
	    oScript.className = need_remove;
	    oBODY.appendChild( oScript);
	    oScript.onload = oScript.onreadystatechange = function(){
	    	if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
	    		opt.ready && opt.ready();
	    	}
	    }
	}else{
		opt.ready && opt.ready();
	}
		
}

function get_product_service_html(){
	return '<div id="product_service_id">'+
				'<style>'+
					'#product_service_id .ajax_win{}'+
					'#product_service_id .ajax_win .bg{position: absolute;top: 0;left: 0;background: #0C4314;z-index: 10005;}'+
					'#product_service_id .ajax_win .content{width: 800px;background: #fff;position: fixed;top: 15%;left: 50%;margin-left: -400px;z-index: 10006;padding: 10px;}'+
					'#product_service_id .ajax_win .product_one_page_info{}'+
					'#product_service_id .form-inline{color: #000;}'+
					'#product_service_id .form-inline .form-control {width: 124px;}'+
				'</style>'+
				'<div class="ajax_win" class="need_remove">'+
					'<div class="bg"></div>'+
					'<div class="content">'+
						'<div class="product_one_page_info">'+
							'<form class="form-inline">'+
								'<div class="form-group">'+
									'<label for="product_name">商品名称：</label>'+
									'<input type="text" class="form-control product_name" placeholder="商品名称">'+
								'</div>'+
								'<div class="form-group">'+
									'<label for="cp_name">产品名称：</label>'+
									'<input type="text" class="form-control cp_name" placeholder="产品名称">'+
								'</div>'+
								'<div class="form-group">'+
									'<label for="wl_no">物料编号：</label>'+
									'<input type="text" class="form-control wl_no" placeholder="物料编号">'+
								'</div>'+
								'<div class="form-group">'+
									'<label for="cp_no">产品编码：</label>'+
									'<input type="text" class="form-control cp_no" placeholder="产品编码">'+
								'</div>'+
								'<div class="form-group">'+
									'<label for="sale_type">销售类型：</label>'+
									'<select name="" class="form-control sale_type" id="sale_type">'+
										'<option value="1">普通</option>'+
										'<option value="2">非普通</option>'+
									'</select>'+
								'</div>'+
								'<div class="form-group">'+
									'<label for="term_type">平台：</label>'+
									'<select name="" class="form-control term_type" id="term_type">'+
										'<option value="1">不区分平台</option>'+
										'<option value="2">PC</option>'+
										'<option value="3">WAP</option>'+
									'</select>'+
								'</div>'+
								'<div class="form-group">'+
									'<button type="button" class="btn btn-info product_search_btn">查询</button>'+
								'</div>'+
							'</form>'+
							'<table class="table table-striped table-hover product_table">'+
								'<thead>'+
									'<tr>'+
										'<th>商品名称</th>'+
										'<th>物料编号</th>'+
										'<th>产品名称</th>'+
										'<th>产品编号</th>'+
										'<th>销售类型</th>'+
										'<th>平台</th>'+
										'<th>价格</th>'+
									'</tr>'+
								'</thead>'+
								'<tbody></tbody>'+
							'</table>'+
						'</div>'+
						'<div id="product_page_list"></div>'+
					'</div>'+
				'</div>'+
			'</div>';
}


function show_page_products(page_now){
	//这里还要加上查询条件，下次加
	var product_name = $('#product_service_id .product_name').val();
	var cp_name = $('#product_service_id .cp_name').val();
	var wl_no = $('#product_service_id .wl_no').val();
	var cp_no = $('#product_service_id .cp_no').val();
	var sale_type = $('#product_service_id .sale_type').val();
	var term_type = $('#product_service_id .term_type').val();
	$.ajax({
		url:'/test_manager/get_products_of_one_page',
		data:{
			display:display,
			page_now:page_now,
			product_name:product_name,
			cp_name:cp_name,
			wl_no:wl_no,
			cp_no:cp_no,
			sale_type:sale_type,
			term_type:term_type
		},
		success : function(msg){
			parseProductSearchTable(msg.msg);
		}
	});
}

function parseProductSearchTable(jsondata){
	var length = jsondata.length;
	if(length){
		$('#product_service_id table tbody').empty();
		var tmpl = get_product_trs();
		var html  = juicer(tmpl,{products:jsondata});
		$('#product_service_id table tbody').append(html);
	}
}

function get_product_trs(){
	return '{@each products as it}<tr img_url="${it.img_url}">'+
				'<td>${it.product_name}</td>'+
				'<td>${it.wl_no}</td>'+
				'<td>${it.cp_name}</td>'+
				'<td>${it.cp_no}</td>'+
				'<td>${it.sale_type}</td>'+
				'<td>${it.term_type}</td>'+
				'<td>${it.price}</td>'+
			'</tr>{@/each}';
}

function chose_product_win_event($cms_model_config_win){
	var $service_div = $('#product_service_id');
	$service_div.find('.bg').click(function(e){
		chose_product_win_hide($service_div);
	});

	//点击查询按钮时
	$service_div.find('.product_search_btn').click(function(e){
		get_first_page();
	});
	

	//双击商品列表
	$service_div.find('.product_table').delegate('tr','dblclick',function(){
		//1.赋值
		var $tr = $(this);
		var product_name = $tr.find('td:eq(0)').text();
		var cp_name = $tr.find('td:eq(2)').text();
		var wl_no = $tr.find('td:eq(1)').text();
		var cp_no = $tr.find('td:eq(3)').text();
		var sale_type = $tr.find('td:eq(4)').text();
		var term_type = $tr.find('td:eq(5)').text();
		var price = $tr.find('td:eq(6)').text();
		var img_url = $tr.attr('img_url');

		$cms_model_config_win.find('.edit_item[key="product_name"] input').val(product_name);
		$cms_model_config_win.find('.edit_item[key="cp_name"] input').val(cp_name);
		$cms_model_config_win.find('.edit_item[key="wl_no"] input').val(wl_no);
		$cms_model_config_win.find('.edit_item[key="cp_no"] input').val(cp_no);
		$cms_model_config_win.find('.edit_item[key="sale_type"] .sel_input').val(sale_type);
		$cms_model_config_win.find('.edit_item[key="term_type"] .sel_input').val(term_type);
		$cms_model_config_win.find('.edit_item[key="price"] input').val(price);
		$cms_model_config_win.find('.edit_item[key="product_imgurl"] img').attr("src",img_url);

		//2.隐藏
		chose_product_win_hide($service_div);
	});
}

function chose_product_win_hide($service_div){
	$service_div.hide();
	$service_div.find('.product_table').undelegate();
}

