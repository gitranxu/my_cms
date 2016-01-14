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
			}
		}
	},
	bind_event : function(){
		this.bind.sys();
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
	fn : function(){
		var _this = this;
		return {};
	},
	html : {

	}
}

$().ready(function(){
	new CMS_layout().init();
});