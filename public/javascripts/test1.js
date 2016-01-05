<input type="file" name="img"  id="fileToUpload" style="width:180px;" onchange="ajaxFileUpload(this);" /><span class="info">（最多可上传三张图片，图片宽高比例3：2，大小不超过300KB）</span></td>

 <script language="javascript" src="../assets/static/js/ajaxfileupload.js"></script>
 
var i = 0;
function ajaxFileUpload(fileObj) {
    if (i < 3) {
        var allowExtention = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
        var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
        var browserVersion = window.navigator.userAgent.toUpperCase();
        if (allowExtention.indexOf(extention) > -1) {
            $.ajaxFileUpload({
                url: 'ajax_imgupload.jsp',
                secureuri: false,
                fileElementId: 'fileToUpload',
                data: {
                    "types": "1"
                },
                dataType: 'json',
                success: function(data, status) {
                    if (typeof(data) != 'undefined') {
                        $.each(data,
                        function(k, v) {
                            $(".imagelist").find("li").eq(i).find("img").attr("src", v.url).attr("id", v.id).removeAttr("title");
                            i++;
                        });
                    }
                },
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
    } else {
        alert("最多可上传三张图片");
    }
}