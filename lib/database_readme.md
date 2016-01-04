
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

一个c_model最基本的content结构【zone_key必填，可以先暂时认为zone_key与c_edit是一一对应关系】
<div class="c_model">
	<style>
		/* .aaa ul li{float: left;}
		.aaa ul li img{width: 200px;height: 170px;} */
	</style>
	<script class="tmpl" type="text/template">
		/*<ul class="clear_rx">
			{@each model_list as it}
				<li class="c_edit" zone_key="${it.zone_key}"><a href=""><img src="/images/${it.imgurl}" alt="${it.name}"></a></li>
			{@/each}
		</ul>*/
	</script>
	<div class="translated"></div>       【模板转换html后的存放位置】
</div>

一个data_model最基本的结构【zone_key必填】
[
	{imgurl:"sys/default128X128.jpg",name:"默认图片",href:"www.baidu.com",new_open:false,zone_key:"1aa"},
	{imgurl:"sys/default128X128.jpg",name:"默认图片",href:"www.baidu.com",new_open:false,zone_key:"2bb"},
	{imgurl:"sys/default128X128.jpg",name:"默认图片",href:"www.baidu.com",new_open:false,zone_key:"3jk"}
]


c_layout	布局表
id		name		content		create_time
												#布局表中的数据，都有hid_rx样式，即一开始都是隐藏状态

c_blocks	块组表
id		order		content		layout_id		

c_block		块表
id		order		content		c_blocks_id

c_floor		楼层表
id		order		content		c_block_id

c_model		模板表(juicer) 						#模板表中含有区域属性zone(1,2,3)【例如八宫格模板】,zone(all)【轮播图】
id		name		content		data_model【该字段将来可以用于校验】

c_data		数据表								#不同楼层(id唯一)不同模板的数据不一样
id		c_model_id		c_floor_id		c_floor_model_id		data




reCode 
	1	正常
	10000	返回值为空
	10001	传入的参数违法



按钮的显示系统
1.fixed的那几个按钮，可以让用户移动它的位置
2.考虑块组，块级，楼层级以及编辑 按钮如何显示更加合理