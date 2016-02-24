<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>  
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Xenon Boostrap Admin Panel" />
<meta name="author" content="" />
<title>后台管理界面</title>
<link rel="stylesheet" href="../css/fonts/linecons/css/family.css">
<link rel="stylesheet" href="../css/fonts/linecons/css/linecons.css">
<link rel="stylesheet" href="../css/fonts/fontawesome/css/font-awesome.min.css">
<link rel="stylesheet" href="../css/bootstrap.css">
<link rel="stylesheet" href="../css/xenon-core.css">
<link rel="stylesheet" href="../css/xenon-forms.css">
<link rel="stylesheet" href="../css/xenon-components.css">
<link rel="stylesheet" href="../css/xenon-skins.css">
<link rel="stylesheet" href="../css/custom.css">

<script src="../js/jquery-1.8.3.min.js"></script>
<script src="../js/jquery.tmpl.min.js"></script>
<script src="../js/t.js"></script>
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
<style type="text/css">
.tabname th {
	text-align: center;
}
</style>
</head>



<body class="page-body">
	<div class="page-container">
		<div class="main-content">
			<!-- top bar start -->
			<nav class="navbar user-info-navbar" role="navigation">
				<!-- Left links for user info navbar -->
				<ul class="user-info-menu left-links list-inline list-unstyled">
					<li class="hidden-sm hidden-xs">
						<a href="#" data-toggle="sidebar">
							<i class="fa-bars"></i>
						</a>
					</li>
					<li>
						<ol class="breadcrumb panel-title" style="margin-top:24px;">
							<li>
								<a href="getallclassification"><i class="fa-home"></i>分类管理</a>
							</li>
							<li class="active">
								<strong>添加分类</strong>
							</li>
						</ol>
					</li>
				</ul>
			</nav>
			<!-- top bar end -->
			
			<!-- main section -->
			<div class="panel panel-default ">
				<div class="tab-content">
					<div class="tab-pane active" style="width:90%" >
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">新增分类</h3>
							</div>
							<div class="panel-body">
								<form role="form" action="addMall" id="addmallform" method="post" onsubmit="return checkEmpty();" class="validate form-horizontal">
									<div class="form-group">
										<label class="col-sm-2 control-label" >分类名称<font color="red">*</font>:</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="name" id="name" placeholder="">
										</div>
									</div>
									<div class="form-group-separator"></div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >分类名称描述:</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="nameDesc" id="nameDesc" placeholder="">
										</div>
									</div>
									<div class="form-group-separator"></div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >分类层级<font color="red">*</font>:</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="levels" id="levels" value="${level+1 }" placeholder="" disabled>
											<input type="hidden" name="level" id="level" value="${level+1 }" />
										</div>
									</div>
									<div class="form-group-separator"></div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >链接<font color="red">*</font>:</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="url" id="url" placeholder="">
										</div>
									</div>
									<div class="form-group-separator"></div>
									<c:if test="${af==0}">
									<c:if test="${level+1==2}">
									<div id="gg">
									</div>
									</c:if>
									</c:if>
									<c:if test="${sf==0}">
									<div class="form-group">
										<label class="col-sm-2 control-label" >导航分类图标<font color="red">*</font>:</label>
										<div class="col-sm-10">
											<div class="col-sm-10">
												<span> 
		               								<font color="red" id="image_attr" >
														图片尺寸(像素)：${width}*${height}  大小：20K
													</font>
												</span>
											</div>
											<div class="col-sm-4">
												<a style="position:relative;display:block;width:100px;height:30px;line-height:30px;background:#EEE;border:1px solid #999;text-align:center;"  href="javascript:void(0);" >上传文件
												    <input type="file" name="file" id="filei3" onchange="ajaxFileUpload(3,${width},${height});" style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;opacity:0;" />
												</a>
											</div>
											<div>
												<a style="display:none;" target="_blank" id="image3" name="image3"></a>
											</div>
										</div>
									</div>
									<div class="form-group-separator"></div>
									
									<div class="form-group">
										<label class="col-sm-2 control-label" >促销语<font color="red">*</font>:</label>
										<div class="col-sm-4">
											<input type="radio" name="singal" id="singal" value="">无促销语
											<c:forEach items="${map}" var="sig">
												<input type="radio" name="singal" id="singal" value="${sig.key}">${sig.value}
											</c:forEach>
										</div>
									</div>									
									<div class="form-group-separator"></div>
									</c:if>
									
									<div class="form-group">
										<label class="col-sm-2 control-label" >排序<font color="red">*（大于0的整数）</font>:</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="orders" id="orders" onKeyUp="this.value=this.value.replace(/\D/g,'');" placeholder="请输入大于0的整数">
										</div>
									</div>
									<div class="form-group-separator"></div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >是否显示<font color="red">*</font>:</label>
										<div class="col-md-4">
											<select id="isDisplay" name="isDisplay" class="form-control" size="1">
												<option value="0" >是</option>
												<option value="1" >否</option>
											</select>
										</div>
									</div>
									<div class="form-group-separator"></div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >是否新窗口打开<font color="red">*</font>:</label>
										<div class="col-md-4">
											<select id="isBlank" name="isBlank" class="form-control" size="1">
												<option value="0" >否</option>
												<option value="1" >是</option>
											</select>
										</div>
									</div>
									<div class="form-group-separator"></div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >父ID<font color="red">*</font>:</label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="parentIdD" value="${pid}" id="parentIdD" placeholder="" disabled>
											<input type="hidden" name="parentId" id="parentId" value="${pid}" />
											<input type="hidden" name="num" id="num" value="${num}" />
										</div>
									</div>
									<div class="form-group-separator"></div>
									<div class="text-center">
										<input type="button" onclick="addMall()" class="btn btn-success" value="提交">
										<input type="button" onclick="history.go(-1)" class="btn btn-success" value="返回">
									</div>
								</form>
							</div>
						</div>						
					</div>				
				</div>
			</div>
		</div>
	</div>


	<!-- Bottom Scripts -->
	<script src="../js/bootstrap.min.js"></script>
	<script src="../js/TweenMax.min.js"></script>
	<script src="../js/resizeable.js"></script>
	<script src="../js/xenon-toggles.js"></script>
	<script src="../js/xenon-custom.js"></script>
	<script src="../js/ajaxfileupload.js"></script>
	
	<script>
		function ajaxFileUpload(obj,width,height) {
			var maxSize=20;
            $.ajaxFileUpload({
        	 	url: '../imageUpload/uploadJson?width='+ width +'&height='+ height +'&maxSize=' + maxSize, //用于文件上传的服务器端请求地址
                secureuri: false, //一般设置为false
                fileElementId: 'filei'+obj, //文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: 'json', //返回值类型 一般设置为json
                type:"post",
                success: function (data, status)  //服务器成功响应处理函数
                {
                	if(data.status || data.status=="true"){
                    	$("#image"+obj).attr("href",data.url);
                    	$("#image"+obj).html(data.url);
                    	$("#img"+obj).val(data.url);
                    	$("#image"+obj).show();
                	}else{
                		alert(data.msg);
                	}
                	
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                    alert('u error '+e);
                }
            
            });
            return false;
        }
        
        function addMall(){
        	if(checkEmpty()){
        		var urls = "addMall?eid="+'${eid}';
        		var adverts = {};
        		var num = $("#num").val();
        		if($.trim($("#level").val())=="2" && num>0){
        			for(var i = 0;i<num;i++){
        				adverts["img_"+i]=$.trim($("#image"+i).html());
        				adverts["img_"+i+"_url"]=$.trim($("#image"+i+"url").val());
        			}
        			//adverts["img_two"]=$.trim($("#image2").html());
        			//adverts["img_2_url"]=$.trim($("#image2url").val());
        		}
				$.ajax({
				    url :urls,
				    data:{
				    	level:parseInt($.trim($("#level").val())),
		        		orders:parseInt($.trim($("#orders").val())),
		        		parentId:$.trim($("#parentId").val()),
		        		name:$.trim($("#name").val()),
			        	nameDesc:$.trim($("#nameDesc").val()),
			        	url:$.trim($("#url").val()),
			        	adverts:JSON.stringify(adverts),
			        	icons:$.trim($("#image3").html()),
			        	singal:$('input:radio[name="singal"]:checked').val(),
			        	isDisplay:parseInt($("#isDisplay").val()),
			        	isBlank:parseInt($("#isBlank").val())
				    },
			        type : "post",
				    dataType : "json",
				    success : function(data) {
				    	alert(data.retMsg);
						window.location.href="../mall/getallclassification?eid="+'${eid}';
			     	}
			    });				        	
        	}
        }
        
        //非空判断
        function checkEmpty(){
        	var name = $.trim($("#name").val());//分类名称
        	var orders = $.trim($("#orders").val());//分类排序
        	
        	if(name==null || ""==name){
		 		alert('请输入分类名称'); 
		 		return false;
		 	}
		 	if(orders==null || ""==orders){
		 		alert('请输入分类排序'); 
		 		return false;
		 	}
		 	return true;
        }
        
        $(function(){
        	var num = $("#num").val();
        	$('#gg').html("");
        	if(num>0){
        		for(var i=0;i<num;i++){
        			$('#gg').append('<div class="form-group">'
					+'<label class="col-sm-2 control-label" >广告图'+i+'<font color="red">*</font>:</label>'
					+'<div class="col-sm-10">'
					+'<div class="col-sm-10">'
					+'<span>'
					+'<font color="red" id="image_attr" >'
					+'图片尺寸(像素)：252*160  大小：20K'
					+'</font>'
					+'</span>'
					+'</div>'
					+'<div class="col-sm-4">'
					+'<a style="position:relative;display:block;width:100px;height:30px;line-height:30px;background:#EEE;border:1px solid #999;text-align:center;"  href="javascript:void(0);" >上传文件'
					+'<input type="file" name="file" id="filei'+i+'" onchange="ajaxFileUpload('+i+',252,160);" style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;opacity:0;" />'
					+'</a>'
					+'</div>'
					+'<div>'
					+'<a style="display:none;" target="_blank" id="image'+i+'" name="image'+i+'"></a>'
					+'</div>'
					+'</div>'
					+'</div>'
					+'<div class="form-group-separator"></div>'
					+'<div class="form-group">'
					+'<label class="col-sm-2 control-label" >广告图'+i+'链接<font color="red">*</font>:</label>'
					+'<div class="col-sm-4">'
					+'<input type="text" class="form-control" name="image'+i+'url" id="image'+i+'url" placeholder="">'
					+'</div>'
					+'</div>'									
					+'<div class="form-group-separator"></div>"');
            	}
        	}
        });
	</script>
</body>
</html>