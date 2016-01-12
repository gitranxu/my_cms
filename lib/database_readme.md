
注意：c_block表中的数据有两种，一种是带blocks_move类的，这种的在渲染到页面时会加上id(这个id是c_blocks_id),另一种不作处理

1.对于块组级移动来说，必须带有blocks_move类，带有该类的元素视为块组级元素（即使只有一个块,对于独占一行的块级元素都要设置该样式类）
2.如果块级元素不独占一行，则其父元素必须设置clear_rx,blocks_move类，并且该块不能设置blocks_move类。
3.只有不独占一行的块级元素才支持左右移动，块组级元素一定独占一行
4.块级元素都必须有c_block类,


在块级元素上只有增加楼层按钮(每次增加都只是在最后一层添加，然后可以通过楼层的上下移动按钮自己去调整最佳位置)
增加楼层时，可以设置增加一个什么类型的楼层（轮播，普通，通用等）
在楼层元素上只有选择模板，上下移动按钮（没有增加楼层按钮）
块元素增加楼层时记得先把块元素的高度去掉


将来查数据时，分为几个阶段
首先查布局，块级，块信息
再根据块信息去查楼层信息，根据楼层信息去查模板信息，再根据模板信息去查具体数据
块id,甚至楼层id是全站唯一的，所以只需要根据楼层id及模板id去查询具体数据,也就是说相同的模板因楼层id的不同所体现出来的数据也不同

一个页面的最初始最简单的结构
<div id="back">
	<div id="content"></div>
	<div id="config"></div>
</div>

c_blocks的content的内容可以为空,可以不为空，不为空的时候,如果需要clear_rx则加上，如果需要子元素wrap1200可以加上，不需要可以不加
<div class="xx blocks_move">
	<div class="wrap1200"></div>
</div>


一个c_model最基本的content结构(juicer模板)【zone_key必填，可以先暂时认为zone_key与c_edit是一一对应关系】
<div class="c_model">
	<style>
		/* .aaa ul li{float: left;}
		.aaa ul li img{width: 200px;height: 170px;} */
	</style>
	<script class="tmpl" type="text/template">
		/*<ul class="clear_rx">
			{@each model_list as it}
				<li class="c_edit" zone_key="${it.zone_key}"><a href="${it.href}" {@if it.new_open}target="_blank"{@/if}><img src="${it.imgurl}" alt="${it.name}"></a></li>
			{@/each}
		</ul>*/
	</script>
	<div class="translated"></div>       【模板转换html后的存放位置】
</div>

一个c_model普通HTML模板至少需要下面的这个标签
<div class="c_model">
	
</div>


一个data_model最基本的结构【zone_key必填】
[
	{imgurl:"sys/default128X128.jpg",name:"默认图片",href:"www.baidu.com",new_open:false,zone_key:"1aa"},
	{imgurl:"sys/default128X128.jpg",name:"默认图片",href:"www.baidu.com",new_open:false,zone_key:"2bb"},
	{imgurl:"sys/default128X128.jpg",name:"默认图片",href:"www.baidu.com",new_open:true,zone_key:"3jk"}
]

c_page		页面表				(页面的名字不可以变，但url,project_name可以因不同的布局而不同)
id		name		create_time

c_layout	布局表
id		name		content		img_url		create_time
												
c_blocks	块组表
id		content		c_layout_id		create_time

c_block		块表
id		content		c_blocks_id		create_time

c_floor		楼层表
id		content		c_block_id		create_time

c_page_layout
id		c_layout_id		c_page_id		url			project_name		create_time		last_edit_time

c_page_blocks
id		c_blocks_id		c_page_id		order		style 		create_time		last_edit_time		

c_page_block
id		c_block_id		c_page_id		order		style 		create_time		last_edit_time

c_page_floor
id		c_floor_id		c_page_id		order		style 		create_time		last_edit_time


c_model		模板表(juicer) 						#模板表中含有区域属性zone(1,2,3)【例如八宫格模板】,zone(all)【轮播图】
id		name		content		data_model		img_url		type		create_time

c_data		数据表								#不同楼层(id唯一)不同模板的数据不一样
id		c_model_id		c_floor_id		c_floor_model_id		data




reCode 
	1	正常
	10000	返回值为空
	10001	传入的参数违法
	10002	插入失败



按钮的显示系统
1.fixed的那几个按钮，可以让用户移动它的位置
2.考虑块组，块级，楼层级以及编辑 按钮如何显示更加合理


亮点：
1.css_namespace，CSS样式占位符，避免了样式冲突的问题
		使用该功能，则c_model的格式为 css_namespaceXX
		<div class="c_model">
			<style>
				.css_namespaceliumeiling ul li{float: left;}
				.css_namespaceliumeiling ul li img{width: 140px;height: 110px;}
			</style>
			<script class="tmpl" type="text/template">
				<ul class="clear_rx">
					{@each model_list as it}
						<li class="c_edit" zone_key="${it.zone_key}"><a href="${it.href}" {@if it.new_open=="yes"}target="_blank"{@/if}><img src="${it.imgurl}" alt="${it.name}"></a></li>
					{@/each}
				</ul>
			</script>
			<div class="translated css_namespaceliumeiling"></div>
		</div>

2.如果要增加对bs,b,f等的边框边距的支持，需要提前加上占位符  //回头删掉
	a.所有对bs,b,f的宽高，外边距等样式的操作，最终会统一放到cntr元素下面的style中，占位符暂定为
	  	.css_rx_start{}
		.css_rx_end{}
		这两个类为空类，每次都是统一替换这两个占位符之间的内容(正则)，生成用户编辑后的，所以每次这种样式变化后，都要重新生成一次，并保存到数据库，所以这里要引入一个c_page表，每条记录有自己的编辑后的信息


2.对bs,f进行操作
	a.bs进行操作时，窗口显示bs(可编辑上下外边距，根据id进行)，同时判断这个bs下面b的数量，动态显示b的编辑列表(这样即有id又有bid的元素因其下面没有b，所以只能编辑bs的属性)，可编辑b的左右外边距和宽度，但总和不能超过bs的宽度
	b.f进行操作时，根据f的数量显示，可编辑f的上下外边距
	c.cntr元素下面的style中(这个style必须有，即使内容为空)，原则上这里的CSS样式都是关于bs,b,f的一些宽，外边距的样式
	d.因为一个布局的c_blocks_id,c_block_id是固定的，所以为了区分不同页面，需要加上页面与上述id的关联关系表，因c_floor_id是动态生成的，且是全局唯一的，所以无需建立关系表
	e.提供一个创建页面的窗口，用于建立页面与布局之间的关系，这个窗口一开始要求用户录入页面所属项目名称，页面名称，页面URL，页面选择的布局等信息，点击保存后，生成c_page记录，根据c_layout_id生成c_page_blocks及c_page_block记录等
	f.c_page_blocks的style默认值(margin-top:0px!important;margin-bottom:0px!important;width:1200px!important;)
	  c_page_block默认值(margin-left:0px!important;margin-right:0px!important;width:200px!important;)
	  c_floor的style默认值(margin-top:0px!important;margin-bottom:0px!important;),c_floor不编辑宽度,宽度始终等于c_block的宽度

	


SELECT 
  c_blocks_id,style bsstyle 
FROM
  c_page_blocks 
WHERE c_page_id = "6a7ded55-b670-11e5-828f-003067b83487" 
  AND c_blocks_id IN 
  (SELECT 
    id 
  FROM
    c_blocks 
  WHERE layout_id = 'c232ed09-af67-11e5-baf7-68f728f3bf19')
  
  
  
 SELECT c_block_id,style bstyle FROM c_page_block WHERE c_page_id = "6a7ded55-b670-11e5-828f-003067b83487" 
  AND c_block_id IN (SELECT id FROM c_block WHERE c_blocks_id IN(SELECT 
    id 
  FROM
    c_blocks 
  WHERE layout_id = 'c232ed09-af67-11e5-baf7-68f728f3bf19'))
  
  
  
  SELECT id fid,style fstyle FROM c_floor WHERE c_block_id IN (SELECT id FROM c_block WHERE c_blocks_id IN(SELECT 
    id 
  FROM
    c_blocks 
  WHERE layout_id = 'c232ed09-af67-11e5-baf7-68f728f3bf19'))
