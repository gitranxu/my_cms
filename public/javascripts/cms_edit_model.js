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
                    alert(msg_str);
                    //var msg_str_done = msg_str.replace(/\\\\/g,'/').replace('public','');
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

$().ready(function(){
    $('#model_edit_form').validate({
        submitHandler : function(form){
            console.log('验证通过后要执行的方法...');
            $(form).submit();
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
        }
    });


    $('#model_list_table').delegate('tbody tr','click',function(){
        var src = $(this).attr('img_url');
        $('.trimg').attr('src',src);
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
});