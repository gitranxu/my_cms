function CMS_layout(){
	this.o = {
		$root : null
	},
	this.urls = {
		generate_layout : '/layouteditmodel_manager/generate_layout',
		query_layout_edit_model : '/layouteditmodel_manager/query_layout_edit_model',
		change_layout_status : '/layouteditmodel_manager/change_layout_status'
	}
}
CMS_layout.prototype = {
	init : function(){
		this.init_o();
		this.init_unit();
		this.bind_event();
		this.tools_drag();//给工具箱加上拖动功能,每次拖动HTML有变化时，都要重新执行该方法
		this.init_ajax();
	},
	init_o : function(){
		this.o.$root = $('#back');

	},
	init_unit : function(){
		this.bind = this.bind();
		this.ajax = this.ajax();
		this.fn = this.fn();
	},
	bind : function(){
		var _this = this;
		return {
			sys : function(){
				_this.o.$root.delegate('.layout_save_btn','click',function(){
					var cntr_html = _this.o.$root.find('.prev_view_zone').html();
					var layout_name = $('.layoutname').val();
					var reg = /^[\u4e00-\u9fa5]+$/;//中文正则
					//如果没有c_block元素，则不能保存
					if($('.prev_view_zone').find('.c_block').length==0){
						alert('不合法1，请检查');
						return;
					}

					var valid2 = true;
					$('.blocks_move.clear_rx').each(function(){
						if($(this).find('.c_block').length==0){
							valid2 = false;
						}
					});
					if(!valid2){
						alert('不合法2，请检查');
						return;
					}

					var valid3 = true;
					$('.blocks_move.clear_rx').each(function(){
						var fl_length = $(this).find('.c_block.fl_rx').length;
						var block_length = $(this).find('.c_block').length;
						if(fl_length!=0&&block_length!=fl_length){
							valid3 = false;
						}
					});
					if(!valid3){
						alert('不合法3，请检查');
						return;
					}


					if(!reg.test(layout_name)){
						alert('仅支持中文，谢谢~');
						return;
					}
					
					html2canvas($('.for_img'),{
		                allowTaint : true,
		                taintTest : false,
		                onrendered : function(canvas){
		                    var dataUrl = canvas.toDataURL();
		                    _this.ajax.common({
								url : _this.urls.generate_layout,
								method : 'POST',
								data : {cntr_html:cntr_html,layout_name:layout_name,img_data:dataUrl},
								successFn : function(msg){
									if(msg.reCode==1){
										//alert(msg.msg);
										_this.init_ajax();
									}else{
										alert(msg.msg);
									}
								}
							});
		                }
		            });

							
				});

				//点击布局列表
				$('.layout_ul').delegate('li','click',function(ev){
					if(ev.target!=this){
						return;
					}
					var $this = $(this);
					$this.addClass('active').siblings().removeClass('active');
					$('.prev_view_zone').empty().append($this.attr('edit_model'));

					_this.fn.prev_view_zone_changed();
				});

				//点击布局列表中的启用禁用按钮
				$('.layout_ul').delegate('.canusebtn','click',function(ev){
					var $this = $(this);
					var $cur_li = $this.parent();
					var cur_status = $cur_li.attr('status');
					var layout_id = $cur_li.attr('id');

					_this.ajax.common({
						url : _this.urls.change_layout_status,
						data : {cur_status : cur_status,layout_id:layout_id},
						method : 'POST',
						successFn : function(msg){
							if(msg.reCode==1){

								if($cur_li.hasClass('use_on')){//启用转禁用
									$this.text('禁用');
									$cur_li.removeClass('use_on').addClass('use_off').attr('status',msg.changed_status);
								}else{
									$this.text('启用');
									$cur_li.addClass('use_on').removeClass('use_off').attr('status',msg.changed_status);
								}

							}else{
								alert('失败...');
							}
						}
					});

				});

				//点击布局列表旁边的是否过滤按钮
				$('#sys').delegate('.filter_use_off i','click',function(ev){
					var $this = $(this);
					var isfilter = 1;//1为过滤禁用记录
					if($this.hasClass('yes')){
						isfilter = 2;
					}

					_this.ajax.common({
						url : _this.urls.query_layout_edit_model,
						data : {isfilter : isfilter},
						successFn : function(msg){
							if(msg.reCode==1){
								//操作DOM
								var tmp = _this.html.layout_lis();
								var html = juicer(tmp,{list:msg.msg});
								$('.layout_ul').empty().append(html);

								if($this.hasClass('no')){
									$this.removeClass('no').addClass('yes');
								}else{
									$this.addClass('no').removeClass('yes');
								}
							}else{
								alert('失败...');
							}
						}
					});

								
				});

				//点击删除按钮del_btn
				$('.prev_view_zone').delegate('.del_btn','click',function(){
					$(this).parent().remove();
					_this.fn.prev_view_zone_changed();
				});

			},
			tools : function(){

				$('.bgcolors').delegate('.bgcolor','click',function(){
					var bgval = $(this).attr('bgval');
					$('.toolitem').removeClass('c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18').addClass(bgval);
					$(this).addClass('active').siblings().removeClass('active');
				});

			}
		}
	},
	bind_event : function(){
		this.bind.sys();
		this.bind.tools();
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
	init_ajax : function(){
		var _this = this;
		this.ajax.common({
			url : _this.urls.query_layout_edit_model,
			successFn : function(msg){
				if(msg.reCode==1){
					var tmp = _this.html.layout_lis();
					var html = juicer(tmp,{list:msg.msg});
					$('.layout_ul').empty().append(html);
				}else{
					alert(msg.msg);
				}
					
			}
		});
	},
	tools_drag : function(){
		var _this = this;
		$('.toolitem').each(function(){
			var $this = $(this);
			if($this.hasClass('blocks_full_haschild_tool')||$this.hasClass('blocks_full_nochild_tool')||$this.hasClass('blocks_center_haschild_tool')||$this.hasClass('blocks_center_nochild_tool')){
				_this.fn.drag($this[0],$('.cntr'));
			}else if($this.hasClass('block_full_tool')||$this.hasClass('block_center_tool')||$this.hasClass('block_fl_tool')||$this.hasClass('block_fr_tool')){
				_this.fn.drag($this[0],$('.blocks_move').not('.c_block'));
			}
			
		});
	},
	fn : function(){
		var _this = this;
		return {
			drag : function(obj,$topzs){
				obj.onmousedown = function(ev) {
					var ev = ev || event;
					
					var disX = ev.clientX - $(obj).offset().left;
					var disY = ev.clientY - $(obj).offset().top;
					//var oldZindex = $(obj).css('zIndex');
					//$(obj).css('zIndex',300);//提升层级
					if ( obj.setCapture ) {
						obj.setCapture();
					}

					//console.log($(obj).attr('class'));
					var top = $(obj).offset().top;
					var left = $(obj).offset().left;
					
					var newProduct = $('<div class="'+$(obj).attr('class')+'" appendhtmlclass="'+$(obj).attr('appendhtmlclass')+'">'+$(obj).html()+'</div>').css({top:top,left:left});
					$(document.body).append(newProduct);
					
					var theNearest = null;//碰撞的离的最近的块
					document.onmousemove = function(ev) {
						var ev = ev || event;
						
						var L = ev.clientX - disX;
						var T = ev.clientY - disY;

						theNearest = _this.fn.pzjc(newProduct,$topzs);
						
						newProduct.get(0).style.left = L + 'px';
						newProduct.get(0).style.top = T + 'px';
						
					}
					
					document.onmouseup = function() {
						document.onmousemove = document.onmouseup = null;
						if ( obj.releaseCapture ) {
							obj.releaseCapture();
						}
						//$(obj).css('zIndex',oldZindex);//还原层级
						
						//这一步，需要得到最近的容器，如果有，则创建，如果没有，说明没碰着，就不进行任何操作了
						if(theNearest){
							var tmp = newProduct;
							_this.fn.createNode(tmp,$(theNearest.block));
						}

						newProduct.remove();//放开按钮后将新创建的元素删掉
						$('#content .compPz').removeClass('compPz');

					}
					
					return false;
					
				}
			},
			pzjc : function($objA,$objB){
				var leftA = $objA.offset().left;
				var rightA = $objA.offset().left + $objA.width();
				var topA = $objA.offset().top;
				var bottomA = $objA.offset().top + $objA.height();
				$objB.each(function(){
					var leftB = $(this).offset().left;
					var rightB = $(this).offset().left + $(this).width();
					var topB = $(this).offset().top;
					var bottomB = $(this).offset().top + $(this).height();
					
					if(rightA < leftB || leftA > rightB || bottomA < topB || topA > bottomB){
						$(this).removeClass('compPz');
					}else{
						$(this).addClass('compPz');
					}
				});
				//通过上面的计算后，可以得到当前一共撞上的块数:$objA.parent().find('.compPz');
				
				var theNearest = _this.fn.getNearest($objA,$('.prev_view_zone').find('.compPz'));//得到距离最近的块
				if(theNearest){
					$('#content').find('.compPz').removeClass('compPz');
					$(theNearest.block).addClass('compPz');
				}
				return theNearest;
			},
			createNode : function($product,$container){
				//$container.css('background','yellow');
				var className = $product.attr('appendhtmlclass');

				var cn = $('.bgcolors .bgcolor').index($('.bgcolors .bgcolor.active'))+1;
				className += ' c'+cn;

				//这里做一个判断，如果容器为blocks_move,则创建子节点后，它的need_move_height及cn类型应该去掉
				if($container.hasClass('blocks_move')){
					$container.removeClass('need_move_height c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18');
					/*if($container.hasClass('wrap1200')){
						$container.removeClass('c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18');
					}*/
				}
				//在这里阻止不合法3
				if(className.indexOf('fl_rx')!=-1){//如果是浮动的
					if($container.find('.c_block:not(.fl_rx)').length){
						alert('不合法3,不能这样操作');
						return;
					}
				}

				if(className.indexOf('c_block')!=-1&&className.indexOf('fl_rx')==-1){//如果不是浮动的
					if(!$container.hasClass('cntr') && $container.find('.c_block.fl_rx').length){
						alert('不合法3,不能这样操作');
						return;
					}
				}

				var html = '<div class="'+className+'"><div class="need_remove del_btn">删除</div></div>';
				$container.append(html);
				_this.tools_drag();
				this.changeColor();

				this.prev_view_zone_changed();
			},
			changeColor : function(){
				var $bgcoloractive = $('.bgcolors .bgcolor.active');
				var length =  $('.bgcolors .bgcolor').length;
				var index = $('.bgcolors .bgcolor').index($bgcoloractive);

				index++;
				if(index==length){
					index = 0;
				}
				$bgcoloractive.removeClass('active');
				$('.bgcolors .bgcolor:eq('+index+')').addClass('active');

				var bgval = $('.bgcolors .bgcolor.active').attr('bgval');
				$('.toolitem').removeClass('c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18').addClass(bgval);
				
			},
			prev_view_zone_changed : function(){
				//这里还要加上for_img处理
				var html = $('.prev_view_zone .cntr').html().replace(/compPz/g,"").replace(/<div class="need_remove del_btn">删除<\/div>/g,"");
				$('.for_img').empty().append(html);
				//对for_img里的fl_rx元素宽度进行处理
				$('.for_img').find('.clear_rx.blocks_move').each(function(){
					var $this = $(this);
					if($this.find('.fl_rx').length){
						var percent = Math.floor(100/$this.find('.fl_rx').length);
						$this.find('.fl_rx').width(percent+'%');
					}
				});
			},
			getNearest : function($objA,$objB){
				var result = [];
				$objB.each(function(){
					var area = _this.fn.getArea($objA,$(this));
					result.push({block:this,area:area});
				});

				//var theMin = getMinFromArray([{a:1,distance:23},{a:1,distance:3},{a:1,distance:43}]);
				var theMin = _this.fn.getMinFromArray(result);
				return theMin;
			},
			getArea : function($objA,$objB){
				var leftA = $objA.offset().left;
				var rightA = $objA.offset().left + $objA.width();
				var topA = $objA.offset().top;
				var bottomA = $objA.offset().top + $objA.height();

				var leftB = $objB.offset().left;
				var rightB = $objB.offset().left + $objB.width();
				var topB = $objB.offset().top;
				var bottomB = $objB.offset().top + $objB.height();

				if(rightA < leftB || leftA > rightB || bottomA < topB || topA > bottomB){
					return 0;
				}else{
					if(leftA < leftB && rightA > leftB && rightA < rightB){
						if(topA > topB && bottomA < bottomB){
							//console.log('左小进');
							return (rightA - leftB) * (bottomA - topA);
						}else if(topA < topB && bottomA > topB && bottomA < bottomB){
							//console.log('左上小进');
							return (rightA - leftB)*(bottomA - topB);
						}else if(topA < bottomB && bottomA > bottomB && topA > topB){
							//console.log('左下小进');
							return (rightA - leftB)*(bottomB - topA);
						}else if(topA < topB && bottomA > bottomB){
							//console.log('左大进');
							return (rightA - leftB)*(bottomB - topB);
						}else{
							console.log('这种情况不存在，这是一种未碰撞的情况...');
						}
					}else if(leftA < rightB && rightA > rightB && leftA > leftB){
						if(topA > topB && bottomA < bottomB){
							//console.log('右小进');
							return (rightB - leftA) * (bottomA - topA);
						}else if(topA < topB && bottomA > topB && bottomA < bottomB){
							//console.log('右上小进');
							return (rightB - leftA)*(bottomA - topB);
						}else if(topA < bottomB && bottomA > bottomB && topA > topB){
							//console.log('右下小进');
							return (rightB - leftA)*(bottomB - topA);
						}else if(topA < topB && bottomA > bottomB){
							//console.log('右大进');
							return (rightB - leftA)*(bottomB - topB);
						}else{
							console.log('这种情况不存在，这是一种未碰撞的情况...');
						}
					}else if(leftA > leftB && rightA < rightB){
						if(topA > topB && bottomA < bottomB){
							//console.log('中小进');
							return (rightA - leftA) * (bottomA - topA);
						}else if(topA < topB && bottomA > topB && bottomA < bottomB){
							//console.log('中上小进');
							return (rightA - leftA)*(bottomA - topB);
						}else if(topA < bottomB && bottomA > bottomB && topA > topB){
							//console.log('中下小进');
							return (rightA - leftA)*(bottomB - topA);
						}else{
							console.log('这种情况不存在，这是一种未碰撞的情况...');
						}
					}else if(leftA < leftB && rightA > rightB){
						if(topA < topB && bottomA > topB && bottomA < bottomB){
							//console.log('大上进');
							return (bottomA - topB)*(rightB - leftB);
						}else if(topA < topB && bottomA > bottomB){
							//console.log('大中进');
							return (bottomB - topB)*(rightB - leftB);
						}else if(topA < bottomB && topA > topB && bottomA > bottomB){
							//console.log('大下进');
							return (bottomB - topA)*(rightB - leftB);
						}
					}
				}

			},
			getMinFromArray : function(arr){
				var theMin = arr[0];
				for(var i = 0;i<arr.length;i++){
					if(arr[i].area < theMin.area){
						theMin = arr[i];
					}
				}
				return theMin;
			}
		};
	},
	html : {
		layout_lis : function(){
			return '{@each list as it}'+
						'<li id="${it.id}" img_data="${it.img_data}" status="${it.valid}" edit_model="${it.edit_model}" class="{@if it.type==1}syslayout{@/if} {@if it.valid==1}use_on{@else}use_off{@/if}">${it.name}{@if it.type==1}(系统布局){@else}<div class="canusebtn">{@if it.valid==1}启用{@else}禁用{@/if}</div>{@/if}</li>'+
					'{@/each}';
		}
	}
}

$().ready(function(){
	new CMS_layout().init();
});