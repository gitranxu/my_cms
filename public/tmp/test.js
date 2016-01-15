<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>图片上传js判断</title>
<script type="text/javascript">
    var isimg = true;
    var img = null;
    function chksize() {
        if (img) img.removeNode(true);
        img = document.createElement("img");
        img.style.position = "absolute";
        img.style.visibility = "hidden";
        img.width = 0;
        img.height = 0;
        img.attachEvent("onreadystatechange", orsc);
        img.attachEvent("onerror", oe);
        document.body.insertAdjacentElement("beforeend", img);
        img.src = document.getElementById("flTitleImg").value;
        if (isimg == true) {
            document.getElementById('imgPreview').src = document.getElementById("flTitleImg").value;
        }
    }
    function oe() {
        isimg = false;
        alert("您选择的文件不是图片格式！");
        document.getElementById('imgPreview').src = '/images/nopic.gif';
        document.getElementById("fmUpoload").reset();
    }
 
    function orsc() {
        if (img.readyState != "complete") return false;
        if (img.fileSize > 1048576) {
            document.getElementById('imgPreview').src = '/images/nopic.gif';
            alert("您上传的图片超过了1M,请重新选择！！");
            document.getElementById("fmUpoload").reset();
        }
    }     
</script>
</head>
<body>
<form id="fmUpoload" method="post"  runat="server" enctype="multipart/form-data" name="fmUpoload">
  <table class="style1">
    <tr>
      <td class="style2"> 图片上传：</td>
      <td><input type="file" name="flTitleImg" id="flTitleImg" onchange="chksize()"  runat="server"/>
        <asp:Button ID="btnUpload" runat="server" Text="上传" onclick="btnUpload_Click" /></td>
    </tr>
    <tr>
      <td class="style2"> 图片预览：</td>
      <td><img alt="图片预览" src="/images/nopic.gif" id="imgPreview" style="width:120;height:90px"/></td>
    </tr>
  </table>
</form>
</body>
</html>