//DEBUG=my_sec_app npm start
function CMS(){
	this.setting = {
		version : '1.0.0',
		new_floor_height : 200, //新增楼层的高度，注意与数据库中的保持一致【也就是说，新增加的所有楼层的高度都是一样的】
		new_move_time : 1000,
		new_move_tuila_time : 700
	},
	this.sys_btns = {
		chose_or_edit_page_show : true,
		edit_layout_show : true,
		create_floor_show : true,
		prev_view_show : true,
		make_html_show : true,
		blockGroups_move_show : true,
		blockGroup_move_show : true,
		floor_move_show : true,
		edit_model_show : true
	},
	this.urls = {//预计接口30个左右
		layout_query : '/layout/query',//改过
		layout_query_content_by_id : '/layout/layout_query_content_by_id',//改过
		get_floor_model_datas_of_layout : '/layout/get_floor_model_datas_of_layout',//不需要改
		blocks_save_orders : '/blocks/blocks_save_orders',//改过
		block_save_orders : '/block/block_save_orders',//改过
		floor_save_orders : '/floor/floor_save_orders',//改过
		floor_delete : '/floor/floor_delete',//改过
		create_floor_by_block_id : '/block/create_floor_by_block_id',//改过
		model_query : '/model/query',//不需要改
		model_query_content_data_by_id : '/model/model_query_content_data_by_id',//改过
		get_img_data_by_fidmid : '/model/get_img_data_by_fidmid',//不需要改
		data_add : '/data/add',//改过
		save_data : '/data/save_data',//不需要改
		generate_html : '/file/generate_html',//不需要改
		generate_edit_html : '/file/generate_edit_html',
		get_bs_b_css_by_bsid : '/page/get_bs_b_css_by_bsid',//改过
		update_css_by_id_table_col : '/page/update_css_by_id_table_col', //第16个接口 //改过
		get_f_css_by_fid : '/page/get_f_css_by_fid',//改过
		set_f_css_by_fid :'/page/set_f_css_by_fid',//改过
		save_or_update_page_info : '/page/save_or_update_page_info',//改过
		get_all_pages : '/page/get_all_pages',//改过
		get_page_layout_info_by_pid_lid : '/page/get_page_layout_info_by_pid_lid'//不需要改
	},
	this.o = {
		$root : null,
		$content : null,
		$config : null,
		$sys_main_btns : null,
		$sys_sub_btns : null,
		$cur_c_edit_btn : null //这个对象是点击编辑按钮时赋值的，用于图片编辑小窗口查询相关参数用
	}
}


CMS.prototype = {
	html : {
		getNoXHintInfo : function(msg,className,color,fontsize){
			return "<div class='"+className+" need_remove hid_rx' style='color:"+color+";font-size:"+fontsize+"px;'>"+msg+"</div>";
		},
		//json格式{mask:"add_floor_mask",bg:"add_floor_bg",c_x_btn_group:"c_block_btn_group",items:[{class_name:"top",text:"增加楼层(顶)"},{class_name:"bottom",text:"增加楼层(底)"}]}
		getTypeOneBtn : function(jsondata){
			var tmpl = '<div class="${mask} need_remove">'+
			                '<div class="${bg}"></div>'+
			                '<div class="btn_group ${c_x_btn_group} clear_rx">'+
			                    '{@each items as it}'+
			                        '<div class="choseBtn ${it.hid_rx}">'+
			                            '<div class="bg"></div>'+
			                            '<div class="btn_ctn ${it.class_name}">${it.text}</div>'+
			                        '</div>'+
			                    '{@/each}'+
			                '</div>'+
			            '</div>';
			return juicer(tmpl,jsondata);
		},
		getLunboTr : function(jsondata){
			var tmpl = '{@each list as it}'+
							'<tr>'+
								'<td class="l_sort">${it.sort}</td>'+
								'<td class="l_href">${it.href}</td>'+
								'<td class="l_img">'+
									'<img src="${it.imgurl}" alt="">'+
								'</td>'+
								'<td class="l_desc">${it.desc}</td>'+
								'<td open_new="${it.open_new}" class="l_open_new">{@if it.open_new=="true"}是{@else}否{@/if}</td>'+
								'<td class="l_opt"><div class="l_del l_btn">删除</div></td>'+
							'</tr>'+
						'{@/each}';
			return juicer(tmpl,jsondata);
		},
		getBEditGroup : function(jsondata){
			var tmpl = '{@each b_items as it}'+
							'<div class="edit_group fl_rx" bid="${it.bid}">'+
		                        '<div class="edit_item ">'+
		                            '<span>块的宽度 :</span>'+
		                            '<input type="text" value="${it.width}" class="width edit_input">'+
		                        '</div>'+
		                        '<div class="edit_item ">'+
		                            '<span>左外边距 :</span>'+
		                            '<input type="text" value="${it.marginA}" class="marginA edit_input">'+
		                        '</div>'+
		                        '<div class="edit_item ">'+
		                            '<span>右外边距 :</span>'+
		                            '<input type="text" value="${it.marginB}" class="marginB edit_input">'+
		                        '</div>'+
		                    '</div>'+
		                '{@/each}';
	        return juicer(tmpl,jsondata);
		},
		getTypeThreeBtn : function(jsondata){
			var tmpl = '<div class="${mask} need_remove">'+
		                    '<div class="${bg}">'+
		                    '</div>'+
		                    '<div class="btn_group ${c_x_btn_group} clear_rx">'+
		                        '{@each items as it}'+
			                        '<div class="choseBtn ${it.hid_rx}">'+
			                            '<div class="bg"></div>'+
			                            '<div class="btn_ctn ${it.class_name}">${it.text}</div>'+
			                        '</div>'+
			                    '{@/each}'+
		                    '</div>'+
		                    '<div class="edit_win hid_rx">'+
		                    	'<div class="help_group hid_rx clear_rx">'+
		                    		'<div class="edit_item fl_rx">'+
			                            '<span title="即块组的宽度" class="hastitle">参考宽度 :</span>'+
			                            '<input type="text" disabled value="" class="disable_input cankao_val edit_input">'+
			                        '</div>'+
			                        '<div class="edit_item fl_rx">'+
			                            '<span title="即所有块及其外边距总和" class="hastitle">当前宽度 :</span>'+
			                            '<input type="text" disabled value="" class="disable_input cur_val edit_input">'+
			                        '</div>'+
			                    '</div>'+
		                    	'<div class="bs_edit_group clear_rx" bsid="">'+
		                    		'<div class="edit_item fl_rx">'+
			                            '<span>块组宽度 :</span>'+
			                            '<input type="text" value="" class="width edit_input">'+
			                        '</div>'+
			                        '<div class="edit_item fl_rx">'+
			                            '<span>上外边距 :</span>'+
			                            '<input type="text" value="" class="marginA edit_input">'+
			                        '</div>'+
			                        '<div class="edit_item fl_rx">'+
			                            '<span>下外边距 :</span>'+
			                            '<input type="text" value="" class="marginB edit_input">'+
			                        '</div>'+
		                    	'</div>'+
		                    	'<div class="b_edit_groups clear_rx">'+
		                    	'</div>'+
		                    	'<div class="saveBtn">保存</div>'
		                    '</div>'+
		                '</div>';
			return juicer(tmpl,jsondata);
		},

		
		getTypeFourBtn : function(jsondata){
			var tmpl = '<div class="${mask} need_remove">'+
			                '<div class="${bg}"></div>'+
			                '<div class="btn_group ${c_x_btn_group} clear_rx">'+
			                    '{@each items as it}'+
			                        '<div class="choseBtn ${it.hid_rx}">'+
			                            '<div class="bg"></div>'+
			                            '<div class="btn_ctn ${it.class_name}">${it.text}</div>'+
			                        '</div>'+
			                    '{@/each}'+
			                '</div>'+
			                '<div class="edit_group hid_rx">'+
			                    '{@each items as it}'+
			                        '<div class="edit_item ${it.hid_rx}">'+
			                            '<span>上外边距 :</span><input type="text" value="${it.marginA}" class="marginA edit_input">'+
			                        '</div>'+
			                        '<div class="edit_item ${it.hid_rx}">'+
			                            '<span>下外边距 :</span><input type="text" value="${it.marginB}" class="marginB edit_input">'+
			                        '</div>'+
			                    '{@/each}'+
			                    '<div class="saveBtn">保存</div>'+
			                    '<div class="super hastitle" title="更多配置信息">S</div>'+
			                    '<div class="floor_config hid_rx">'+
									'<div class="edit_item">'+
										'<div class="chose_ul_info model_type_info hid_rx" val=1></div>'+
			                            '<span>模板类型 :</span><input type="text" readonly value="综合" class="model_type chose_input">'+
			                            '<ul class="chose_ul hid_rx"><li val=1>综合</li><li val=2>轮播</li><li val=3>宫格</li><li val=4>其他</li></ul>'+
			                        '</div>'+
			                        '<div class="edit_item">'+
			                        	'<div class="chose_ul_info term_type_info hid_rx" val=1></div>'+
			                            '<span>终端类型 :</span><input type="text" readonly value="PC" class="term_type chose_input">'+
			                            '<ul class="chose_ul hid_rx"><li val=1>PC</li><li val=2>WAP</li></ul>'+
			                        '</div>'+
			                        '<div class="edit_item">'+
			                            '<span title="过滤模板时用，0代表不限高度" class="hastitle">楼层高度 :</span><input type="text" value="0" class="query_height edit_input">'+
			                        '</div>'+
			                    '</div>'+
			                '</div>'+
			            '</div>';
			return juicer(tmpl,jsondata);
		},
		getTypeTwoBtn : function(jsondata){
			var tmpl = '<div class="choseBtn fixbtn" id="${btn_id}">'+
							'<div class="bg"></div>'+
							'<div class="btn_ctn">${btn_name}</div>'+
						'</div>';
			return juicer(tmpl,jsondata);
		},
		getPageLis : function(jsondata){//name,id pid,url,project_name,c_layout_id
			var tmpl = 	'{@each pagelist as it}'+
							'<li pid="${it.c_page_id}" p_name="${it.name}" p_page_url="${it.page_url}" p_prev_view_url="${it.prev_view_url}" p_edit_page_url="${it.edit_page_url}"  p_project_name="${it.project_name}" p_c_layout_id="${it.c_layout_id}">'+
	                            '<div class="bgli"></div>'+
	                            '<div class="ctnli">${it.name}</div>'+
	                        '</li>'+
	                    '{@/each}'
			return juicer(tmpl,jsondata);
		},
		getAddBlockBtns : function(){
			return this.getTypeOneBtn({mask:"add_floor_mask",bg:"add_floor_bg",c_x_btn_group:"c_block_btn_group",items:[{class_name:"top",text:"增加楼层(顶)"},{class_name:"bottom",text:"增加楼层(底)"}]});
		},
		getEditBlocksBtns : function(){
			return this.getTypeThreeBtn({mask:"edit_blocks_mask",bg:"edit_blocks_bg",c_x_btn_group:"",items:[{class_name:"edit",text:"编辑块组"}]});
		},
		getEditFloorBtns : function(){
			return this.getTypeFourBtn({mask:"edit_floor_mask",bg:"edit_floor_bg",c_x_btn_group:"",items:[{class_name:"edit",text:"编辑楼层"}]});
		},
		getAddFloorBtns : function(){
			return this.getTypeOneBtn({mask:"no_mask",bg:"no_bg",c_x_btn_group:"c_floor_btn_group",items:[{class_name:"chose_model",text:"选择模板"},{class_name:"delete_model",text:"删除楼层"},{class_name:"config_model",text:"配置楼层",hid_rx:"hid_rx"}]});
		},
		getChoseOrEditPageFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"chose_or_edit_page_btn",btn_name:"选择或编辑页面"});
		},
		getEditLayoutFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"edit_layout_btn",btn_name:"编辑布局"});
		},
		getGenerateFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"generate_html_btn",btn_name:"生成静态页面"});
		},
		getPrevViewFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"prev_view_btn",btn_name:"预览"});
		},
		getEditModelFixBtn :  function(){
			return this.getTypeTwoBtn({btn_id:"edit_model_btn",btn_name:"编辑模板"});
		},
		getBlockGroupsMoveFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"blockGroups_move_btn",btn_name:"块组之间上下移动"});
		},
		getBlockGroupMoveFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"blockGroup_move_btn",btn_name:"块组内部左右移动"});
		},
		getBlockMoveFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"block_move_btn",btn_name:"块内楼层上下移动"});
		},
		getCreateFloorFixBtn : function(){
			return this.getTypeTwoBtn({btn_id:"floor_create_btn",btn_name:"增加楼层"});
		},
		getChoseXWin : function(id,name){
			return 	'<div id="'+id+'" class="hid_rx need_remove">'+
						'<div class="win_bg"></div>'+
						'<div class="chose_win">'+
							'<div class="bg2"></div>'+
							'<div class="content">'+
								'<div class="c_left">'+
									'<h3 class="c_title">可选的'+name+'有：</h3>'+
									'<ul class="piece_ul"></ul>'+
								'</div>'+
								'<div class="c_right">'+
									'<h3 class="c_title">效果预览：</h3>'+
									'<div class="prev_view">'+
										'<img src="" alt="暂无图片效果">'+
									'</div>'+
								'</div>'+
								'<div class="c_bottom"><div class="c_bottom_content"></div></div>'+
							'</div>'+
						'</div>'+
					'</div>';
		},
		getChosePageWin : function(){
			return 	'<div id="chose_page_cntr" class="hid_rx need_remove">'+
					    '<div class="win_bg"></div>'+
					    '<div class="chose_win">'+
					        '<div class="bg2"></div>'+
					        '<div class="content">'+
					        	'<div class="c_top clear_rx">'+
					        		'<div class="layoutlist fl_rx">'+
					                    '<h3 class="c_title">可选的布局有：<div id="create_layout_btn" class="hid_rx">创建布局</div></h3>'+
					                    '<div>'+
											'<ul class="tabs clear_rx"><li class="active"><div class="bgli"></div><div class="ctnli">系统布局</div></li><li><div class="bgli"></div><div class="ctnli">用户布局</div></li></ul>'+
											'<ul class="piece_ul sys "></ul>'+
											'<ul class="piece_ul user hid_rx"></ul>'+
					                    '</div>'+
					                    
					                '</div>'+
					                '<div class="prevview fl_rx">'+
					                    '<h3 class="c_title">效果预览：</h3>'+
					                    '<div class="prev_view"><img src="http://pic.shop.lenovo.com.cn/g1/M00/00/ED/CmBZD1ZyXoaAbHeEAAAERQXbP14680.gif" alt="暂无图片效果"></div>'+
					                '</div>'+
					                '<div class="pageinfo fl_rx">'+
					                	'<h3 class="c_title">页面信息：</h3>'+
					                    '<div class="edit_group">'+
										    '<div class="edit_item">'+
										        '<span title="在点击页面列表之前可以新增页面" class="hastitle">页面名称 :</span>'+
										        '<input type="text" value="" class="p_name edit_input">'+
										    '</div>'+
										    '<div class="edit_item">'+
										        '<span>所属项目 :</span>'+
										        '<input type="text" value="" class="p_project edit_input">'+
										    '</div>'+
										    '<div class="edit_item">'+
										        '<span>关联布局 :</span>'+
										        '<input type="text" value="" placeholder="请点击左则布局列表" disabled class="p_layout disable_input">'+
										    '</div>'+
										    '<div class="edit_item">'+
										        '<span title="用于生成编辑页面,注意格式" class="hastitle">编辑url :</span>'+
										        '<input type="text" value="" placeholder="/xxx/x.html" class="p_edit_url edit_input">'+
										    '</div>'+
										    '<div class="edit_item">'+
										        '<span title="用于查看页面的预览效果,注意格式" class="hastitle">预览url :</span>'+
										        '<input type="text" value="" placeholder="/xxx/x.html" class="p_prev_view_url edit_input">'+
										    '</div>'+
										    '<div class="edit_item">'+
										        '<span title="生成的正式页面的路径,注意格式" class="hastitle" >正式url :</span>'+
										        '<input type="text" value="" placeholder="/xxx/x.html" class="p_page_url edit_input">'+
										    '</div>'+
										    '<div class="saveBtn">保存</div>'+
										'</div>'+
					                '</div>'+
					        	'</div>'+
					            '<div class="c_bottom">'+
					                '<div class="c_bottom_content">'+
										'<ul class="page_ul clear_rx"></ul>'+
					                '</div>'+
					            '</div>'+
					        '</div>'+
					    '</div>'+
					'</div>';
		},
		//jsondata:{first_class_name:"down",first_text:"向下移动",last_class_name:"up",last_text:"向上移动",mask:"floor_mask",bg:"floor_bg",c_x_btn_group:"c_floor_btn_group"}
		getXMoveBtns : function(index,total,jsondata){
			var items = null;
			if(index==0){
				items = [{class_name:jsondata.first_class_name,text:jsondata.first_text}];
			}else if(index == total-1){
				items = [{class_name:jsondata.last_class_name,text:jsondata.last_text}];
			}else{
				items = [{class_name:jsondata.first_class_name,text:jsondata.first_text},{class_name:jsondata.last_class_name,text:jsondata.last_text}];
			}
			var data = {mask:jsondata.mask,bg:jsondata.bg,c_x_btn_group:jsondata.c_x_btn_group,items:items};
			return this.getTypeOneBtn(data);
		},
		getBlockMoveBtns : function(index,total){
			return this.getXMoveBtns(index,total,{first_class_name:"down",first_text:"向下移动",last_class_name:"up",last_text:"向上移动",mask:"floor_mask",bg:"floor_bg",c_x_btn_group:"c_floor_btn_group"});
		},
		getBlockGroupMoveBtns : function(index,total){
			return this.getXMoveBtns(index,total,{first_class_name:"right",first_text:"向右移动",last_class_name:"left",last_text:"向左移动",mask:"block_mask",bg:"block_bg",c_x_btn_group:""});
		},
		getBlockGroupsMoveBtns : function(index,total){
			return this.getXMoveBtns(index,total,{first_class_name:"down",first_text:"向下移动",last_class_name:"up",last_text:"向上移动",mask:"blocks_mask",bg:"blocks_bg",c_x_btn_group:""});
		},
		getEditZone : function(){
			return '<div class="c_edit_zone need_remove">'+
                        '<div class="c_edit_bg"></div>'+
                        '<div class="c_edit_btn">编辑</div>'+
                    '</div>';
		},
		getEditLayoutSubBtns : function(){

		},
		getSysBtns : function(){
			return '<div id="sys_btns" class="need_remove">'+
						'<div class="main_btns"></div>'+
						'<div class="sub_btns hid_rx">'+
							'<div class="choseBtn" style="display: block;">'+
			                    '<div class="bg"></div>'+
			                    '<div class="btn_ctn edit_block_btn">编辑块组</div>'+
			                '</div>'+
			                '<div class="choseBtn" style="display: block;">'+
			                    '<div class="bg"></div>'+
			                    '<div class="btn_ctn edit_floor_btn">编辑楼层</div>'+
			                '</div>'+
			            '</div>'+
			        '</div>';
		}
	},
	fn : function(){
		var _this = this;
		return {
			page_reinit : function(){
				$('#sys_btns .fixbtn').removeClass('active notclick');
				_this.o.$content.removeAttr('style');
				_this.o.$sys_sub_btns.hide();
				_this.o.$sys_sub_btns.find('.choseBtn').removeClass('active');
			},
			add_fixed_btns : function(){

				var $main_btns = _this.o.$sys_main_btns;

				_this.sys_btns.chose_or_edit_page_show && $main_btns.append(_this.html.getChoseOrEditPageFixBtn());//加入选择布局按钮

				_this.sys_btns.edit_layout_show && $main_btns.append(_this.html.getEditLayoutFixBtn()) && _this.extra_event.edit_layout_btn_event();//加入编辑布局按钮
				

				_this.sys_btns.create_floor_show && $main_btns.append(_this.html.getCreateFloorFixBtn());//加入选择布局按钮
				
				_this.sys_btns.blockGroups_move_show && $main_btns.append(_this.html.getBlockGroupsMoveFixBtn());//加入块组之间上下移动按钮

				_this.sys_btns.blockGroup_move_show && $main_btns.append(_this.html.getBlockGroupMoveFixBtn());//加入块组内部左右移动按钮

				_this.sys_btns.floor_move_show && $main_btns.append(_this.html.getBlockMoveFixBtn());//加入块内楼层上下移动按钮

				_this.sys_btns.make_html_show && $main_btns.append(_this.html.getGenerateFixBtn());//加入生成静态页按钮

				_this.sys_btns.prev_view_show && $main_btns.append(_this.html.getPrevViewFixBtn());//加入预览按钮

				_this.sys_btns.edit_model_show && $main_btns.append(_this.html.getEditModelFixBtn());//加入编辑模板按钮
			},
			add_chose_model_win : function(){
				var chose_win_str = _this.html.getChoseXWin('chose_models_cntr','模板');
				_this.o.$root.append(chose_win_str);
			},
			add_chose_page_win : function(){
				var chose_win_str = _this.html.getChosePageWin();
				_this.o.$root.append(chose_win_str);

				_this.extra_event.edit_page_win_event();
			},
			show_chose_page_win : function(){
				if($('#back .cntr').length){
					//如果有，说明已经选择过了，不用在页面初始化时进行显示
					var pid = $('#back .cntr').attr('pid');
					var lid = $('#back .cntr').attr('lid');
					this.parse_page(pid,lid);
					$('#chose_or_edit_page_btn').remove();//这种情况下，【选择或编辑页面】按钮不可见
				}else{
					//还未生成页面，用户必须生成页面才可以进行操作
					_this.ajax.common({
						url : _this.urls.get_all_pages,
						successFn : function(msg){
							if(msg.reCode==1){
								var rows = msg.msg;
								var html = _this.html.getPageLis({pagelist:rows});
								
								$('#chose_page_cntr .c_bottom .page_ul').empty().append(html);

							}else{
								alert(msg.msg);
							}
						}
					});
					this.query_layout($('#chose_page_cntr').find('.layoutlist .piece_ul'));
					$('#chose_page_cntr').show();
				}
			},

			removeDefaultHeightColor : function($obj){
				$obj.removeClass('h50 h100 h150 h200 h250 h300 h350 h400 h450 h500 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18');
			},
			addDefaultHeightColor : function($obj){
				var rand18 = _this.tools.getRandomNum(1,18);
				$obj.addClass('h300 c'+rand18);
			},
			checkHeight : function($obj){
				var height = $obj.height();
				if(!height){
					var fid = $obj.attr('fid');
					console.log('fid为【'+fid+'】的楼层的高度为0，楼层高度要么有默认高度，要么会被模板元素撑高，如果为0，可能是模板元素为绝对定位状态(请在样式表中手动明确规定楼层高度)或浮动状态(请给楼层元素加上clear_rx样式类)');
				}
			},
			show_c_edit_s_win : function($this,data){
				var top = $this.offset().top;
				var height = $this.height();
				var left = $this.offset().left;
				$('#c_edit_s_win_id').find('.text').val(data.href);
				$('#c_edit_s_win_id').find('.yesorno').removeClass('active');
				if(data.new_open=="yes"){
					$('#c_edit_s_win_id').find('.yes').addClass('active');
				}else{
					$('#c_edit_s_win_id').find('.no').addClass('active');
				}
				$('#c_edit_s_win_id').find('img').attr('src',data.imgurl);
				$('#c_edit_s_win_id').css({top:top+height,left:left}).show().addClass('bounceInUp');
				setTimeout(function(){
					$('#c_edit_s_win_id').removeClass('bounceInUp');
				},1000);
			},
			update_css_by_reg : function(id,css_s){
				var target_s = $('.cntr > style').text();
				var find_reg = new RegExp('\\.c_'+id+'\\{[^\\}]*\\}');
				var after_reg_html = target_s.replace(find_reg,'.c_'+id+'{'+css_s+'}');
				$('.cntr > style').empty().append(after_reg_html);
			},
			set_total_width : function($input_btn){
				var total = 0;
				var $edit_win = $input_btn.parents('.edit_win');
				$edit_win.find('.b_edit_groups .edit_group').each(function(){
					var $this = $(this);
					var width = $this.find('.width').val();
					var marginA = $this.find('.marginA').val();
					var marginB = $this.find('.marginB').val();
					width = width ? width : 0;
					marginA = marginA ? marginA : 0;
					marginB = marginB ? marginB : 0;
					total += parseInt(width)+parseInt(marginA)+parseInt(marginB);
				});
				$edit_win.find('.cur_val').val(total);
			},
			query_layout : function($ul){
				_this.ajax.common({
					url : _this.urls.layout_query,
					successFn : function(msg){
						$ul.each(function(){
							var $this = $(this);
							if($this.hasClass('sys')){
								var html = _this.juicer.msg_to_sys_lis_html(msg);
								$this.empty().append(html);
							}else if($this.hasClass('user')){
								var html = _this.juicer.msg_to_user_lis_html(msg);
								$this.empty().append(html);
							}
						});
					}
				});
			},
			parse_page : function(pid,lid){
				_this.ajax.common({
					url : _this.urls.layout_query_content_by_id,
					successFn : function(msg){
						//这里msg返回的是html结构，一开始是隐藏的，append后，再进行了相关的处理后(块默认高度是否去掉，楼层默认高度是否去掉等，顺便判断一下，如果楼层高度为0，则进行提示)，再显示
						$('#chose_page_cntr').hide();
						if(msg){
							_this.o.$content.empty().append(msg);
							_this.parseHtml.parse();
							//解析完了后，这时候引入loadjs文件
							$('#loadjsid').remove();
							var oScript= document.createElement("script"); 
						    oScript.type = "text/javascript"; 
						    oScript.src = "/javascripts/loadjs.js"; 
						    oScript.id = "loadjsid";
						    document.getElementsByTagName('BODY').item(0).appendChild( oScript);
						}else{
							alert('没有数据...');
						}
						_this.fn.page_reinit();
					},
					data : { pid : pid,lid : lid},
					dataType : 'html'
				});
			},
			edit_blocks_mask_save : function(bs_finished,b_finished,$saveBtn){
				if(bs_finished&&b_finished){
					$saveBtn.parents('.edit_win').hide();
					$saveBtn.parents('.edit_blocks_mask').find('.btn_group .edit').removeClass('clicked');
				}
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
		msg_to_findmodels_html : function(msg){
			var tpl = this.list_tpl();
			var html = juicer(tpl,{list:msg.msg});
			return html;
		},
		msg_to_sys_lis_html : function(msg){
			//console.log(msg);
			var tpl = this.list_sys_tpl();
			var html = juicer(tpl,msg);
			return html;
		},
		msg_to_user_lis_html : function(msg){
			var tpl = this.list_user_tpl();
			var html = juicer(tpl,msg);
			return html;
		},
		list_tpl : function(){
			return '{@each list as it}'+
						'<li class="border_top_none" img_data="${it.t_url}" imgurl="${it.img_url}" dataid="${it.id}"><div class="bgli"></div>'+
							'<div class="ctnli">${it.name}'+
								'{@if it.isUpdate}'+
									'<span class="isupdate">有更新</span>'+
								'{@/if}'+
							'</div>'+
						'</li>'+
					'{@/each}';
		},
		list_sys_tpl : function(){
			return '{@each list as it}'+
						'{@if it.type==1}'+
						'<li class="border_top_none" img_data="${it.t_url}" imgurl="${it.img_url}" dataid="${it.id}"><div class="bgli"></div>'+
							'<div class="ctnli">${it.name}'+
								'{@if it.isUpdate}'+
									'<span class="isupdate">有更新</span>'+
								'{@/if}'+
							'</div>'+
						'</li>'+
						'{@/if}'+
					'{@/each}';
		},
		list_user_tpl : function(){
			return '{@each list as it}'+
						'{@if it.type==2}'+
						'<li class="border_top_none" img_data="${it.t_url}" imgurl="${it.img_url}" dataid="${it.id}"><div class="bgli"></div>'+
							'<div class="ctnli">${it.name}'+
								'{@if it.isUpdate}'+
									'<span class="isupdate">有更新</span>'+
								'{@/if}'+
							'</div>'+
						'</li>'+
						'{@/if}'+
					'{@/each}';
		}
	},
	bind : function(){
		var _this = this;

		//统一进行预览图片的展示控制
		this.o.$root.delegate('.piece_ul li','mouseenter',function(){
			var $this = $(this);
			if($this.parents('.content').find('.layoutlist').length){  //page编辑页中预览图片不走这里的逻辑
				return;
			}
			var imgurl = $this.attr('imgurl');
			imgurl && $this.parents('.content').find('.prev_view img').attr('src',imgurl);
		});

		//点击系统按钮变大变小
		this.o.$root.delegate('#sys_btns','click',function(e){
			if(e.target != this){
				return;
			}
			var $this = $(this);
			if(!$this.hasClass('to_small')){
				$this.find('.fixbtn').hide();
				$this.addClass('bg_color1');
				$this.animate({height:30,width:20},1000,function(){
					$this.addClass('to_small ofh_rx');
				});
			}else{
				$this.animate({height:200,width:300},1000,function(){
					$this.find('.fixbtn').show("slow",function(){
						$this.removeClass('bg_color1');
						$this.removeClass('to_small ofh_rx');
					});
				});
			}
			
		});

		//选择布局
		this.o.$root.delegate('#chose_or_edit_page_btn','click',function(){
			$('#chose_page_cntr').show();
		});

		//点击遮罩层关闭弹出窗口
		this.o.$root.delegate('#chose_page_cntr .win_bg','click',function(){
			$('#chose_page_cntr').hide();
		});

		//点击tab页
		this.o.$root.delegate('#chose_page_cntr .layoutlist .tabs li','click',function(){
			var $this = $(this);
			$this.addClass('active').siblings().removeClass('active');
			var index = $('.layoutlist .tabs li').index($('.layoutlist .tabs li.active'));
			$('#chose_page_cntr .layoutlist').find('.piece_ul').addClass('hid_rx');
			$('#chose_page_cntr .layoutlist').find('.piece_ul:eq('+index+')').removeClass('hid_rx');
		});

		//选择模板
		this.o.$root.delegate('.chose_model','click',function(){
			var $floor = $(this).parents('.c_floor');
			var fid = $floor.attr('fid');
			var pid = _this.o.$content.find('.cntr').attr('pid');
			$('#chose_models_cntr').attr('chose_win_fid',fid).show();
			_this.ajax.common({
				url : _this.urls.model_query,
				successFn : function(msg){
					if(msg.reCode==1){
						var html = _this.juicer.msg_to_findmodels_html(msg);
						$('#chose_models_cntr').find('.piece_ul').empty().append(html);
					}else{
						alert(msg.msg);
					}
				},
				data : {
					f_width : $floor.width(),
					fid : fid,
					pid : pid
				}
			});
		});

		//点击模板item时
		//分两步，1.增加一条c_data记录，2查询数据
		this.o.$root.delegate('#chose_models_cntr .piece_ul li',{
			click : function(){
				var mid = $(this).attr('dataid');
				var fid = $('#chose_models_cntr').attr('chose_win_fid');

				_this.ajax.common({
					url : _this.urls.data_add,
					data : { mid : mid,fid : fid },
					method : 'POST',
					successFn : function(msg){
						if(msg.reCode==1){
							//这里再去查询数据
							_this.ajax.common({
								url : _this.urls.model_query_content_data_by_id,
								successFn : function(msg){
									//后台返回现成的html结构【包含正确的数据】
									//alert(msg.msg);
									$('#chose_models_cntr').hide();
									if(msg.reCode==1){
										var $current_c_floor = _this.o.$content.find('.c_floor[fid="'+fid+'"]');
										$current_c_floor.empty().append(msg.msg);
										_this.parseHtml.parse_c_floor($current_c_floor);

										//如果有链接导航
										if($current_c_floor.find('.floor_links').length){

											$current_c_floor.find('.floor_links a').each(function(){
												var s = $(this).html();
												var title = $(this).attr('title');
												if(s.indexOf('##val##')!=-1){
													$(this).html(s.replace('##val##',title));
												}
											});
										}
									}else{
										alert('没有数据...');
									}
								},
								data : { mid : mid,fid : fid}
							});

						}else{
							alert(msg.msg);
						}
					}
				});

					
			}
		});

		//点击遮罩层关闭弹出窗口
		this.o.$root.delegate('#chose_models_cntr .win_bg','click',function(){
			$('#chose_models_cntr').hide();
		});


		//删除楼层时
		this.o.$root.delegate('.c_floor_btn_group .delete_model','click',function(){
			if(!window.confirm('你确定要删除楼层吗？')){
                return;
            }
			//删除成功后再操作DOM
			var $this = $(this);
			var $floor_for_del = $this.parents('.c_floor');
			var fid = $floor_for_del.attr('fid');
			if(!fid){
				console.log('得到的fid值为：'+fid+',请仔细检查');
				return;
			}
			var pid = _this.o.$content.find('.cntr').attr('pid');
			_this.ajax.common({
				url : _this.urls.floor_delete,
				method : 'POST',
				data : {fid : fid,pid : pid},
				successFn : function(msg){
					if(msg.reCode==1){
						alert(msg.msg);
						//删除成功后要操作DOM元素
						var $c_block = $floor_for_del.parents('.c_block');
						$floor_for_del.remove();
						_this.parseHtml.parse_c_block($c_block);
						
					}else{
						alert(msg.msg);
					}
				}
			});
		});

		//块组之间上下移动
		this.o.$root.delegate('#blockGroups_move_btn','click',function(){
			if($('#blockGroup_move_btn').hasClass('active')){
				alert('激活【块组之间上下移动】按钮，请先取消【块组内部左右移动】按钮激活状态。');
				return;
			}
			_this.move_unit.blockGroups_move($(this));
		});

		//块组内部左右移动
		this.o.$root.delegate('#blockGroup_move_btn','click',function(){
			if($('#blockGroups_move_btn').hasClass('active')){
				alert('激活【块组内部左右移动】按钮，请先取消【块组之间上下移动】按钮激活状态。');
				return;
			}
			_this.move_unit.blockGroup_move($(this));
		});

		//块内楼层上下移动
		this.o.$root.delegate('#block_move_btn','click',function(){
			_this.move_unit.block_move($(this));
		});

		//增加楼层
		this.o.$root.delegate('#floor_create_btn','click',function(){
			_this.move_unit.floor_create_show($(this));
		});

		//预览
		//在点击预览按钮或生成按钮之前，要先判断块组块内部移动按钮是否为标红状态，如果是则不能进行
		this.o.$root.delegate('#prev_view_btn,#generate_html_btn','click',function(){
			var blocks_active = $('#blockGroups_move_btn').hasClass('active');
			var block_active = $('#blockGroup_move_btn').hasClass('active');
			if(blocks_active){
				alert('【块组之间上下移动】按钮为标红状态时，不能预览或生产页面，请切换状态');
				return;
			}
			if(blocks_active || block_active){
				alert('【块组内部左右移动】按钮为标红状态时，不能预览或生产页面，请切换状态');
				return;
			}
			var head = $(document.head).html();
			var body = $(document.body).html();

			var $this = $(this);

			var pid = _this.o.$content.find('.cntr').attr('pid');
			var lid = _this.o.$content.find('.cntr').attr('lid');

			var generate_type = 1;//临时
			if($this.attr('id') != 'prev_view_btn'){
				generate_type = 2;//正式
			}

			_this.ajax.common({
				url : _this.urls.generate_html,
				method : 'POST',
				data : {head:head,body:body,generate_type:generate_type,pid,lid},
				successFn : function(msg){
					if(msg.reCode==1){
						window.open(msg.the_url);
					}else{
						alert(msg.msg);
					}
				}
			});
		});

		//增加楼层(底)
		this.o.$root.delegate('.c_block_btn_group .bottom','click',function(){
			//先发后台请求，成功后再进行dom操作
			var $c_block = $(this).parents('.c_block');
			var block_id = $c_block.attr('bid');
			var pid = _this.o.$content.find('.cntr').attr('pid');
			_this.ajax.common({
				url : _this.urls.create_floor_by_block_id,
				data : {block_id : block_id,order_direct : "bottom",pid:pid},
				successFn : function(msg){
					if(msg.reCode==1){
						_this.move_unit.f_to_absolute($c_block);
						$c_block.append(msg.msg);
						_this.move_unit.add_to_bottom($c_block);//开始动画
					}
				}
			});
		});

		//增加楼层(顶)
		this.o.$root.delegate('.c_block_btn_group .top','click',function(){
			//先发后台请求，成功后再进行dom操作
			var $c_block = $(this).parents('.c_block');
			var block_id = $c_block.attr('bid');
			var pid = _this.o.$content.find('.cntr').attr('pid');
			_this.ajax.common({
				url : _this.urls.create_floor_by_block_id,
				data : {block_id : block_id,order_direct : "top",pid:pid},
				successFn : function(msg){
					if(msg.reCode==1){
						_this.move_unit.f_to_absolute($c_block); //先absolute化
						$c_block.append(msg.msg);
						_this.move_unit.add_to_top($c_block);//开始动画
					}
					
				}
			});
		});

		this.move_unit.event();//与移动相关的事件

		//点击编辑模板按钮
		this.o.$root.delegate('#edit_model_btn','click',function(){
			window.open('/edit_model.html');
		});
	},
	extra_event : function(){
		var _this = this;
		return {
			edit_layout_btn_event : function(){
				//点击编辑布局按钮时，添加子按钮（没有则添加，有则显示）
				_this.o.$root.delegate('#edit_layout_btn','click',function(){
					var $this = $(this);
					if($this.hasClass('active')){ //关闭
						_this.o.$sys_sub_btns.fadeOut('slow');
						$this.removeClass('active');
					}else{	//打开
						_this.o.$sys_sub_btns.fadeIn('slow');
						$this.addClass('active');

					}
				});

				//点击编辑块组按钮
				_this.o.$root.delegate('#sys_btns .edit_block_btn','click',function(){
					//逻辑，点击时，对所有的blocks_move进行遍历，加上编辑块组的按钮，遮罩层的zindex值>编辑楼层的>移动的，但是小于弹出窗口的
					var $this = $(this);
					var $p_choseBtn = $this.parents('.choseBtn');

					if(!$p_choseBtn.hasClass('active')){
						var html = _this.html.getEditBlocksBtns();
						_this.o.$content.find('.blocks_move').append(html);
						$p_choseBtn.addClass('active')
					}else{
						_this.o.$content.find('.edit_blocks_mask').remove();
						$p_choseBtn.removeClass('active')
					}
				});

				//点击遮罩层上的编辑块组
				_this.o.$root.delegate('.edit_blocks_mask .edit','click',function(){
					var $this = $(this);
					//把bsid加上，把bitems加上
					if($this.hasClass('clicked')){
						$this.parents('.edit_blocks_mask').find('.edit_win').hide();
						$this.removeClass('clicked');
					}else{
						var bsid = $this.parents('.blocks_move').attr('id');
						var pid = _this.o.$content.find('.cntr').attr('pid');
						_this.ajax.common({
							url : _this.urls.get_bs_b_css_by_bsid,
							data : { bsid : bsid , pid : pid },
							successFn : function(msg){
								//alert(msg.msg);
								if(msg.reCode==1){
									var html = _this.html.getBEditGroup(msg.msg);
									//根据bsid去得到块组及块的CSS样式 
									var $edit_win = $this.parents('.edit_blocks_mask').find('.edit_win');

									$edit_win.find('.bs_edit_group').attr('bsid',msg.msg.bsid);

									$edit_win.find('.bs_edit_group .width').val(msg.msg.width);

									$edit_win.find('.bs_edit_group .marginA').val(msg.msg.marginA);

									$edit_win.find('.bs_edit_group .marginB').val(msg.msg.marginB);

									$edit_win.find('.b_edit_groups').empty().append(html);

									if($edit_win.find('.b_edit_groups .edit_group').length){
										$edit_win.find('.help_group').show();
										_this.fn.set_total_width($edit_win.find('.bs_edit_group'));
									}

									var cankao_val = $this.parents('.blocks_move').width();
									$edit_win.find('.cankao_val').val(cankao_val);

									$edit_win.show();
									$this.addClass('clicked');
								}else{
									alert(msg.msg);
								}
							}
						});
						
					}
					
					
				});

				//只能输入正整数或0
				_this.o.$root.delegate('.edit_win .edit_input,.edit_floor_mask .edit_input','blur',function(){
					var val = $(this).val();
					if(/^\s*$/.test(val)){	//如果为空格，则转换为0
						val = 0;
						$(this).val(val);
					}
					if(!/^\d+$/.test(val)){
						$(this).addClass('unvalidate');
					}else{
						$(this).removeClass('unvalidate');
					}
				});

				//块的输入框的值可以改变当前值
				_this.o.$root.delegate('.edit_win .b_edit_groups .edit_input','blur',function(){
					var val = $(this).val();
					if(/^\d+$/.test(val)){
						_this.fn.set_total_width($(this));
					}
				});

				//点击编辑块组保存按钮
				_this.o.$root.delegate('.edit_blocks_mask .saveBtn','click',function(){
					var $this = $(this);

					if($this.parents('.edit_win').find('.unvalidate').length){
						alert('请检查，只能输入正整数或0');
						return;
					}


					var cankao_width = $this.parents('.edit_win').find('.cankao_val').val();
					var b_total_width = $this.parents('.edit_win').find('.cur_val').val();
					if(b_total_width - cankao_width > 0){
						alert('所有块的宽度及外边距之和不能大于参考宽度！');
						return;
					}

					var bs_finished = false;
					var b_finished = false;

					var pid = _this.o.$content.find('.cntr').attr('pid');
					var $bs_edit_group = $this.parents('.edit_win').find('.bs_edit_group');
						var bsid = $bs_edit_group.attr('bsid');
						var width = $bs_edit_group.find('.width').val();
						var marginA = $bs_edit_group.find('.marginA').val();
						var marginB = $bs_edit_group.find('.marginB').val();
						var bs_css_s = 'width:'+width+'px!important;margin-top:'+marginA+'px!important;margin-bottom:'+marginB+'px!important;';
						_this.ajax.common({
							url : _this.urls.update_css_by_id_table_col,
							method : 'POST',
							data : {col_name:'c_blocks_id',table:'c_page_blocks',id_val:bsid,update_val:bs_css_s,pid:pid},
							successFn : function(msg){
								if(msg.reCode==1){
									_this.fn.update_css_by_reg(bsid,bs_css_s);
									bs_finished = true;
									_this.fn.edit_blocks_mask_save(bs_finished,b_finished,$this);
								}
							}
						});

					var $b_edit_groups = $this.parents('.edit_win').find('.b_edit_groups');
						$b_edit_groups.find('.edit_group').each(function(){
							var $this = $(this);
							var bid = $this.attr('bid');
							var width = $this.find('.width').val();
							var marginA = $this.find('.marginA').val();
							var marginB = $this.find('.marginB').val();
							var b_css_s = 'width:'+width+'px!important;margin-left:'+marginA+'px!important;margin-right:'+marginB+'px!important;';
							_this.ajax.common({
								url : _this.urls.update_css_by_id_table_col,
								method : 'POST',
								data : {col_name:'c_block_id',table:'c_page_block',id_val:bid,update_val:b_css_s,pid:pid},
								successFn : function(msg){
									if(msg.reCode==1){
										_this.fn.update_css_by_reg(bid,b_css_s);
										b_finished = true;
										_this.fn.edit_blocks_mask_save(bs_finished,b_finished,$this);
									}
								}
							});
						});

				});


				//点击编辑楼层按钮
				_this.o.$root.delegate('#sys_btns .edit_floor_btn','click',function(){
					
					var $this = $(this);
					var $p_choseBtn = $this.parents('.choseBtn');

					if(!$p_choseBtn.hasClass('active')){
						var html = _this.html.getEditFloorBtns();
						_this.o.$content.find('.c_floor').append(html);
						$p_choseBtn.addClass('active')
					}else{
						_this.o.$content.find('.edit_floor_mask').remove();
						$p_choseBtn.removeClass('active')
					}
				});

				//点击遮罩层上的编辑楼层
				_this.o.$root.delegate('.edit_floor_mask .edit','click',function(){
					var $this = $(this);
					//把bsid加上，把bitems加上
					if($this.hasClass('clicked')){
						$this.parents('.edit_floor_mask').find('.edit_group').hide();
						$this.removeClass('clicked');
					}else{
						var fid = $this.parents('.c_floor').attr('fid');
						var pid = _this.o.$content.find('.cntr').attr('pid');
						_this.ajax.common({
							url : _this.urls.get_f_css_by_fid,
							data : { fid : fid , pid : pid },
							successFn : function(msg){

								if(msg.reCode==1){

									var $edit_group = $this.parents('.edit_floor_mask').find('.edit_group');

									$edit_group.attr('fid',msg.msg.fid);

									//$edit_group.find('.width').val(msg.msg.width);

									$edit_group.find('.marginA').val(msg.msg.marginA);

									$edit_group.find('.marginB').val(msg.msg.marginB);
									var model_type_name = '';
									if(msg.msg.model_type==1){
										model_type_name = '综合';
									}else if(msg.msg.model_type==2){
										model_type_name = '轮播';
									}else if(msg.msg.model_type==3){
										model_type_name = '宫格';
									}else if(msg.msg.model_type==4){
										model_type_name = '其他';
									}
									$edit_group.find('.model_type').val(model_type_name);

									var term_type_name = '';
									if(msg.msg.term_type==1){
										term_type_name = 'PC';
									}else if(msg.msg.term_type==2){
										term_type_name = 'WAP';
									}
									$edit_group.find('.term_type').val(term_type_name);

									$edit_group.find('.query_height').val(msg.msg.query_height);

									$edit_group.show();
									$this.addClass('clicked');
								}else{
									alert(msg.msg);
								}
							}
						});
						
					}
					
					
				});

				//点击编辑楼层保存按钮
				_this.o.$root.delegate('.edit_floor_mask .saveBtn','click',function(){
					var $this = $(this);

					if($this.parents('.edit_floor_mask').find('.unvalidate').length){
						alert('请检查，只能输入正整数或0');
						return;
					}

					var $edit_group = $this.parents('.edit_group');
						var fid = $edit_group.attr('fid');
						var pid = _this.o.$content.find('.cntr').attr('pid');
						//var width = $edit_group.find('.width').val();
						var marginA = $edit_group.find('.marginA').val();
						var marginB = $edit_group.find('.marginB').val();
						var f_css_s = 'margin-top:'+marginA+'px!important;margin-bottom:'+marginB+'px!important;';
						var model_type = $this.parents('.edit_group').find('.model_type_info').attr('val');
						var term_type = $this.parents('.edit_group').find('.term_type_info').attr('val');
						var query_height = $this.parents('.edit_group').find('.query_height').val();
						//console.log(model_type+'----------model_type,'+term_type+'----------term_type,'+query_height+'----------query_height');
						_this.ajax.common({
							url : _this.urls.set_f_css_by_fid,
							method : 'POST',
							data : {fid:fid,update_val:f_css_s , pid : pid ,model_type:model_type,term_type:term_type,query_height:query_height},
							successFn : function(msg){
								if(msg.reCode==1){
									//对于新增的楼层来说，这里需要先把楼层的样式放到style中去
									var style_s = $('.cntr > style').text().replace(/[\s]*/," ");
									var reg = new RegExp(fid+"\\{.*\\}");
									if(!reg.test(style_s)){//如果没匹配上，则说明楼层是刚刚新增的，需要先将样式添加进style中去
										var fstyle = '.c_'+fid+'{'+f_css_s+'}';
										$this.parents('.c_floor').addClass('c_'+fid);
										style_s += fstyle;
										$('.cntr > style').empty().append(style_s);
									}else{//如果匹配上，只需更新成最新的就行了
										_this.fn.update_css_by_reg(fid,f_css_s);
									}
									
									$this.parents('.edit_floor_mask').find('.edit_group').hide();//保存完后要隐藏
									$this.parents('.edit_floor_mask').find('.btn_group .edit').removeClass('clicked');

								}
							}
						});

				});

				//点击S按钮
				_this.o.$root.delegate('.edit_floor_mask .super','click',function(){
					var $this = $(this);
					var $floor_config = $this.parents('.edit_floor_mask').find('.floor_config');
					if($this.hasClass('clicked')){

						$floor_config.fadeOut('slow');
						$this.removeClass('clicked');
					}else{
						$floor_config.fadeIn('slow');
						$this.addClass('clicked');
					}
					
				});

				//下拉框事件
				_this.o.$root.delegate('.edit_floor_mask .chose_input','focus',function(){
					var $this = $(this);
					$this.parents('.edit_item').find('.chose_ul').show();
				});

				_this.o.$root.delegate('.edit_floor_mask .chose_ul li','click',function(){
					var $this = $(this);
					$this.parents('.edit_item').find('.chose_ul_info').attr('val',$this.attr('val'));
					$this.parents('.edit_item').find('.chose_input').val($this.text());
					$this.parent().hide();
				});

			},
			edit_page_win_event : function(){
				//编辑页中的布局列表点击事件
				_this.o.$root.delegate('.layoutlist .piece_ul li','click',function(){
					//1.高亮
					var $this = $(this);
					$this.addClass('active').siblings().removeClass('active');
					//2.换图片
					var imgurl = $this.attr('img_data');
					imgurl && $this.parents('.content').find('.prev_view img').attr('src',imgurl);

					//3.存信息
					//如果下面的pagelist有高亮的，则获取高亮pageid，然后得到相应的pageinfo信息进行显示，如果没有高亮，则仅存layout相关信息
					var $page_active = $('#chose_page_cntr .page_ul li.active');
					var layout_id = $this.attr('dataid');
					var layout_name = $this.find('.ctnli').text();
					var $pageinfo = $this.parents('.content').find('.pageinfo');

					if($page_active.length){
						var pid = $page_active.attr('pid');
						_this.ajax.common({
							url : _this.urls.get_page_layout_info_by_pid_lid,
							data : {pid : pid,lid : layout_id},
							successFn : function(msg){
								if(msg.reCode==1){
									$pageinfo.find('.p_page_url').val(msg.page_url);
									$pageinfo.find('.p_prev_view_url').val(msg.prev_view_url);
									$pageinfo.find('.p_edit_url').val(msg.edit_page_url);
									$pageinfo.find('.p_project').val(msg.project_name);

								}else if(msg.reCode==10000){ //如果没有数据，则清空
									$pageinfo.find('.p_page_url').val('');
									$pageinfo.find('.p_prev_view_url').val('');
									$pageinfo.find('.p_project').val('');
								}else{
									alert(msg.msg);
								}
							}
						});
					}
					var $p_layout = $pageinfo.find('.p_layout');
					$p_layout.val(layout_name);
					$p_layout.attr('layoutid',layout_id);
					
				});

				//编辑页的保存按钮事件
				_this.o.$root.delegate('#chose_page_cntr .pageinfo .saveBtn','click',function(){
					var $this = $(this);
					var $edit_group = $this.parent();
					var name = $edit_group.find('.p_name').val();
					var url = $edit_group.find('.p_url').val();
					var project_name = $edit_group.find('.p_project').val();
					var layout_id = $edit_group.find('.p_layout').attr('layoutid');
					var pid = $edit_group.attr('pid');
					var edit_url = $edit_group.find('.p_edit_url').val();
					var page_url = $edit_group.find('.p_page_url').val();
					var prev_view_url = $edit_group.find('.p_prev_view_url').val();

					if(/^\s*$/.test(edit_url)){
						alert('【编辑url】不能为空！');
						return;
					}
					if(!/^\/\w+\/\w+\.html$/.test(edit_url)){
						alert('【编辑url】格式为【/xxx/x.html】，即斜杠+目录名+文件名.html,注意前后没有空格！');
						return;
					}

					if(/^\s*$/.test(prev_view_url)){
						alert('【预览url】不能为空！');
						return;
					}
					if(!/^\/\w+\/\w+\.html$/.test(prev_view_url)){
						alert('【预览url】格式为【/xxx/x.html】，即斜杠+目录名+文件名.html,注意前后没有空格！');
						return;
					}

					if(/^\s*$/.test(page_url)){
						alert('【正式url】不能为空！');
						return;
					}
					if(!/^\/\w+\/\w+\.html$/.test(page_url)){
						alert('【正式url】格式为【/xxx/x.html】，即斜杠+目录名+文件名.html,注意前后没有空格！');
						return;
					}

					_this.ajax.common({
						url : _this.urls.save_or_update_page_info,
						method : 'POST',
						data : {
							name : name,
							url : url,
							project_name : project_name,
							layout_id : layout_id,
							page_id : pid,
							page_url : page_url,
							prev_view_url : prev_view_url,
							edit_page_url : edit_url
						},
						successFn : function(msg){
							if(msg.reCode==1){
								_this.ajax.common({
									url : _this.urls.generate_edit_html,
									method : 'POST',
									data : {pid : msg.pid,lid : layout_id,edit_url:edit_url},
									successFn : function(msg){
										if(msg.reCode==1){
											window.open(msg.the_url);
											window.location.reload(true);
										}else{
											alert('生成页面失败....');
										}
										
									}
								});
								
							}
						}
					});

				});

				//点击page列表时
				_this.o.$root.delegate('#chose_page_cntr .c_bottom .page_ul li','click',function(){
					//一旦点击列表，则【页面名称就不能编辑了，如果想新增主刷新页面】
					$('#chose_page_cntr .p_name').attr('readonly','readonly');
					var $this = $(this);
					$this.addClass('active').siblings().removeClass('active');
					var $edit_group = $this.parents('.content').find('.pageinfo .edit_group');
					$edit_group.find('.p_name').val($this.attr('p_name'));
					$edit_group.find('.p_page_url').val($this.attr('p_page_url'));
					$edit_group.find('.p_prev_view_url').val($this.attr('p_prev_view_url'));
					$edit_group.find('.p_edit_url').val($this.attr('p_edit_page_url'));
					$edit_group.find('.p_project').val($this.attr('p_project_name'));
					$edit_group.attr('pid',$this.attr('pid'));

					var c_layout_id = $this.attr('p_c_layout_id');
					$edit_group.find('.p_layout').attr('layoutid',c_layout_id);

					var $piece_ul = $this.parents('.content').find('.layoutlist .piece_ul');
					var $target_li = $piece_ul.find('li[dataid="'+c_layout_id+'"]');
					$target_li.addClass('active').siblings().removeClass('active');
					var img_data = $target_li.attr('img_data');
					var layout_name = $target_li.find('.ctnli').text();
					$edit_group.find('.p_layout').val(layout_name);
					$this.parents('.content').find('.prev_view img').attr('src',img_data);
				});

				//双击page列表时
				_this.o.$root.delegate('#chose_page_cntr .c_bottom .page_ul li','dblclick',function(){
					var edit_url = $(this).attr('p_edit_page_url');
					window.open('/generate_html/edit'+edit_url);
				});

				_this.o.$root.delegate('#chose_page_cntr .layoutlist .c_title',{
					mouseenter : function(){
						_this.create_layout_show_timer = setTimeout(function(){
							$('#create_layout_btn').fadeIn('slow');
						},3000);
					},
					mouseleave : function(){
						clearTimeout(_this.create_layout_show_timer);
						_this.create_layout_show_timer = null;
						$('#create_layout_btn').fadeOut('slow');
					}
				});
				_this.o.$root.delegate('#create_layout_btn','click',function(){
					window.open('/create_layout.html');
				});
				
			}
		};
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
			re_parse_floor_model : function(fid,mid){
				var $c_floor = _this.o.$root.find('.c_floor[fid="'+fid+'"]');
				var $c_model = _this.o.$root.find('.c_model[mid="'+mid+'"]');
				var that = this;
				var queryparams = "'"+fid+mid+"'";//查询字符串，格式'fidmid','fidmid'
				_this.ajax.common({
					url : _this.urls.get_floor_model_datas_of_layout,
					method : 'POST',
					data : {queryparams : queryparams},
					successFn : function(msg){
						if(msg.reCode==0){//如果有数据
							that.parse_c_floor_model(msg.msg,$c_floor,$c_model);
						}else if(msg.reCode=10001){
							console.log(msg.msg);
						}else{
							console.log('可能页面还没有模板，或模板没有数据...');
						}
					}
				});
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

				if($c_block.find('.noFloorHintInfo').length==0){
					var height = $c_block.height();
					var noFloorHintInfo_html = _this.html.getNoXHintInfo("暂没有楼层，请添加楼层","noFloorHintInfo",'#88ff3d',24);
					$c_block.append(noFloorHintInfo_html).find('.noFloorHintInfo').css({lineHeight:height+'px'});
				}
					

				if($c_floors.length){//下面有元素再进行处理，否则没必要处理
					_this.fn.removeDefaultHeightColor($c_block);
					$c_floors.each(function(){
						var $c_floor = $(this);
						that.parse_c_floor($c_floor);
					});
				}else{
					_this.fn.addDefaultHeightColor($c_block);
					//如果当前block下面没有floor，则在页面进行提示
					$c_block.find('.noFloorHintInfo').show();
				}


			},
			parse_c_floor : function($c_floor){

				if($c_floor.find('.noModelHintInfo').length==0){
					var height = $c_floor.height();
					var noFloorHintInfo_html = _this.html.getNoXHintInfo('暂没有模板，请关联模板','noModelHintInfo','#F9F4AA',20);
					$c_floor.append(noFloorHintInfo_html).find('.noModelHintInfo').css({lineHeight:height+'px'});
				}

				var $c_models = $c_floor.find('.c_model');
				if($c_models.length==1){
					_this.fn.removeDefaultHeightColor($c_floor);
				}else if($c_models.length > 1){
					console.log('一个楼层内，只能有一个c_model元素，即一个楼层只能套一个模板');
				}else{
					$c_floor.find('.noModelHintInfo').show();
				}

				if($c_floor.find('.c_floor_btn_group').length==0){
					var add_btn_html = _this.html.getAddFloorBtns();
					$c_floor.append(add_btn_html);//给块元素加上增加楼层按钮
				}
				this.parse_c_edit($c_floor);

				var $c_model = $c_floor.find('.c_model');
				var mid = $c_model.attr('mid');
				if(mid){
					var html = $c_model.html();
					var class_s = $c_model.attr('class');
					$c_model.removeClass().addClass(class_s.replace(/css_namespace\w*/g,'c_'+mid));
					$c_model.empty().append(html.replace(/css_namespace\w*/g,'c_'+mid));
				}
				
			},
			parse_c_edit : function($scope){
				//对c_edit类的元素进行处理
				var c_edit_zone_html = _this.html.getEditZone();
				$scope.find('.c_edit_zone').remove();
				$scope.find('.c_edit').append(c_edit_zone_html);
			},
			parse_c_model : function(json){
				//console.log(JSON.stringify(json));
				var that = this;
				if(json.length){
					_this.o.$content.find('.c_model').each(function(){
						var $c_model = $(this);
						var $c_floor = $c_model.parents('.c_floor');
						that.parse_c_floor_model(json,$c_floor,$c_model);
					});
				}
				//that.parse_c_edit(_this.o.$content);
				_this.o.$content.find('.cntr').show();
			},
			//解析某个楼层的模板
			parse_c_floor_model : function(json,$c_floor,$c_model){
				//console.log(JSON.stringify(json));
				var that = this;
				var fid = $c_floor.attr('fid');
				var mid = $c_model.attr('mid');

				var mrendertype = $c_model.attr('mrendertype');
				if(mrendertype==2){//如果模板类型为2，则需要进行加工，
					var tmp = $c_model.find('.tmpl').html();
					var data = that.get_data_by_fidmid(fid+mid,json);
					var html = juicer(tmp,data);
					$c_model.find('.translated').empty().append(html);
					//$this.find('.tmpl').remove();

					if($c_model.find('.floor_links').length){

						$c_model.find('.floor_links a').each(function(){
							var s = $(this).html();
							var title = $(this).attr('title');
							if(s.indexOf('##val##')!=-1){
								$(this).html(s.replace('##val##',title));
							}
						});
					}

				}else if(mrendertype==1){
					console.log('普通HTML模板，不需要进行juicer处理');
				}
					

				_this.fn.checkHeight($c_floor);//去掉默认高度后，检查一下如果该元素高度为0，则进行提示

				that.parse_c_edit($c_floor);
			},
			get_data_by_fidmid : function(fidmid,jsondata){
				for(var i = 0,j = jsondata.length; i < j;i++){
					if(fidmid==jsondata[i].c_floor_model_id){
						//这里再增加一个判断，如果没有数据，则提供data_model作为默认数据
						var data = jsondata[i].data;
						if(!data){
							data = jsondata[i].data_model;
						}
						return eval('('+data+')');
					}
				}
			}
		}
			
	},
	init : function(){
		
		this.init_o();
		this.init_unit();
		//显示选择布局按钮
		this.fn.add_fixed_btns();//加入悬浮按钮组
		this.fn.add_chose_model_win();//加入选择模板窗口
		this.fn.add_chose_page_win();//加入选择页面窗口
		this.fn.show_chose_page_win();//根据情况是否显示选择页面窗口

		this.bind();
		this.model_config_unit.bind();
	},
	init_o : function(){
		this.o.$root = $('#back');
		if(!$('#content').length){
			this.o.$root.append('<div id="content"></div><div id="config" class="need_remove"></div>');
		}
		
		this.o.$content = $('#content');
		this.o.$config = $('#config');

		var sys_btns_html = this.html.getSysBtns();
		this.o.$config.append(sys_btns_html);
		this.o.$sys_main_btns = $('#sys_btns').find('.main_btns');
		this.o.$sys_sub_btns = $('#sys_btns').find('.sub_btns');
	},
	init_unit : function(){
		this.fn = this.fn();
		this.ajax = this.ajax();
		this.move_unit = this.move_unit();
		this.parseHtml = this.parseHtml();
		this.extra_event = this.extra_event();
		this.model_config_unit = this.model_config_unit();
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
			block_move : function($fixbtn){
				this.floor_up_down_btn($fixbtn);
			},
			floor_create_show : function($fixbtn){
				//给每个c_block得到增加楼层html
				if(!$fixbtn.hasClass('active')){
					var html = _this.html.getAddBlockBtns();
					_this.o.$content.find('.c_block').append(html);
					$fixbtn.addClass('active')
				}else{
					_this.o.$content.find('.add_floor_mask').remove();
					$fixbtn.removeClass('active')
				}
				
			},
			floor_up_down_btn : function($fixbtn){
				//按c_block去控制c_floor按钮
				//_this.html.getBlockMoveBtns(index,totle);
				_this.o.$content.find('.c_block').each(function(){
					var $this = $(this);
					var $c_floors = $this.find('.c_floor');
					for(var i = 0,j = $c_floors.length; i < j ; i ++){

						var $cur_floor = $c_floors.eq(i);

						var $mask = $cur_floor.find('.floor_mask');
						if($mask.length){
							var is_hide = $mask.is(':hidden');
							if(is_hide){
								$mask.show();
								$fixbtn.addClass('active');
							}else{
								$mask.hide();
								$fixbtn.removeClass('active');
								//that.b_to_unabsolute();
							}
						}else{
							$fixbtn.addClass('active');
							var html = _this.html.getBlockMoveBtns(i,j);
							$cur_floor.append(html);
						}

					}
				});


			},
			//底部增加楼层的动画，1将块高度增加，2.将最后一个floor设置为absolute,top0,left0,3.移动到最下面的位置处
			add_to_bottom : function($c_block){
				var that = this;
				//执行开始将增加楼层按钮隐藏起来
				$c_block.find('.c_block_btn_group').hide();
				var old_height = 0;//如果块下面没有楼层，则old_height值为0
				var c_floor_length = $c_block.find('.c_floor').length;
				var move_time = 500;
				if(c_floor_length > 1){
					old_height = $c_block.height();
					move_time = _this.setting.new_move_time;
				}
				$c_block.height(old_height + _this.setting.new_floor_height);

				var target_top = old_height;

				var $last_floor = $c_block.find('.c_floor:last');
				$last_floor.css({
					position : 'absolute',
					top : 0,
					left : 0,
					width : '100%'
				}).show("slow",function(){
					$(this).animate({
						top : target_top
					},move_time,function(){
						//执行完后再把增加楼层按钮显示出来
						$c_block.find('.c_block_btn_group').show();
						_this.parseHtml.parse_c_block($c_block);//DOM操作完成后进行检查
						that.f_to_unabsolute($c_block);
					});
				});
			},
			//顶部增加楼层的动画，1.将块高度增加，2.将所有floor在当前top的基础上向下移动，3将最后一个floor插入到第一个位置，然后显示出来
			add_to_top : function($c_block){
				var that = this;
				$c_block.find('.c_block_btn_group').hide();
				var $last_floor = $c_block.find('.c_floor:last');
				$last_floor.hide();
				var old_height = 0;//如果块下面没有楼层，则old_height值为0
				var c_floor_length = $c_block.find('.c_floor').length;
				var move_time = 500;
				if(c_floor_length > 1){
					old_height = $c_block.height();
					move_time = _this.setting.new_move_time;
				}
				$c_block.height(old_height + _this.setting.new_floor_height);

				$c_block.find('.c_floor').each(function(index){
					var $this = $(this);
					var top = $this.position().top;
					$this.animate({top : top + _this.setting.new_floor_height},move_time + index * _this.setting.new_move_tuila_time,function(){
						$last_floor.css({
							position : 'absolute',
							top : 0,
							left : 0,
							width : '100%'
						}).show('slow',function(){
							$c_block.find('.c_floor:first').before($last_floor);
							$c_block.find('.c_block_btn_group').show();
							_this.parseHtml.parse_c_block($c_block);//DOM操作完成后进行检查
							that.f_to_unabsolute($c_block);
						});
						
					});
				});


			},
			//在点击增加楼层或上下移动时要执行该方法
			f_to_absolute : function($c_block){
				var $c_floors = $c_block.find('.c_floor');
				var floor_length = $c_floors.length;
				var c_block_height = 0;
				for(var i = floor_length - 1;i >= 0;i--){
					var $cur_floor = $c_floors.eq(i);

					var top = $cur_floor.position().top;
					var left = $cur_floor.position().left;
					c_block_height += $cur_floor.height();

					$cur_floor.css({
						position:'absolute',
						top:top,
						left:left,
						width:'100%'
					});

				}
				$c_block.height(c_block_height);
			},
			f_to_unabsolute : function($c_block){
				$c_block.removeAttr('style');
				$c_block.find('.c_floor').removeAttr('style');
			},
			bs_to_unabsolute : function(){
				_this.o.$content.removeAttr('style');
				_this.o.$content.find('.blocks_move').removeAttr('style');
			},
			b_to_unabsolute : function(){
				_this.o.$content.find('.clear_rx.blocks_move').removeAttr('style');
				_this.o.$content.find('.clear_rx.blocks_move').find('.c_block').removeAttr('style');
			},
			b_to_absolute : function($fixbtn){
				var that = this;
				if(_this.o.$content.find('.clear_rx.blocks_move').length==0){
					alert('该页面没有可供左右移动的HTML结构');
					$('#blockGroup_move_btn').addClass('notclick');
					return;
				}
				_this.o.$content.find('.clear_rx.blocks_move').each(function(){
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
								that.b_to_unabsolute();
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
							this.bs_to_unabsolute();
						}
					}else{
						$fixbtn.addClass('active');
						var html = _this.html.getBlockGroupsMoveBtns(i,blocks_length);
						$cur_blocks.append(html);
					}
				}
				
				$this.height(content_height);

			},
			f_update_btn : function($c_block){
				var $this = $c_block;
				var $floors = $this.find('.c_floor');
				for(var i = 0 , j = $floors.length ;i < j ; i++){
					var html = _this.html.getBlockMoveBtns(i,j);
					var $cur_floor = $floors.eq(i);
					$cur_floor.find('.floor_mask').remove();
					$cur_floor.append(html);
				}
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
			f_move_top_down : function($current_floor,$target_floor,direct,fn){
				var $c_block = $current_floor.parents('.c_block');
				this.f_to_absolute($c_block);

				var that = this;
				var current_top = $current_floor.position().top;
				var target_top = $target_floor.position().top;
				var current_height = $current_floor.height();
				var target_height = $target_floor.height();


				$current_floor.find('.floor_mask').hide();
				$target_floor.find('.floor_mask').hide();

				var x = 1;
				if(direct=='down'){
					x = -1;
				}

				var cur_end_top = current_top-x*target_height;
				var tar_end_top = target_top+x*current_height;

				$current_floor.animate({top:cur_end_top},1000);
				setTimeout(function(){
					$target_floor.animate({top:tar_end_top},1000,function(){
						if(direct=='up'){
							$current_floor.after($target_floor);
						}else{
							$current_floor.before($target_floor);
						}
						fn&&fn();
						that.f_update_btn($c_block);
						that.f_to_unabsolute($c_block);
					});
				},200);

			},
			event : function(){
				var that = this;
				_this.o.$root.delegate('.blocks_mask .up, .blocks_mask .down','click',function(){
					//先去调用后台，成功后再去移动页面元素,这里还要考虑，元素在运行中时要把这些移动按钮先隐藏起来
					var $this = $(this);
					var $current_blocks = $this.parents('.blocks_move');
					var $target_blocks = null;
					var direct = '';
					if($this.hasClass('up')){
						$target_blocks = $current_blocks.prevAll('.blocks_move').eq(0);
						direct = 'up';
					}else{
						$target_blocks = $current_blocks.nextAll('.blocks_move').eq(0);
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

					var pid = _this.o.$content.find('.cntr').attr('pid');

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
							target_blocks_order : target_blocks_order,
							pid : pid
						}
					});
				});

				_this.o.$root.delegate('.block_mask .right, .block_mask .left','click',function(){
					//先去调用后台，成功后再去移动页面元素,这里还要考虑，元素在运行中时要把这些移动按钮先隐藏起来
					var $this = $(this);
					var $current_block = $this.parents('.c_block');
					var $target_block = null;
					var direct = '';
					if($this.hasClass('left')){
						$target_block = $current_block.prevAll('.c_block').eq(0);
						direct = 'left';
					}else{
						$target_block = $current_block.nextAll('.c_block').eq(0);
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

					var pid = _this.o.$content.find('.cntr').attr('pid');

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
							target_block_order : target_block_order,
							pid : pid
						}
					});
				});

				_this.o.$root.delegate('.c_floor_btn_group .up, .c_floor_btn_group .down','click',function(){
					//先去调用后台，成功后再去移动页面元素,这里还要考虑，元素在运行中时要把这些移动按钮先隐藏起来
					var $this = $(this);
					var $current_floor = $this.parents('.c_floor');
					var $target_floor = null;
					var direct = '';
					if($this.hasClass('up')){
						$target_floor = $current_floor.prevAll('.c_floor').eq(0);
						direct = 'up';
					}else{
						$target_floor = $current_floor.nextAll('.c_floor').eq(0);
						direct = 'down';
					}
					

					var current_floor_order = $current_floor.attr('f_order');
					var target_floor_order = $target_floor.attr('f_order');
					var current_floor_id = $current_floor.attr('fid');
					var target_floor_id = $target_floor.attr('fid');
					if(!(target_floor_id&&target_floor_id&&current_floor_order&&target_floor_order)){
						console.log('current_floor_id:'+current_floor_id+',target_floor_id:'+target_floor_id+',current_floor_order:'+current_floor_order+',target_floor_order:'+target_floor_order+',排序用到的四个参数中有值为假的参数，请检查...');
						return;
					}
					var pid = _this.o.$content.find('.cntr').attr('pid');

					_this.ajax.common({
						url : _this.urls.floor_save_orders,
						successFn : function(msg){
							that.f_move_top_down($current_floor,$target_floor,direct,function(){
								$current_floor.attr('f_order',target_floor_order);
								$target_floor.attr('f_order',current_floor_order);
							});
						},
						data : { 
							current_floor_id : current_floor_id,
							target_floor_id : target_floor_id,
							current_floor_order : current_floor_order,
							target_floor_order : target_floor_order,
							pid : pid
						}
					});
				});
			}
		}
	},
	tools : {
		getRandomNum : function(Min,Max){ 

	        var Range = Max - Min; 

	        var Rand = Math.random(); 

	        return(Min + Math.round(Rand * Range)); 

		} 
	},
	model_config_unit : function(){
		var _this = this;
		return {
			urls : {

			},
			bind : function(){
				var that = this;
				//点击编辑按钮的时候,可以得到mid,fid以及可能有zone_id
				_this.o.$root.delegate('.c_edit_btn','click',function(){
					var $this = $(this);
					var $c_model = $this.parents('.c_model');
					var $c_floor = $this.parents('.c_floor');
					var mid = $c_model.attr('mid');
					var fid = $c_floor.attr('fid');
					var zone_id = $this.parents('.c_edit').attr('zone_id');
					var edit_type = $this.parents('.c_edit').attr('edit_type');
					
					_this.ajax.common({
						url : _this.urls.get_img_data_by_fidmid,
						data : {fid : fid,mid : mid},
						successFn : function(msg){
							if(msg.reCode==1){
								that.fn().reopen_model_config_win(eval('('+msg.msg+')'),zone_id,fid,mid);
							}else{
								alert('查询结果为空');
							}
						}
					});

				});

				//点击删除按钮时,首先删除的是当前表格中的当前行，保存后才保存数据,这里仅是操作DOM
				_this.o.$root.delegate('#cms_model_config_win .edit_list_table .edit_list_table_tr_del','click',function(){
					var $this = $(this);
					var $tr = $this.parents('tr');
					$tr.remove();
				});

				//点击行时,如果有预览图片，则更新预览图片,这里仅是操作DOM
				_this.o.$root.delegate('#cms_model_config_win .edit_list_table tr','click',function(){
					var $img = $(this).parents('.list_group').find('.list_prev_img');
					if($img.length){
						var tr_imgurl = $(this).find('img').attr('src');
						$img.attr('src',tr_imgurl);
					}
				});

				//点击新增按钮时,仅是操作DOM
				_this.o.$root.delegate('#cms_model_config_win .edit_list_table .add','click',function(){
					var $this = $(this);
					var $table = $this.parents('.edit_list_table');
					//根据th情况进行增加
					var html = '<tr>';
					var index = $table.find('tbody tr').length;
					$table.find('thead th').each(function(){
						var $th = $(this);
						var _html = '';
						if($th.attr('class')=='add'){
							_html = '<td class="del"><div class="edit_list_table_tr_del">删除</div></td>';
						}else{
							_html = '<td>'+that.fn().get_td_html_by_th($th,$th.attr('default_v'),index)+'</td>';
						}
						html += _html;
					});
					html += '</tr>';
					$table.append(html);
				});

				//点击保存按钮，拼装JSON，保存进数据库
				_this.o.$root.delegate('#cms_model_config_win .save','click',function(){
					//alert(123);
					var $cms_model_config_win = $('#cms_model_config_win');
					var target_zone_id = $cms_model_config_win.attr('target_zone_id');
					var s_json = $cms_model_config_win.attr('s_json');
					var json_obj = eval('('+s_json+')');
					var fid = $cms_model_config_win.attr('fid');
					var mid = $cms_model_config_win.attr('mid');
					//console.log(JSON.stringify(json_obj));

					$('#cms_model_config_win .edit_group.model_prop_list .edit_item').each(function(){
						var $this = $(this);
						var type = $this.attr('type');
						that.fn().parse_prop_by_type(json_obj,type,$this);
					});
					$('#cms_model_config_win .edit_group.zone_prop_list .edit_item').each(function(){
						var $this = $(this);
						var type = $this.attr('type');
						that.fn().parse_zone_prop_by_type(json_obj,type,$this,target_zone_id);
					});

					//return;
					_this.ajax.common({
						url : _this.urls.save_data,
						method : 'POST',
						data : {to_save_data : JSON.stringify(json_obj),fid:fid,mid:mid},
						successFn : function(msg){
							if(msg.reCode==1){
								//$cms_model_config_win.hide();
								window.location.reload();
							}else{
								console.log('失败...')
							}
						}
					});

				});

				//点击背景，隐藏
				_this.o.$root.delegate('#cms_model_config_win .win_bg','click',function(){
					$('#cms_model_config_win').hide();
				});

			},
			html : {
				get_model_config_win : function(){
					return '<div id="cms_model_config_win" class="need_remove">'+
								'<div class="win_bg"></div>'+
								'<div class="model_config_win">'+
									'<div class="bg2"></div>'+
									'<div class="content">'+
										'<div class="edit_group model_prop_list">'+
											'{@each model_prop_list as it}'+
												'{@if it.type=="text"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="edit_item" key="${it.key}" type="text">'+
															'<span>${it.title}</span>'+
															'<input type="text" value="${it.value}"/>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
												'{@if it.type=="selection"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="edit_item" key="${it.key}" type="selection">'+
															'<span>${it.title}</span>'+
															'<select class="sel_input">'+
																'{@each it.options as o_it}'+
																	'<option value="${o_it.key}" {@if o_it.key==it.value}selected{@/if}>${o_it.value}</option>'+
																'{@/each}'+
															'</select>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
												'{@if it.type=="list"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="list_group">'+
															'{@if it.has_img}'+
																'<img class="maxh200 list_prev_img" src="">'+
															'{@/if}'+
															'<table class="edit_item edit_list_table" key="${it.key}" type="list">'+
																'<thead>'+
																	'<tr>{@each it.thead_ths as th_it}'+
																		'<th width_bz="${th_it.width_bz}" type="${th_it.type}" key="${th_it.key}" order_col="${th_it.order_col}" default_v="${th_it.default_v}" options="${th_it.options}" _title="${th_it.title}" img_h="${th_it.height}" img_w="${th_it.width}" img_s="${th_it.size}" input_id="${th_it.input_id}">${th_it.title}</th>'+
																	'{@/each}<th class="add" width_bz="1">新增</th></tr>'+
																'</thead><tbody>'+
																'{@each it.values as tr_it}'+
																	'<tr>'+
																		'{@each tr_it as td_it}'+
																			'<td value="${td_it.value}" _title="${td_it.title}"></td>'+
																		'{@/each}'+
																		'<td class="del">'+
																			'<div class="edit_list_table_tr_del">删除</div>'+
																		'</td>'+
																	'</tr>'+
																'{@/each}'+
																'</tbody>'+
															'</table>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
												'{@if it.type=="img"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="edit_item" key="${it.key}" type="img">'+
															'<span class="hastitle" title="上传图片限制：(宽:${it.width})，(高:${it.height})，(大小:${it.size})">${it.title}</span>'+
															'<input type="file" name="content" id="${it.input_id}" onchange="my_ajaxFileUpload(this,100,200,30)">'+
															'<span></span>'+
															'<div class="img_upload_div"><img src="${it.value}"></div>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
											'{@/each}'+
										'</div>'+

										'<div class="edit_group zone_prop_list">'+
											'{@each zone_prop_list as it}'+
												'{@if it.type=="text"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="edit_item" key="${it.key}" type="text">'+
															'<span>${it.title}</span>'+
															'<input type="text" value="${it.value}"/>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
												'{@if it.type=="selection"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="edit_item" key="${it.key}" type="selection">'+
															'<span>${it.title}</span>'+
															'<select class="sel_input">'+
																'{@each it.options as o_it}'+
																	'<option value="${o_it.key}" {@if o_it.key==it.value}selected{@/if}>${o_it.value}</option>'+
																'{@/each}'+
															'</select>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
												'{@if it.type=="list"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="list_group">'+
															'{@if it.has_img}'+
																'<img class="maxh200 list_prev_img" src="">'+
															'{@/if}'+
															'<table class="edit_item edit_list_table" key="${it.key}" type="list">'+
																'<thead>'+
																	'<tr>{@each it.thead_ths as th_it}'+
																		'<th width_bz="${th_it.width_bz}" type="${th_it.type}" key="${th_it.key}" order_col="${th_it.order_col}" default_v="${th_it.default_v}" options="${th_it.options}" _title="${th_it.title}" img_h="${th_it.height}" img_w="${th_it.width}" img_s="${th_it.size}" input_id="${th_it.input_id}">${th_it.title}</th>'+
																	'{@/each}<th class="add" width_bz="1">新增</th></tr>'+
																'</thead><tbody>'+
																'{@each it.values as tr_it}'+
																	'<tr>'+
																		'{@each tr_it as td_it}'+
																			'<td value="${td_it.value}" _title="${td_it.title}"></td>'+
																		'{@/each}'+
																		'<td class="del">'+
																			'<div class="edit_list_table_tr_del">删除</div>'+
																		'</td>'+
																	'</tr>'+
																'{@/each}'+
																'</tbody>'+
															'</table>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
												'{@if it.type=="img"}'+
													'{@if !it.edit_can_not_see}'+
														'<div class="edit_item" key="${it.key}" type="img">'+
															'<span class="hastitle" title="上传图片限制：(宽:${it.width})，(高:${it.height})，(大小:${it.size})">${it.title}</span>'+
															'<input type="file" name="content" id="${it.input_id}" onchange="my_ajaxFileUpload(this,100,200,30)">'+
															'<span></span>'+
															'<div class="img_upload_div"><img src="${it.value}"></div>'+
														'</div>'+
													'{@/if}'+
												'{@/if}'+
											'{@/each}'+
										'</div>'+

										'<div class="save">保存</div>'+
									'</div>'+
								'</div>'+
							'</div>';
				},
				getlist : function(jsondata){
					var tmpl = '{@each list as it}'+
									'<tr>'+
										'<td class="l_sort">${it.sort}</td>'+
										'<td class="l_href">${it.href}</td>'+
										'<td class="l_img">'+
											'<img src="${it.imgurl}" alt="">'+
										'</td>'+
										'<td class="l_desc">${it.desc}</td>'+
										'<td open_new="${it.open_new}" class="l_open_new">{@if it.open_new=="true"}是{@else}否{@/if}</td>'+
										'<td class="l_opt"><div class="l_del l_btn">删除</div></td>'+
									'</tr>'+
								'{@/each}';
					return juicer(tmpl,jsondata);
				}
			},
			fn : function(){
				var that = this;
				return {
					parse_prop_by_type : function(json_obj,type,$edit_item){
						var key = $edit_item.attr('key');
						if(type=='text'){
							var value = $edit_item.find('input').val();
							json_obj[key].value = value;
						}else if(type=='selection'){
							var value = $edit_item.find('select').val();
							json_obj[key].value = value;
						}else if(type=='list'){
							var new_list = [];
							var sort_index = -1;//-1为不排序
							$edit_item.find('thead th').each(function(index){
								if($(this).attr('order_col')){
									sort_index = index;
								}
							});

							$edit_item.find('tbody tr').each(function(){
								var $tr = $(this);
								var tr_arr = [];
								$tr.find('td').each(function(index){
									
									var val = '';
									val = $(this).find('.tdinputsel').val();
									if(!val){//图片的时候，上面取不出值，这时候需用下面的方法取值
										val = $(this).find('.tdinputsel').attr('src');
									}
									//var title = $(this).attr('_title');
									var title = $(this).parents('table').find('thead th:eq('+index+')').attr('_title');
									//console.log(title+'-----'+val);
									if(val && title){
										var td_obj = {};
										td_obj.value = val;
										td_obj.title = title;
										tr_arr.push(td_obj);
									}
									
								});
								new_list.push(tr_arr);
							});
							//排序
							if(sort_index!=-1){
								new_list.sort(function(a,b){return a[sort_index].value-b[sort_index].value});
							}

							json_obj[key].values = new_list;
						}else if(type=='img'){
							var value = $edit_item.find('img').attr('src');
							json_obj[key].value = value;
						}else{
							console.log('如果没有明确类型，则不进行处理...')
						}
					},
					parse_zone_prop_by_type : function(json_obj,type,$edit_item,target_zone_id){
						var zone_item_list = json_obj.zone_item_list;
						if(zone_item_list){
							for(var i = 0,j = zone_item_list.length;i < j;i++){
								if(zone_item_list[i].zone_id==target_zone_id){
									this.parse_prop_by_type(json_obj.zone_item_list[i],type,$edit_item);
									break;
								}
							}
						}
					},
					reopen_model_config_win : function(json,zone_id,fid,mid){
						//这里的zone_id属性可能为空
						//console.log(json);
						//console.log(JSON.stringify(json));
						//进行判断，如果已有，则不添加，在使用之前，需要先清空
						var translated_json = {model_prop_list:null,zone_prop_list:null};
						var tmpl = that.html.get_model_config_win();
						//console.log(json);
						translated_json.model_prop_list = this.model_obj_to_array(json);
						if(zone_id){translated_json.zone_prop_list = this.zone_obj_to_array(json,zone_id);}

						var html = juicer(tmpl,translated_json);
						if(!$('#cms_model_config_win').length){
							_this.o.$root.append(html);
						}else{
							$('#cms_model_config_win').remove();
							_this.o.$root.append(html);
						}
						$('#cms_model_config_win').attr('fid',fid).attr('mid',mid).attr('s_json',JSON.stringify(json)).attr('target_zone_id',zone_id);
						this.parse_edit_table();
					},
					parse_edit_table : function(){
						var _this = this;
						//根据title去关联
						$('#cms_model_config_win .edit_list_table').each(function(){
							var $table = $(this);
							//1.计算各列所占宽度，百分比
							var total_bz = 0;
							var $ths = $table.find('thead th');
							$ths.each(function(){
								var width_bz = $(this).attr('width_bz');
								if(width_bz){
									total_bz += parseInt(width_bz);
								}
							});
							$ths.each(function(){
								var $this = $(this);
								var width_bz = $this.attr('width_bz');
								if(width_bz){
									$this.css('width',100*width_bz/total_bz+'%');
								}
							});

							//2.根据title进行关联并按tr解析td
							var $trs = $table.find('tbody tr');
							$trs.each(function(tr_index){
								$(this).find('td').each(function(index){
									var $td = $(this);
									var value = $td.attr("value");
									var $th = _this.get_th_obj_by_title($td);//通过title得到th相关的配置信息
									var html = _this.get_td_html_by_th($th,value,tr_index);
									$td.append(html);
								});
							});
						});
					},
					get_td_html_by_th : function($th,value,index){
						var result = '';
						if(value){
							value = value.replace(/\"/g,"&#34");
						}
						if($th.length){
							var type = $th.attr('type');
							if(type=='text'){
								result = '<input type="text" class="tdinputsel" value="'+value+'" />';
							}else if(type=='selection'){
								var opt_s = $th.attr('options');
								var opt_o = eval('('+opt_s+')');
								var opts = '';
								if(opt_o.length){
									for(var i = 0,j = opt_o.length;i < j;i++){
										var selected_s = '';
										if(value==opt_o[i].key){
											selected_s = 'selected';
										}
										opts += '<option value="'+opt_o[i].key+'" '+selected_s+'>'+opt_o[i].value+'</option>';
									}
								}
								result = '<select class="sel_td_input tdinputsel">'+opts+'</select>';
							}else if(type=='img'){
								//console.log('img情况');
								var id = $th.attr('input_id')+''+index;
								var width = $th.attr('img_w');
								var height = $th.attr('img_h');
								var size = $th.attr('img_s');
								result = '<input type="file" name="content" id="'+id+'" onchange="my_ajaxFile2Upload(this,'+width+','+height+','+size+')" style="width:48%;margin-right:4px;" /><img src="'+value+'" class="tdinputsel tdimg">';
							}else{
								console.log('在list里面只有text,selection,img三种情况，其他情况不应该在这里出现.');
							}
						}
						return result;
					},
					get_th_obj_by_title : function($td){
						var title = $td.attr('_title');
						var $th = $td.parents('table').find('thead th[_title='+title+']');
						return $th;
					},
					model_obj_to_array : function(obj){ //将对象按一定规则转换成数组
						//对于整体来说，转换数组时不转换zone_item_list属性
						var result = [];
						for(var i in obj){
							if(i=='zone_item_list'){
								console.log('不处理')
							}else{
								//将key值放到对象中去
								if(typeof obj[i]=='object'){
									obj[i]['key'] = i;
									result.push(obj[i]);
								}
							}
						}
							
						return result;
					},
					zone_obj_to_array : function(obj,zone_id){
						var result = [];
						var list = obj.zone_item_list;
						var the_zone_obj = null;
						for(var i in list){
							if(list[i].zone_id==zone_id){
								the_zone_obj = list[i];
								break;
							}
						}

						console.log(the_zone_obj);
						if(the_zone_obj && the_zone_obj.zone_id){//如果有zone_id
							for(var i in the_zone_obj){
								if(i=='zone_id'){
									console.log('不处理')
								}else{
									//将key值放到对象中去
									if(typeof the_zone_obj[i]=='object'){
										the_zone_obj[i]['key'] = i;
										result.push(the_zone_obj[i]);
									}
								}
							}
						}else{
							console.log('请确认数据库中相应json格式是否正确 ，没有zone_id属性')
						}
							
						return result;
					}
				}
					
			}
		}
	}
}

//注意事项：一个页面，最终只有一个#back,只有一个#content,#content里面是每次换布局时要更新的内容

$().ready(function(){
	var cms = new CMS();
	cms.init();
});

function my_ajaxFile2Upload(fileObj,width,height,size){
	console.log(fileObj);
	var $img = $(fileObj).parents('.list_group').find('.list_prev_img');
	var $tdimg = $(fileObj).parent().find('img');

	ajaxImgUpload(fileObj,width,height,size,function(imgurl){
		$img.attr('src',imgurl);
		$tdimg.attr('src',imgurl);
	});
}
function my_ajaxFileUpload(fileObj,width,height,size){
	var $img = $(fileObj).parent().find('img');
	ajaxImgUpload(fileObj,width,height,size,function(imgurl){
		$img.attr('src',imgurl);
	});
}

function ajaxImgUpload(fileObj,width,height,size,fn){
	var allowExtention = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名
    var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
    var browserVersion = window.navigator.userAgent.toUpperCase();

    //var $img = $(fileObj).parent().find('img');
    var id = $(fileObj).attr('id');
    if (allowExtention.indexOf(extention) > -1) {

        $.ajaxFileUpload({
			url : '/file/upload',
			secureuri:false,
			fileElementId: id,
			type:"post",
			success:function(data,status){
				if(status=='success'){
					var reg = /\{.+\}/;
                    var msg_str = reg.exec(data)[0];
                    var msg_str_done = msg_str.replace(/\\\\/g,'/').replace('public','');
                    var msg_obj = eval('('+msg_str_done+')');
                    //$img.attr('src',msg_obj.img_path);
                    fn&&fn(msg_obj.img_path);
				}
			},
			error:function(){
			},
			dataType:'text'
		});

    } else {
        alert("仅支持" + allowExtention + "为后缀名的文件!");
        fileObj.value = ""; //清空选中文件
        if (browserVersion.indexOf("MSIE") > -1) {
            fileObj.select();
            document.selection.clear();
        }
        fileObj.outerHTML = fileObj.outerHTML;
    }

}