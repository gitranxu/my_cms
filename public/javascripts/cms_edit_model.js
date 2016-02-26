function my_ajaxModelFileUpload(fileObj){
	var allowExtention = ".html"; //允许上传文件的后缀名
    var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
    var browserVersion = window.navigator.userAgent.toUpperCase();

    var id = $(fileObj).attr('id');
    if (allowExtention.indexOf(extention) > -1) {
        //console.log('here.....................aaa');
        $.ajaxFileUpload({
			url : '/file/uploadmodel',
			secureuri:false,
			fileElementId: id,
			success:function(data,status){
				if(status=='success'){
					var reg = /\{.+\}/;
                    var msg_str = reg.exec(data)[0];
                    var msg_obj = eval('('+msg_str+')');
                    $('#'+id).next('input').val(msg_obj.file_name);
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

function my_ajaxImgUpload(fileObj,width,height){
    var allowExtention = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名
    var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
    var browserVersion = window.navigator.userAgent.toUpperCase();
    
    var id = $(fileObj).attr('id');
    if (allowExtention.indexOf(extention) > -1) {
        var maxSize=20;
        $.ajaxFileUpload({
            url: '/file/uploadImg?width='+ width +'&height='+ height +'&maxSize=' + maxSize, //用于文件上传的服务器端请求地址
            secureuri: false, //一般设置为false
            fileElementId: id, //文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'text', //返回值类型 一般设置为json
            type:"post",
            success: function (data, status)  //服务器成功响应处理函数
            {
                if(status=='success'){
                    var reg = /\{.+\}/;
                    var msg_str = reg.exec(data)[0];
                    var msg_str_done = msg_str.replace(/\\\\/g,'/').replace('public','');
                    var msg_obj = eval('('+msg_str_done+')');
                    //alert(msg_obj.img_path)
                    //$img.attr('src',msg_obj.img_path);
                    $('#'+id).parent().find('.img_url').val(msg_obj.img_path);
                    $('#'+id).parent().find('img').attr('src',msg_obj.img_path);
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert('u error '+e);
            }
        
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


$().ready(function(){
    $('#model_edit_form').validate({
        submitHandler : function(form){
            console.log('验证通过后要执行的方法...');
            //$(form).submit();
            $.ajax({
                url : '/edit_model_manager/saveOrUpdateModel',
                method : 'POST',
                data : $(form).serialize(),
                success : function(msg){
                    //alert('插入成功！');
                    if(msg.reCode==1){
                        alert(msg.msg);
                        window.location.reload();
                    }
                }
            });
        },
        rules : {
            model_width : {
                required : true,
                digits : true
            },
            model_height : {
                required : true,
                digits : true
            },
            name : {
                required : true
            }
        }
    });

    getAllModels();


    $('#model_list_table').delegate('tbody tr','click',function(){
        var src = $(this).attr('img_url');
        $('.trimg').attr('src',src);
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('#model_list_table').delegate('tbody tr .edit_btn','click',function(){
        var $tr = $(this).parents('tr');
        var $form = $('#model_edit_form');
        $form.find('.name').val($tr.find('td:eq(0)').text());
        $form.find('.id').val($tr.attr('id'));
        $form.find('.render_type').val($tr.attr('render_type'));
        $form.find('.term_type').val($tr.attr('term_type'));
        $form.find('.model_type').val($tr.attr('model_type'));
        $form.find('.model_width').val($tr.find('td:eq(4)').text());
        $form.find('.model_height').val($tr.find('td:eq(5)').text());
        $form.find('.img_url').val($tr.attr('img_url'));
        $form.find('.data_model').val($tr.attr('data_model'));
        $form.find('.content_name').val($tr.attr('content_name'));
    });

    $('#model_list_table').delegate('tbody tr .model_del_btn','click',function(){
        if(!window.confirm('你确定要删除该模板吗？')){
            return;
        }
        var id = $(this).parents('tr').attr('id');
        $.ajax({
            url : '/edit_model_manager/delModel',
            method : 'POST',
            data : {id : id},
            success : function(msg){
                if(msg.reCode==1){
                    alert(msg.msg);
                    window.location.reload();
                }
            }
        });
    });
    
});

function getAllModels(){
    //查找模板列表
    $.ajax({
        url : '/edit_model_manager/allModel',
        method : 'GET',
        success : function(data){
            var tmpl = document.getElementById('modellist').innerHTML;
            var html = juicer(tmpl,data);
            //console.log(JSON.stringify(data));
            //alert(html);
            $('#model_list_table').find('tbody').empty().append(html);

            //预览图显示第一条记录的图片
            var first_img_url = $('#model_list_table tbody tr:eq(0)').addClass('active').attr('img_url');
            $('.trimg').attr('src',first_img_url);
        }
    });
}