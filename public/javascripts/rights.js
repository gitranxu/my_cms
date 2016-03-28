
var get_all_users = '/rights_manager/get_all_users'; 
var get_all_btns = '/rights_manager/get_all_btns';
var get_all_pages = '/rights_manager/get_all_pages';
var get_unright_models_by_user_id_page_id = '/rights_manager/get_unright_models_by_user_id_page_id';
var get_has_page_model_rights = '/rights_manager/get_has_page_model_rights';
var add_page_model_right_url = '/rights_manager/add_page_model_right_url';
var delete_page_model_right_url = '/rights_manager/delete_page_model_right_url';
var add_btns_right_url = '/rights_manager/add_btns_right_url';
var delete_btns_right_url = '/rights_manager/delete_btns_right_url';
var is_user_exist = '/rights_manager/is_user_exist';
var save_user = '/rights_manager/save_user';
var register_user_url = '/rights_manager/register_user_url';
var cancel_user_url = '/rights_manager/cancel_user_url';

$().ready(function(){
	rights_ajax();
	rights_event();
});

function rights_ajax(){
	user_list();
	btns_list();
	page_list();
}

//查询用户列表
function user_list(){
	$.ajax({
		url : get_all_users,
		success : function(msg){
			if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
			var tmpl = document.getElementById('userlist').innerHTML;
			var html = juicer(tmpl,msg);
			$('.userlist').empty().append(html);
		}
	});
}
//查询按钮列表
function btns_list(){
	$.ajax({
		url : get_all_btns,
		data : {
			user_id : $('.userlist li.active').attr('u_id')
		},
		success : function(msg){
			if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
			var tmpl = document.getElementById('btnslist').innerHTML;
			var html = juicer(tmpl,msg);
			$('.btnslist').empty().append(html);
		}
	});
}
//查询页面列表
function page_list(){
	$.ajax({
		url : get_all_pages,
		success : function(msg){
			if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
			var tmpl = document.getElementById('pagelist').innerHTML;
			var html = juicer(tmpl,msg);
			$('.pagelist').empty().append(html);
		}
	});
}

//得到某个用户某个页面未授权的模板列表
function get_unright_models(){
	$.ajax({
		url : get_unright_models_by_user_id_page_id,
		data : {
			p_id : $('.pagelist li.active').attr('p_id'),
			user_id : $('.userlist li.active').attr('u_id')
		},
		success : function(msg){
			if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
			var tmpl = document.getElementById('modellist').innerHTML;
			var html = juicer(tmpl,msg);
			$('.modellist').empty().append(html);
		}
	});
}

function rights_event(){
	form_event();
	page_event();
	user_event();
	unright_model_event();
	right_model_event();
	btns_event();
	generate_json_event();
}

function page_event(){
	$('.pagelist').delegate('li','click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		get_unright_models();//得到某个用户某个页面未授权的模板列表
	});
}

function user_event(){
	$('.userlist').delegate('li','click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var user_id = $(this).attr('u_id');
		get_user_has_page_model_rights(user_id);
		get_unright_models();//得到某个用户某个页面未授权的模板列表
		btns_list();
		re_show_user_info();
	});

	//注销用户
	$('.userlist').delegate('li .remove','click',function(){
		var $li = $(this).parents('li');
		var user_id = $li.attr('u_id');

		cancel_user(user_id,function(){
			$li.removeClass('right_li').addClass('unright_li');
			$li.find('.glyphicon-ok').addClass('glyphicon-remove').removeClass('glyphicon-ok');
			$li.find('.remove').addClass('glyphicon-ok add').removeClass('glyphicon-remove remove').attr('title','恢复');
		});
	});
	//恢复用户
	$('.userlist').delegate('li .add','click',function(){
		var $li = $(this).parents('li');
		var user_id = $li.attr('u_id');

		register_user(user_id,function(){
			$li.removeClass('unright_li').addClass('right_li');
			$li.find('.glyphicon-remove').addClass('glyphicon-ok').removeClass('glyphicon-remove');
			$li.find('.add').addClass('glyphicon-remove remove').removeClass('glyphicon-ok add').attr('title','注销');
		});
	});
}

function re_show_user_info(){
	var $cur_user = $('.userlist li.active');
	$('.name').val($cur_user.text());
	$('.user_id').val($cur_user.attr('u_id'));
}

function unright_model_event(){
	$('.modellist').delegate('li .add','click',function(){
		//得到user_id,p_id,m_id并保存进c_user_page_model中
		var $this = $(this);
		var user_id = $('.userlist li.active').attr('u_id');
		if(!user_id){
			alert('请选择用户.');
			return;
		}
		var p_id = $('.pagelist li.active').attr('p_id');
		var m_id = $this.parents('li').attr('m_id');
		add_page_model_right(user_id,p_id,m_id,function(){
			var p_name = $('.pagelist li.active').text();
			var m_name = $this.prev().text();
			var html = '<li m_id="'+m_id+'" p_id="'+p_id+'" m_name="'+m_name+'" p_name="'+p_name+'">'+p_name+'('+m_name+')<span class="glyphicon glyphicon-remove remove" title="收回"></span></li>';
			$('.hasmodellist').append(html);

			$this.parents('li').remove();
		});
	});
}

function right_model_event(){
	$('.hasmodellist').delegate('li .remove','click',function(){
		//根据u_id,p_id,m_id删除c_user_page_model记录,并在未授权列表中增加相应节点
		var $li = $(this).parents('li');
		var user_id = $('.userlist li.active').attr('u_id');
		var p_id = $li.attr('p_id');
		var m_id = $li.attr('m_id');
		delete_page_model_right(user_id,p_id,m_id,function(){
			//如果当前点击的pid与页列表中的active的pid相同，则操作一下未授权列表
			var cur_p_id = $li.attr('p_id');
			var active_p_id = $('.pagelist li.active').attr('p_id');
			if(cur_p_id == active_p_id){
				var m_name = $li.attr('m_name');
				var html = '<li m_id="'+m_id+'"><span class="model_name">'+m_name+'</span><span class="glyphicon glyphicon-ok add" title="授权"></span></li>';
				$('.modellist').append(html);
			}

			$li.remove();
		});

	});
}

function btns_event(){
	//回收按钮权
	$('.btnslist').delegate('li .remove','click',function(){
		var $li = $(this).parents('li');
		var btn_id = $(this).parents('li').attr('btn_id');
		var user_id = $('.userlist li.active').attr('u_id');
		if(!user_id){
			alert('请选择用户.');
			return;
		}
		delete_btns_right(user_id,btn_id,function(){
			$li.removeClass('right_li').addClass('unright_li');
			$li.find('.glyphicon-ok').addClass('glyphicon-remove').removeClass('glyphicon-ok');
			$li.find('.remove').addClass('glyphicon-ok add').removeClass('glyphicon-remove remove').attr('title','授权');
		});
	});
	//授与按钮权
	$('.btnslist').delegate('li .add','click',function(){
		var $li = $(this).parents('li');
		var btn_id = $li.attr('btn_id');
		var user_id = $('.userlist li.active').attr('u_id');
		if(!user_id){
			alert('请选择用户.');
			return;
		}
		add_btns_right(user_id,btn_id,function(){
			$li.removeClass('unright_li').addClass('right_li');
			$li.find('.glyphicon-remove').addClass('glyphicon-ok').removeClass('glyphicon-remove');
			$li.find('.add').addClass('glyphicon-remove remove').removeClass('glyphicon-ok add').attr('title','回收');
		});
	});
}

function add_btns_right(user_id,btn_id,fn){
	$.ajax({
		url : add_btns_right_url,
		data : {
			user_id : user_id,
			btn_id : btn_id
		},
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn();
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

function delete_btns_right(user_id,btn_id,fn){
	$.ajax({
		url : delete_btns_right_url,
		data : {
			user_id : user_id,
			btn_id : btn_id
		},
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn();
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

function cancel_user(user_id,fn){
	$.ajax({
		url : cancel_user_url,
		data : {
			user_id : user_id
		},
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn();
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

function register_user(user_id,fn){
	$.ajax({
		url : register_user_url,
		data : {
			user_id : user_id
		},
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn();
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

function delete_page_model_right(user_id,p_id,m_id,fn){
	$.ajax({
		url : delete_page_model_right_url,
		data : {
			user_id : user_id,
			p_id : p_id,
			m_id : m_id
		},
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn();
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

function add_page_model_right(user_id,p_id,m_id,fn){
	$.ajax({
		url : add_page_model_right_url,
		data : {
			user_id : user_id,
			p_id : p_id,
			m_id : m_id
		},
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn();
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

function get_user_has_page_model_rights(user_id){
	$.ajax({
		url : get_has_page_model_rights,
		data : {
			user_id : user_id
		},
		success : function(msg){
			if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
			var tmpl = document.getElementById('hasmodellist').innerHTML;
			var html = juicer(tmpl,msg);
			$('.hasmodellist').empty().append(html);
		}
	});
}

function form_event(){

	//validate
	$('#user_form').validate({
        submitHandler : function(form){
            
            //判断用户名是否已存在
            if($('._error').length){
            	return;
            }

           	if($('.password').val()!=$('.repassword').val()){
           		alert('两次密码不一致，请更改.');
           		return;
           	}
           	console.log('验证通过后要执行的方法...');
           	save_user_fn(function(msg){
           		if(msg.type==1){//新增
           			var html = '<li u_id="'+msg.id+'">'+msg.name+'</li>';
	           		$('.userlist').prepend(html);
           		}else{
           			$('.userlist li.active').text(msg.name);
           		}
	           		
           	});
        },
        rules : {
            repassword : {
                required : true
            },
            password : {
                required : true
            },
            name : {
                required : true
            }
        }
    });

	$('#user_form').delegate('.name','blur',function(){
		var $this = $(this);
		user_exist($this.val(),function(msg){
			if(msg.count){//用户已存在
				var err_html = '<label id="name_error" class="_error" for="name">用户名已存在.</label>';
				$this.parent().append(err_html);
			}else{
				$('#name_error').remove();
			}
		});
	});

}

function user_exist(user_name,fn){
	$.ajax({
		url : is_user_exist,
		data : {
			user_name : user_name
		},
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn(msg.msg);
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

function save_user_fn(fn){
	$.ajax({
		url : save_user,
		method : 'POST',
		data : $('#user_form').serialize(),
		success : function(msg){
			if(msg.reCode==1){
				fn&&fn(msg.msg);
			}else if(msg.reCode==99){//未登陆
				location.href = '/login.html';
				return;
			}
		}
	});
}

//生成权限json
function generate_json_event(){
	$('.generate_right_json_btn').click(function(){
		var json = {
			base : {},
			models : {
				"delete_floor_btn" : false,
				"chose_model_btn" : false,
				"c_edit_btn" : false,
				items : {}
			}
		};
		var user_id = $('.userlist li.active').attr('u_id');
		if(!user_id){
			alert('请选择用户.');
			return;
		}
		
		$('.btnslist li').each(function(){
			var $this = $(this);
			var right_prop = $this.attr('right_prop');
			if($this.hasClass('unright_li')){//未授权
				json.base[right_prop] = false;
			}else{
				json.base[right_prop] = true;
			}
		});

		$('.hasmodellist li').each(function(){
			var $this = $(this);
			var mid = $this.attr('m_id');
			json.models.items[mid] = {
				"delete_floor_btn" : true,
				"chose_model_btn" : true,
				"c_edit_btn" : true
			};
		});

		$('#right_json_prev').text(JSON.stringify(json));
	});
		
}