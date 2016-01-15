function CMS_layout(){
	this.o = {
		$root : null
	},
	this.urls = {
		generate_layout : '/layouteditmodel_manager/generate_layout'
	}
}
CMS_layout.prototype = {
	init : function(){
		this.init_o();
		this.init_unit();
		this.bind_event();
		this.tools_drag();//给工具箱加上拖动功能
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
					var cntr_html = _this.o.$root.find('#content').html();
					_this.ajax.common({
						url : _this.urls.generate_layout,
						method : 'POST',
						data : {cntr_html:cntr_html,layout_name:'模板BB',img_url:'/images/upload/4.jpg'},
						successFn : function(msg){
							if(msg.reCode==1){
								alert(msg.msg);
							}else{
								alert(msg.msg);
							}
						}
					});
				});
			},
			tools : function(){

				$('.bgcolors').delegate('.bgcolor','click',function(){
					var bgval = $(this).attr('bgval');
					$('.toolitem').removeClass('c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18').addClass(bgval);
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
					
					//console.log(ev.clientX+'---'+ev.clientY+'--------------'+top+'---'+left);
					console.log($(obj).attr('appendhtml'));
					var newProduct = $('<div class="'+$(obj).attr('class')+'" appendhtml="'+$(obj).attr('appendhtml')+'">'+$(obj).text()+'</div>').css({top:top,left:left});
					$(document.body).append(newProduct);
					
					//var theNearest = null;//碰撞的离的最近的块
					document.onmousemove = function(ev) {
						var ev = ev || event;
						
						var L = ev.clientX - disX;
						var T = ev.clientY - disY;
						//theNearest = pzjc(newProduct,$(obj).parent().find('.stone'));//碰撞检测,返回离的最近的块
						_this.fn.pzjc(newProduct,$topzs);
						//console.log(newProduct.get(0).style);
						newProduct.get(0).style.left = L + 'px';
						newProduct.get(0).style.top = T + 'px';
						
					}
					
					document.onmouseup = function() {
						document.onmousemove = document.onmouseup = null;
						if ( obj.releaseCapture ) {
							obj.releaseCapture();
						}
						//$(obj).css('zIndex',oldZindex);//还原层级
						var tmp = newProduct;
						_this.fn.createNode(tmp,$topzs);
						newProduct.remove();//放开按钮后将新创建的元素删掉

						/*if(theNearest){//如果得到了最近的块，则将之前碰撞到的所有的块的高亮去掉，然后只给这一块加上高亮
							//newProduct.parent().find('.compPz').removeClass('compPz');
							$(theNearest.block).removeClass('compPz');
							newProduct.remove();//放开按钮后将新创建的元素删掉
							var id = $(theNearest.block).attr('id');
							var className = $(obj).attr('class');
							createPlant(id,className);//根据不同的类名，创建不同的植物类型(该方法在zwdzjs.js中定义)
							
						}*/
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
				
				/*var theNearest = getNearest($objA,$objA.parent().find('.compPz'));//得到距离最近的块
				if(theNearest){
					$(theNearest.block).parent().find('.compPz').removeClass('compPz');
					$(theNearest.block).addClass('compPz');
				}
				return theNearest;*/
			},
			createNode : function($product,$container){
				$container.css('background','yellow');
				var html = $product.attr('appendhtml');
				$container.append(html);
			}
		};
	},
	html : {

	}
}

$().ready(function(){
	new CMS_layout().init();
});