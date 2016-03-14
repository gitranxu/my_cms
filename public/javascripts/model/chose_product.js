//选择商品列表服务
//弹出ajax_win并调用ajax得到商品列表
function chose_product_service(){
	return function($root,$c_edit_btn_of_model_config_win,$cms_model_config_win){
		console.log('here............')
		show_product_service_win($root);
		//chose_product_win_event($c_edit_btn_of_model_config_win);
	}
}

//显示商品列表窗口，如果没有动态创建一个，如果有，则显示
function show_product_service_win($root){
	if($('#product_service_id').length){
		$('#product_service_id').show();
	}else{
		$root.append(get_product_service_html());
	}
}

function get_product_service_html(){
	return "<div id='product_service_id'><script src=''></script></div>";
}

function show_product_win1($c_edit_btn_of_model_config_win){
	var $ajax_win = get_ajax_win_by_c_edit_btn($c_edit_btn_of_model_config_win);
	ajax_win_show($ajax_win);
	//调整背景图的显示位置
	var document_width = $(document).width();
	var document_height = $(document).height();
	var top = $ajax_win.parents('.c_floor').offset().top;
	var left = $ajax_win.parents('.c_floor').offset().left;
	$ajax_win.find('.bg').css({height:document_height,width:document_width,top:-top,left:-left});

	//得到总数，进行展示
	var count = 50;
	var display = 3;//每页显示条数
	$.ajax({
		method:'GET',
		url:'/test_manager/get_product_count',
		success : function(msg){
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
					show_page_products(page,display);			
				}
			});
		}
	});			
}


function show_page_products(page_now,display){
	$.ajax({
		url:'/test_manager/get_products_of_one_page',
		data:{
			display:display,
			page_now:page_now
		},
		success : function(msg){
			console.log(msg.msg)
			//将得到的商品列表进行展示
			parseProductSearchTable(msg.msg);
		}
	});
}

function parseProductSearchTable(jsondata){

}

function chose_product_win_event($c_edit_btn_of_model_config_win){
	var $ajax_win = get_ajax_win_by_c_edit_btn($c_edit_btn_of_model_config_win);
	var $content = $ajax_win.find('.content');
	$ajax_win.find('.bg').click(function(e){
		ajax_win_hid($ajax_win);
	});
}

function ajax_win_show($ajax_win){
	$ajax_win.removeClass('hid_rx');
}
function ajax_win_hid($ajax_win){
	$ajax_win.addClass('hid_rx');
}

function get_ajax_win_by_c_edit_btn($c_edit_btn_of_model_config_win){
	return $c_edit_btn_of_model_config_win.parents('.c_model').find('.ajax_win');
}
