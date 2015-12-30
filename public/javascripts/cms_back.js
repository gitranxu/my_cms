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
		blocks_save_orders : '/blocks/blocks_save_orders'
	},
	this.o = {
		$root : $('#back')
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
				_this.o.$root.append(tmp);

				//加入预览按钮
				tmp = _this.html.getPrevViewFixBtn();
				_this.o.$root.append(tmp);

				if(_this.setting.is_chose_layout_btn_show){
					//加入选择布局按钮
					tmp = _this.html.getChoseLayoutFixBtn();
					_this.o.$root.append(tmp);
				}

				_this.o.$root.append('<div id="move_btns"></div>');
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
						$('#chose_layouts_cntr').hide();
						if(msg){
							$('#content').empty().append(msg);
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
			$(this).addClass('active');
			_this.move_unit.blockGroup_move();
		});

		this.o.$root.delegate('#block_move_btn','click',function(){
			$(this).parent().find('.fixbtn').removeClass('active');
			$(this).addClass('active');
			_this.move_unit.block_move();
		});

		this.move_unit.event();//与移动相关的事件
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
	},
	move_unit : function(){
		//分3个级别的移动，块组级之间的上下移动blocks_move，块组级内部各块之间的左右移动block_move，块级内部各楼层之间的上下移动floor_move
		var _this = this;
		return {
			blockGroups_move : function($fixbtn){

				this.to_absolute($fixbtn);
			},
			blockGroup_move : function(){

			},
			block_move : function(){

			},
			to_absolute : function($fixbtn){

				var $this = $('#content');
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
			bs_update_btn : function(){
				var $this = $('#content');
				var blocks_length = $this.find('.blocks_move').length;
				for(var i = 0;i < blocks_length;i++){
					var html = _this.html.getBlockGroupsMoveBtns(i,blocks_length);
					var $cur_blocks = $this.find('.blocks_move:eq('+i+')');
					$cur_blocks.find('.blocks_mask').remove();
					$cur_blocks.append(html);
				}
			},
			move : function($current_blocks,$target_blocks,direct,fn){
				var that = this;
				var current_top = $current_blocks.position().top;
				var target_top = $target_blocks.position().top;
				var current_height = $current_blocks.height();
				var target_height = $target_blocks.height();

				$current_blocks.find('.blocks_mask').hide();
				$target_blocks.find('.blocks_mask').hide();

				var x = 1;
				if(direct!='up'){
					x = -1;
				}

				var cur_end_top = current_top-x*target_height;
				var tar_end_top = target_top+x*current_height

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
				_this.o.$root.delegate('.blocks_btn .up','click',function(){
					//先去调用后台，成功后再去移动页面元素,这里还要考虑，元素在运行中时要把这些移动按钮先隐藏起来
					console.log('向上移动...');
					var $this = $(this);
					var $current_blocks = $this.parents('.blocks_move');
					var $target_blocks = $current_blocks.prev('.blocks_move');

					var current_blocks_order = $current_blocks.attr('cb_order');
					var target_blocks_order = $target_blocks.attr('cb_order');

					_this.ajax.common({
						url : _this.urls.blocks_save_orders,
						successFn : function(msg){
							that.move($current_blocks,$target_blocks,'up',function(){
								$current_blocks.attr('cb_order',target_blocks_order);
								$target_blocks.attr('cb_order',current_blocks_order);
							});
						},
						data : { 
							current_blocks_id : $current_blocks.attr('id'),
							target_blocks_id : $target_blocks.attr('id'),
							current_blocks_order : current_blocks_order,
							target_blocks_order : target_blocks_order
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