//DEBUG=my_sec_app npm start
function CMS(){
	this.setting = {
		version : '1.0.0',
		is_chose_layout_btn_show : true,
		can_blockGroups_move : true,
		can_blockGroup_move : true,
		can_block_move : true
	},
	this.urls = {
		layout_query : '/layout/query',
		layout_query_content_by_id : '/layout/layout_query_content_by_id',
		get_floor_model_datas_of_layout : '/layout/get_floor_model_datas_of_layout',
		blocks_save_orders : '/blocks/blocks_save_orders',
		block_save_orders : '/block/block_save_orders',
		creat_tmp : '/file/creat_tmp'
	},
	this.o = {
		$root : $('#back'),
		$content : $('#content'),
		$config : $('#config')
	}
}
CMS.prototype = {
	html : {
		getChoseLayoutFixBtn : function(){
			return '<div class="choseBtn fixbtn" id="chose_layout_btn">'+
						'<div class="bg"></div>'+
						'<div class="btn_ctn btn9">选择布局</div>'+
					'</div>';
		},
		getGenerateFixBtn : function(){
			return '<div class="choseBtn fixbtn" id="generate_html_btn">'+
						'<div class="bg"></div>'+
						'<div class="btn_ctn btn9">生成静态页面</div>'+
					'</div>';
		},
		getPrevViewFixBtn : function(){
			return '<div class="choseBtn fixbtn" id="prev_view_btn">'+
						'<div class="bg"></div>'+
						'<div class="btn_ctn btn10">预览</div>'+
					'</div>';
		},
		getBlockGroupsMoveFixBtn : function(){
			return '<div class="choseBtn fixbtn fixbtn2" id="blockGroups_move_btn">'+
						'<div class="bg"></div>'+
						'<div class="btn_ctn btn10">块组之间上下移动</div>'+
					'</div>';
		},
		getBlockGroupMoveFixBtn : function(){
			return '<div class="choseBtn fixbtn fixbtn2" id="blockGroup_move_btn">'+
						'<div class="bg"></div>'+
						'<div class="btn_ctn btn10">块组内部左右移动</div>'+
					'</div>';
		},
		getBlockMoveFixBtn : function(){
			return '<div class="choseBtn fixbtn fixbtn2" id="block_move_btn">'+
						'<div class="bg"></div>'+
						'<div class="btn_ctn btn10">块内楼层上下移动</div>'+
					'</div>';
		},
		getChoseLayoutsWin : function(){
			return 	'<div id="chose_layouts_cntr" class="hid_rx">'+
						'<div class="bg3"></div>'+
						'<div class="chose_win">'+
							'<div class="bg2"></div>'+
							'<div class="content">'+
								'<div class="c_left">'+
									'<h3 class="c_title">可选的布局有：</h3>'+
									'<ul class="piece_ul"></ul>'+
								'</div>'+
								'<div class="c_right">'+
									'<h3 class="c_title">效果预览：</h3>'+
									'<div class="prev_view">'+
										'<img src="" alt="暂无图片效果">'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
		},
		getBlockGroupMoveBtns : function(index,total){
			var result = '';
			if(index==0){//第一个,返回向右移动
				return 	'<div class="block_mask">'+
							'<div class="bg5"></div>'+
							'<div class="btn_group">'+
								'<div class="choseBtn block_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn right">向右移动</div>'+
								'</div>'+
							'</div>'+
						'</div>'
			}else if(index == total-1){//最后一个,返回向左移动
				return 	'<div class="block_mask">'+
							'<div class="bg5"></div>'+
							'<div class="btn_group">'+
								'<div class="choseBtn block_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn left">向左移动</div>'+
								'</div>'+
							'</div>'+
						'</div>'
			}else{//返回左右移动
				return 	'<div class="block_mask">'+
							'<div class="bg5"></div>'+
							'<div class="btn_group">'+
								'<div class="choseBtn block_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn right">向右移动</div>'+
								'</div>'+
								'<div class="choseBtn block_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn left">向左移动</div>'+
								'</div>'+
							'</div>'+
						'</div>'
			}
		},
		getBlockGroupsMoveBtns : function(index,total){
			var result = '';
			if(index==0){//第一个,返回向下移动
				return 	'<div class="blocks_mask">'+
							'<div class="bg5"></div>'+
							'<div class="btn_group">'+
								'<div class="choseBtn blocks_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn down">向下移动</div>'+
								'</div>'+
							'</div>'+
						'</div>'
			}else if(index == total-1){//最后一个,返回向上移动
				return 	'<div class="blocks_mask">'+
							'<div class="bg5"></div>'+
							'<div class="btn_group">'+
								'<div class="choseBtn blocks_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn up">向上移动</div>'+
								'</div>'+
							'</div>'+
						'</div>'
			}else{//返回上下移动
				return 	'<div class="blocks_mask">'+
							'<div class="bg5"></div>'+
							'<div class="btn_group">'+
								'<div class="choseBtn blocks_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn down">向下移动</div>'+
								'</div>'+
								'<div class="choseBtn blocks_btn">'+
									'<div class="bg"></div>'+
									'<div class="btn_ctn up">向上移动</div>'+
								'</div>'+
							'</div>'+
						'</div>'
			}
			
		}
	},
	fn : function(){
		var _this = this;
		return {
			modify_pre_btn_position : function(){
				$('#generate_html_btn').css('right',($(document.body).width()-1200)/2+28);
				$('#prev_view_btn').css({'right':($(document.body).width()-1200)/2+28+33});
				$('#chose_layout_btn').css({'right':($(document.body).width()-1200)/2+28+33+33});

				$('#blockGroups_move_btn').css('right',($(document.body).width()-1200)/2+28);
				$('#blockGroup_move_btn').css({'right':($(document.body).width()-1200)/2+28+33});
				$('#block_move_btn').css({'right':($(document.body).width()-1200)/2+28+33+33});
			},
			add_fixed_btns : function(){
				//加入生成静态页按钮
				var tmp = '';
				tmp = _this.html.getGenerateFixBtn();
				_this.o.$config.append(tmp);

				//加入预览按钮
				tmp = _this.html.getPrevViewFixBtn();
				_this.o.$config.append(tmp);

				if(_this.setting.is_chose_layout_btn_show){
					//加入选择布局按钮
					tmp = _this.html.getChoseLayoutFixBtn();
					_this.o.$config.append(tmp);
				}

				_this.o.$config.append('<div id="move_btns"></div>');
				var $move_btns = $('#move_btns');

				if(_this.setting.can_blockGroups_move){
					//加入块组之间上下移动按钮
					tmp = _this.html.getBlockGroupsMoveFixBtn();
					$move_btns.append(tmp);
				}

				if(_this.setting.can_blockGroup_move){
					//加入块组内部左右移动按钮
					tmp = _this.html.getBlockGroupMoveFixBtn();
					$move_btns.append(tmp);
				}

				if(_this.setting.can_block_move){
					//加入块内楼层上下移动按钮
					tmp = _this.html.getBlockMoveFixBtn();
					$move_btns.append(tmp);
				}

				this.modify_pre_btn_position();//重新调整预览，生成静态页面按钮的位置
			},
			add_chose_layout_win : function(){
				//加入选择布局窗口
				var chose_layout_win_str = _this.html.getChoseLayoutsWin();
				_this.o.$root.append(chose_layout_win_str);
			}
		}
		
	},
	log : function(msg){
		if(console&&console.log){
			console.log(msg);
		}else{
			alert(msg);
		}
	},
	ajax : function(){
		var _this = this;
		return {
			common : function(opt){
				$.ajax({
					method : opt.method || 'GET',
					url : opt.url,
					data : opt.data || {},
					dataType : opt.dataType || 'json',
					success : function(msg){
						opt.successFn&&opt.successFn(msg);
					},
					error : function(msg){
						_this.log(msg)
					},
					complete : function(msg){
						opt.completeFn&&opt.completeFn(msg);
					}
				});
			}
		}
	},
	juicer : {
		msg_to_findpieces : function(){
			return '<li class="border_top_none" imgurl="" layout_id=""><div class="bgli"></div><div class="ctnli">abc</div></li>';
		},
		msg_to_findpieces_html : function(msg){
			var tpl = this.layout_tpl();
			var html = juicer(tpl,msg);
			return html;
		},
		layout_tpl : function(){
			return '{@each layout_list as it}'+
						'<li class="border_top_none" imgurl="${it.t_url}" dataid="${it.id}"><div class="bgli"></div>'+
							'<div class="ctnli">${it.name}'+
								'{@if it.isUpdate}'+
									'<span class="isupdate">有更新</span>'+
								'{@/if}'+
							'</div>'+
						'</li>'+
					'{@/each}'
		}
	},
	bind : function(){
		var _this = this;

		//选择布局
		this.o.$root.delegate('#chose_layout_btn','click',function(){
			$('#chose_layouts_cntr').show();
			_this.ajax.common({
				url : _this.urls.layout_query,
				successFn : function(msg){
					var html = _this.juicer.msg_to_findpieces_html(msg);
					$('#chose_layouts_cntr').find('.piece_ul').empty().append(html);

				},
				data : {
					t_type : 1,
					t_width : 2,
					term_type : 3,
					floor_id : 4,
					t_height : 5
				}
			});
		});

		//点击遮罩层关闭弹出窗口
		this.o.$root.delegate('#chose_layouts_cntr .bg3','click',function(){
			$('#chose_layouts_cntr').hide();
		});

		//点击item时
		this.o.$root.delegate('.piece_ul li',{
			mouseover : function(){
				var imgurl = $(this).attr('imgurl');
				$('#chose_layouts_cntr .prev_view img').attr('src',imgurl);
			},
			click : function(){
				var dataid = $(this).attr('dataid');
				_this.ajax.common({
					url : _this.urls.layout_query_content_by_id,
					successFn : function(msg){
						//这里msg返回的是html结构，一开始是隐藏的，append后，再进行了相关的处理后(块默认高度是否去掉，楼层默认高度是否去掉等，顺便判断一下，如果楼层高度为0，则进行提示)，再显示
						$('#chose_layouts_cntr').hide();
						if(msg){
							_this.o.$content.empty().append(msg);
							_this.parseHtml.parse();
							//_this.o.$content.find('.cntr').show();
						}else{
							alert('没有数据...');
						}
						$('#move_btns .fixbtn').removeClass('active');
					},
					data : { dataid : dataid},
					dataType : 'html'
				});
			}
		});

		this.o.$root.delegate('#blockGroups_move_btn','click',function(){
			$(this).parent().find('.fixbtn').removeClass('active');
			//$(this).addClass('active');
			_this.move_unit.blockGroups_move($(this));
		});

		this.o.$root.delegate('#blockGroup_move_btn','click',function(){
			$(this).parent().find('.fixbtn').removeClass('active');
			//$(this).addClass('active');
			_this.move_unit.blockGroup_move($(this));
		});

		this.o.$root.delegate('#block_move_btn','click',function(){
			$(this).parent().find('.fixbtn').removeClass('active');
			//$(this).addClass('active');
			_this.move_unit.block_move($(this));
		});

		this.o.$root.delegate('#prev_view_btn','click',function(){
			var head = $(document.head).html();
			var body = $(document.body).html();
			_this.ajax.common({
				url : _this.urls.creat_tmp,
				method : 'POST',
				data : {head:head,body:body},
				successFn : function(msg){
					console.log('成功...');
					window.open(msg.prev_view_page_url);
				}
			});
		});

		this.move_unit.event();//与移动相关的事件
	},
	parseHtml : function(){
		//1.如果c_block元素下面有c_floor元素，则去掉c_block元素的默认高度
		//2.如果c_floor元素下面有c_model元素，则去掉c_floor元素的默认高度
		var _this = this;
		return {
			json : function(){
				var that = this;
				//得到解析模板用的json数据，然后再解析model时进行解析
				var queryparams = '';//查询字符串，格式'fidmid','fidmid'
				_this.o.$content.find('.c_model').each(function(){
					var $this = $(this);
					var mid = $this.attr('mid');
					var fid = $this.parents('.c_floor').attr('fid');
					queryparams += "'"+fid+mid+"',";
				});
				queryparams = queryparams.substring(0,queryparams.length-1);
				if(queryparams){
					_this.ajax.common({
						url : _this.urls.get_floor_model_datas_of_layout,
						method : 'POST',
						data : {queryparams : queryparams},
						successFn : function(msg){
							if(msg.reCode==0){//如果有数据
								//alert(JSON.stringify(msg.msg));
								that.parse_c_model(msg.msg);
							}else if(msg.reCode=10001){
								console.log(msg.msg);
							}else{
								console.log('可能页面还没有模板，或模板没有数据...');
							}
						}
					});
				}else{
					_this.o.$content.find('.cntr').show();
				}
					
			},
			parse : function(){
				var that = this;

				_this.o.$content.find('.cntr').find('.c_block').each(function(){
					var $c_block = $(this);
					that.parse_c_block($c_block);
				});

				that.json();//得到解析模板用的json数据，然后进行解析
			},
			parse_c_block : function($c_block){
				var that = this;
				var $c_floors = $c_block.find('.c_floor');
				if($c_floors.length){//下面有元素再进行处理，否则没必要处理
					_this.removeDefaultHeightColor($c_block);
					$c_floors.each(function(){
						var $c_floor = $(this);
						that.parse_c_floor($c_floor);
					});
				}
			},
			parse_c_floor : function($c_floor){
				var $c_models = $c_floor.find('.c_model');
				if($c_models.length==1){
					_this.removeDefaultHeightColor($c_floor);
					
					_this.checkHeight($c_floor);//去掉默认高度后，检查一下如果该元素高度为0，则进行提示
				}else if($c_models.length > 1){
					console.log('一个楼层内，只能有一个c_model元素，即一个楼层只能套一个模板');
				}
			},
			parse_c_model : function(json){
				var that = this;
				if(json.length){
					_this.o.$content.find('.c_model').each(function(){
						var $this = $(this);
						var mid = $this.attr('mid');
						var fid = $this.parents('.c_floor').attr('fid');
						var tmp = $this.find('.tmpl').html();
						var data = that.get_data_by_fidmid(fid+mid,json);
						var html = juicer(tmp,data);
						$this.find('.translated').append(html);
						$this.find('.tmpl').remove();
					});
				}
				_this.o.$content.find('.cntr').show();
			},
			get_data_by_fidmid : function(fidmid,jsondata){
				for(var i = 0,j = jsondata.length; i < j;i++){
					if(fidmid==jsondata[i].c_floor_model_id){
						return { model_list : eval('('+jsondata[i].data+')') };
					}
				}
			}
		}
			
	},
	removeDefaultHeightColor : function($obj){
		$obj.removeClass('h50 h100 h150 h200 h250 h300 h350 h400 h450 h500 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18');
	},
	checkHeight : function($obj){
		var height = $obj.height();
		if(!height){
			var fid = $obj.attr('fid');
			console.log('fid为【'+fid+'】的楼层的高度为0，楼层高度要么有默认高度，要么会被模板元素撑高，如果为0，可能是模板元素为绝对定位状态(请在样式表中手动明确规定楼层高度)或浮动状态(请给楼层元素加上clear_rx样式类)');
		}
	},
	init : function(){
		
		this.init_unit();
		//显示选择布局按钮
		this.fn.add_fixed_btns();//加入悬浮按钮组
		this.fn.add_chose_layout_win();//加入选择布局窗口
		
		this.bind();
	},
	init_unit : function(){
		this.fn = this.fn();
		this.ajax = this.ajax();
		this.move_unit = this.move_unit();
		this.parseHtml = this.parseHtml();
	},
	move_unit : function(){
		//分3个级别的移动，块组级之间的上下移动blocks_move，块组级内部各块之间的左右移动block_move，块级内部各楼层之间的上下移动floor_move
		var _this = this;
		return {
			blockGroups_move : function($fixbtn){

				this.bs_to_absolute($fixbtn);
			},
			blockGroup_move : function($fixbtn){
				this.b_to_absolute($fixbtn);
			},
			block_move : function(){

			},
			b_to_absolute : function($fixbtn){
				var $this = _this.o.$content;
				$this.find('.clear_rx.blocks_move').each(function(){
					var $this = $(this);
					var b_height = $this.height();
					var b_width = $this.width();
					if(!b_height || !b_width){
						console.log('clear_rx类所在元素的宽或高不能为0，样式错误，请修正...');
					}
					$this.height(b_height);
					$this.width(b_width);//宽高固化

					var block_length = $this.find('.c_block').length;
					for(var i = block_length - 1;i >= 0;i--){
						var $cur_block = $this.find('.c_block:eq('+i+')');
						//content_height += $cur_block.height();
						var top = $cur_block.position().top;
						var left = $cur_block.position().left;
						var width = $cur_block.width();

						$cur_block.css({
							position:'absolute',
							top:top,
							left:left,
							width:width,
							height:b_height//与父元素高度一致
						});

						var $mask = $cur_block.find('.block_mask');
						if($mask.length){
							var is_hide = $mask.is(':hidden');
							if(is_hide){
								$mask.show();
								$fixbtn.addClass('active');
							}else{
								$mask.hide();
								$fixbtn.removeClass('active');
							}
						}else{
							$fixbtn.addClass('active');
							var html = _this.html.getBlockGroupMoveBtns(i,block_length);
							$cur_block.append(html);
						}
					}

				});

			},
			bs_to_absolute : function($fixbtn){

				var $this = _this.o.$content;
				var blocks_length = $this.find('.blocks_move').length;
				var content_height = 0;
				for(var i = blocks_length - 1;i >= 0;i--){
					var $cur_blocks = $this.find('.blocks_move:eq('+i+')');
					content_height += $cur_blocks.height();
					var top = $cur_blocks.position().top;
					var left = $cur_blocks.position().left;

					$cur_blocks.css({
						position:'absolute',
						top:top,
						left:left,
						width:'100%'
					});

					var $mask = $cur_blocks.find('.blocks_mask');
					if($mask.length){
						var is_hide = $mask.is(':hidden');
						if(is_hide){
							$mask.show();
							$fixbtn.addClass('active');
						}else{
							$mask.hide();
							$fixbtn.removeClass('active');
						}
					}else{
						$fixbtn.addClass('active');
						var html = _this.html.getBlockGroupsMoveBtns(i,blocks_length);
						$cur_blocks.append(html);
					}
				}
				
				$this.height(content_height);

			},
			b_update_btn : function($clear_rx_blocks_move){
				var $this = $clear_rx_blocks_move;
				var block_length = $this.find('.c_block').length;
				for(var i = 0;i < block_length;i++){
					var html = _this.html.getBlockGroupMoveBtns(i,block_length);
					var $cur_block = $this.find('.c_block:eq('+i+')');
					$cur_block.find('.block_mask').remove();
					$cur_block.append(html);
				}
			},
			bs_update_btn : function(){
				var $this = _this.o.$content;
				var blocks_length = $this.find('.blocks_move').length;
				for(var i = 0;i < blocks_length;i++){
					var html = _this.html.getBlockGroupsMoveBtns(i,blocks_length);
					var $cur_blocks = $this.find('.blocks_move:eq('+i+')');
					$cur_blocks.find('.blocks_mask').remove();
					$cur_blocks.append(html);
				}
			},
			move_left_right : function($current_block,$target_block,direct,fn){
				var that = this;
				var current_left = $current_block.position().left;
				var target_left = $target_block.position().left;
				var current_width = $current_block.width();
				var target_width = $target_block.width();

				$current_block.find('.block_mask').hide();
				$target_block.find('.block_mask').hide();

				var x = 1;
				if(direct=='right'){
					x = -1;
				}

				var cur_end_left = current_left-x*target_width;
				var tar_end_left = target_left+x*current_width;

				$current_block.animate({left:cur_end_left},1000);
				setTimeout(function(){
					$target_block.animate({left:tar_end_left},1000,function(){
						if(direct=='left'){
							$current_block.after($target_block);
						}else{
							$current_block.before($target_block);
						}
						fn&&fn();
						that.b_update_btn($current_block.parents('.clear_rx.blocks_move'));
					});
				},200);
			},
			move_top_down : function($current_blocks,$target_blocks,direct,fn){
				var that = this;
				var current_top = $current_blocks.position().top;
				var target_top = $target_blocks.position().top;
				var current_height = $current_blocks.height();
				var target_height = $target_blocks.height();

				$current_blocks.find('.blocks_mask').hide();
				$target_blocks.find('.blocks_mask').hide();

				var x = 1;
				if(direct=='down'){
					x = -1;
				}

				var cur_end_top = current_top-x*target_height;
				var tar_end_top = target_top+x*current_height;

				$current_blocks.animate({top:cur_end_top},1000);
				setTimeout(function(){
					$target_blocks.animate({top:tar_end_top},1000,function(){
						if(direct=='up'){
							$current_blocks.after($target_blocks);
						}else{
							$current_blocks.before($target_blocks);
						}
						fn&&fn();
						that.bs_update_btn();
					});
				},200);
					
			},
			event : function(){
				var that = this;
				_this.o.$root.delegate('.blocks_btn .up, .blocks_btn .down','click',function(){
					//先去调用后台，成功后再去移动页面元素,这里还要考虑，元素在运行中时要把这些移动按钮先隐藏起来
					var $this = $(this);
					var $current_blocks = $this.parents('.blocks_move');
					var $target_blocks = null;
					var direct = '';
					if($this.hasClass('up')){
						$target_blocks = $current_blocks.prev('.blocks_move');
						direct = 'up';
					}else{
						$target_blocks = $current_blocks.next('.blocks_move');
						direct = 'down';
					}
					

					var current_blocks_order = $current_blocks.attr('bs_order');
					var target_blocks_order = $target_blocks.attr('bs_order');
					var current_blocks_id = $current_blocks.attr('id');
					var target_blocks_id = $target_blocks.attr('id');
					if(!(current_blocks_id&&target_blocks_id&&current_blocks_order&&target_blocks_order)){
						console.log('current_blocks_id:'+current_blocks_id+',target_blocks_id:'+target_blocks_id+',current_blocks_order:'+current_blocks_order+',target_blocks_order:'+target_blocks_order+',排序用到的四个参数中有值为假的参数，请检查...');
						return;
					}

					_this.ajax.common({
						url : _this.urls.blocks_save_orders,
						successFn : function(msg){
							that.move_top_down($current_blocks,$target_blocks,direct,function(){
								$current_blocks.attr('bs_order',target_blocks_order);
								$target_blocks.attr('bs_order',current_blocks_order);
							});
						},
						data : { 
							current_blocks_id : current_blocks_id,
							target_blocks_id : target_blocks_id,
							current_blocks_order : current_blocks_order,
							target_blocks_order : target_blocks_order
						}
					});
				});

				_this.o.$root.delegate('.block_btn .right, .block_btn .left','click',function(){
					//先去调用后台，成功后再去移动页面元素,这里还要考虑，元素在运行中时要把这些移动按钮先隐藏起来
					var $this = $(this);
					var $current_block = $this.parents('.c_block');
					var $target_block = null;
					var direct = '';
					if($this.hasClass('left')){
						$target_block = $current_block.prev('.c_block');
						direct = 'left';
					}else{
						$target_block = $current_block.next('.c_block');
						direct = 'right';
					}
					

					var current_block_order = $current_block.attr('b_order');
					var target_block_order = $target_block.attr('b_order');
					var current_block_id = $current_block.attr('bid');
					var target_block_id = $target_block.attr('bid');
					if(!(target_block_id&&target_block_id&&current_block_order&&target_block_order)){
						console.log('current_block_id:'+current_block_id+',target_block_id:'+target_block_id+',current_block_order:'+current_block_order+',target_block_order:'+target_block_order+',排序用到的四个参数中有值为假的参数，请检查...');
						return;
					}

					_this.ajax.common({
						url : _this.urls.block_save_orders,
						successFn : function(msg){
							that.move_left_right($current_block,$target_block,direct,function(){
								$current_block.attr('b_order',target_block_order);
								$target_block.attr('b_order',current_block_order);
							});
						},
						data : { 
							current_block_id : current_block_id,
							target_block_id : target_block_id,
							current_block_order : current_block_order,
							target_block_order : target_block_order
						}
					});
				});
			}
		}
	}
}

//注意事项：一个页面，最终只有一个#back,只有一个#content,#content里面是每次换布局时要更新的内容

$().ready(function(){
	var cms = new CMS();
	cms.init();
});