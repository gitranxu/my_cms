
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
<div class="c_model css_namespacexx">   在模板中有一个c_edit类可以定义编辑按钮，在这个类对应的元素上有一个edit_type属性：1.轮播,2.n宫格
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
id		name		content		img_url		create_time		edit_model		last_edit_time		valid
												
c_blocks	块组表
id		content		c_layout_id		create_time

c_block		块表
id		content		c_blocks_id		create_time

c_floor		楼层表
id		content		c_block_id		create_time

c_page_layout
id		c_layout_id		c_page_id		project_name		create_time		last_edit_time

c_page_blocks
id		c_blocks_id		c_page_id		order		style 		create_time		last_edit_time		

c_page_block
id		c_block_id		c_page_id		order		style 		create_time		last_edit_time

c_page_floor
id		c_floor_id		c_page_id		order		style 		create_time		last_edit_time		model_type		term_type		query_height


c_model		模板表(juicer) 						#模板表中含有区域属性zone(1,2,3)【例如八宫格模板】,zone(all)【轮播图】
id		name		content		data_model		img_url		type		create_time		last_edit_time		term_type		model_height		model_width

c_data		数据表								#不同楼层(id唯一)不同模板的数据不一样
id		c_model_id		c_floor_id		c_floor_model_id		data

c_generate_html_config
id		c_page_id		c_layout_id		prev_view_url		page_url		create_time		last_edit_time


reCode 
	1	正常
	10000	返回值为空
	10001	传入的参数违法
	10002	插入失败
	10003	未找到配置信息
	10004	配置信息所指目录不存在
	10005	名称已存在，请换用其他名称

按钮的显示系统
1.fixed的那几个按钮，可以让用户移动它的位置
2.考虑块组，块级，楼层级以及编辑 按钮如何显示更加合理


查询模板时，如果传过来的宽度大于1200，则意思为通屏，通屏可以查询宽度满足大于等于1200的模板

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



配置统一JSON格式：
规则1：严格遵循JSON格式
规则2：所有宫格都按顺序放到zone_item_list数据中，且有zone_id属性,一般情况下，该元素上同时要加上c_edit类名。

规则3：类型为list的对象设置时，thead_ths属性中的对象的顺序与values中子数组中对象的顺序保持一致，其中thead_ths中对象中除了有表示类型的type属性外，还有表示宽度占比的属性width_bz,表示所占宽度的比重,order_col:true表示以该th值为参考值进行排序,这个属性可以没有，但最多只能一个th有,default_v表示当点击新增时的默认值，对于类型为selection对象来说，在设置其options时，一定要注意在这儿，这是一个字符串，提供选择的数组对象要放在双引号中！
如果list有图片，则需要加上"has_img":true

规则4：如果编辑时不想显示某个编辑项，则显示声明edit_can_not_see : true，默认不加是显示的

规则5：对于类型为img的对象设置来说，最好设置时每次给的input_id的值不要一致，当然，在zone_item_list中，每个对象之间的input_id值可以一致

规则6：类型为tree的，根节点的pId为0

规则7：类型为ajax_win的，意思是提供了一个点击按钮，点击的时候弹出一个选择窗口，双击里面的列表项，则将对应的值自动带出。(目前提供了一个选择商品列表的服务，service,fn_name的值固定写死，以后加其他服务时，这两个值会变，该服务双击列表项时，带出的值，固定为product_name[商品名称],cp_name[产品名称],wl_no[物料编号],cp_no[产品编号],sale_type[销售类型],term_type[平台],price[价格],product_imgurl[图片链接]，所以用到该服务的模板，如果想使用该功能，则在定义json格式时，key值对应成相应的值即可)

{
    "floor_name": {
        "value": "1F Lenovo 电脑 楼层一", 
        "type": "text", 
        "title": "标题"
    }, 
    "chose_product":{
        "type":"ajax_win",
        "title":"选择商品",
        "service":"chose_product",
        "fn_name":"chose_product_service"
    },
    "ishot": {
        "value": "1", 
        "type": "selection", 
        "title": "是否热卖", 
        "options": [
            {
                "key": 1, 
                "value": "热卖"
            }, 
            {
                "key": 2, 
                "value": "正常"
            }
        ]
    }, 
    "hrefs": {
        "thead_ths": [
            {
                "title": "标题", 
                "width_bz": 1, 
                "type": "text", 
                "default_v": "去联想"
            }, 
            {
                "title": "是否新窗口打开", 
                "width_bz": 1, 
                "type": "selection", 
                "options": "[{key:1,value:'是'},{key:2,value:'否'}]", 
                "default_v": 1
            }, 
            {
                "title": "链接", 
                "width_bz": 1, 
                "type": "text", 
                "default_v": "http://www.lenovo.com.cn"
            }, 
            {
                "title": "顺序", 
                "width_bz": 1, 
                "type": "text", 
                "order_col": true, 
                "default_v": 1
            }, 
            {
                "title": "内部HTML", 
                "width_bz": 1, 
                "type": "text", 
                "default_v": "<i class='icon'></i><span>##val##</span>"
            }
        ], 
        "values": [
            [
                {
                    "value": "去联想", 
                    "title": "标题"
                }, 
                {
                    "value": 1, 
                    "title": "是否新窗口打开"
                }, 
                {
                    "value": "http://www.lenovo.com.cn", 
                    "title": "链接"
                }, 
                {
                    "value": 3, 
                    "title": "顺序"
                }, 
                {
                    "value": "<i class='icon'></i><span>##val##</span>", 
                    "title": "内部HTML"
                }
            ], 
            [
                {
                    "value": "去联想1", 
                    "title": "标题"
                }, 
                {
                    "value": 2, 
                    "title": "是否新窗口打开"
                }, 
                {
                    "value": "http://www.lenovo.com.cn", 
                    "title": "链接"
                }, 
                {
                    "value": 4, 
                    "title": "顺序"
                }, 
                {
                    "value": "<i class='icon'></i><span>##val##</span>", 
                    "title": "内部HTML"
                }
            ]
        ], 
        "type": "list", 
        "title": "xxx"
    }, 
    "imgurl": {
        "type": "img",
        "title": "图片链接",
        "height":100,
        "width":200,
        "size":30,
        "input_id":"aaa",
        "value": "http://pic.shop.lenovo.com.cn/g1/M00/00/7F/CmBZEFZdY9iALGjfAABvbEHIe5s561.jpg"
    },
    "zone_item_list": [
        {
            "zone_id": 1, 
            "href": {
                "value": "http://www.lenovo.com.cn/product/50828.html", 
                "type": "text", 
                "title": "链接1"
            }, 
            "imgurl": {
                "value": "http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg", 
                "type": "text", 
                "title": "图片链接"
            }, 
            "price": {
                "value": 4981, 
                "type": "text", 
                "title": "价格", 
                "edit_can_not_see": true
            }, 
            "ishot": {
                "value": "1", 
                "type": "selection", 
                "title": "是否热卖", 
                "options": [
                    {
                        "key": 1, 
                        "value": "热卖"
                    }, 
                    {
                        "key": 2, 
                        "value": "正常"
                    }
                ]
            }
        }, 
        {
            "zone_id": 2, 
            "href": {
                "value": "http://www.lenovo.com.cn/product/50828.html", 
                "type": "text", 
                "title": "链接1", 
                "edit_can_not_see": true
            }, 
            "imgurl": {
                "value": "http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg", 
                "type": "text", 
                "title": "图片链接"
            }, 
            "price": {
                "value": 4981, 
                "type": "text", 
                "title": "价格"
            }
        }
    ],
    "test":{
        "type":"tree",
        "tree_id":"testid",
        "add_node_default_info":{
            "id":1,
            "pId":0,
            "name":"父节点1",
            "a_title":{
                    "value":"1f axcf",
                    "type":"text",
                    "title":"标题"
                },
            "new_open": {
                "value": "1", 
                "type": "selection", 
                "title": "是否新窗口打开", 
                "options": [
                    {
                    "key": 1, 
                    "value": "是"
                    }, {
                    "key": 2, 
                    "value": "否"
                    }
                ]
                }
        },
        "zNodes":[
            {
                "id":1,
                "pId":0,
                "name":"父节点1",
                "open":true,
                "a_title":{
                        "value":"1f axcf",
                        "type":"text",
                        "title":"标题"
                    },
                "new_open": {
                    "value": "1", 
                    "type": "selection", 
                    "title": "是否新窗口打开", 
                    "options": [
                        {
                        "key": 1, 
                        "value": "是"
                        }, {
                        "key": 2, 
                        "value": "否"
                        }
                    ]
                    }
            },
            {"id":2,"pId":0,"name":"父节点2","open":true,
                "bg_imgurl": {
                    "value": "http://pic.shop.lenovo.com.cn/164/g1/M00/03/9D/CmBZEFY4fFOAGMOiAACVIl7z1UQ956.jpg",
                    "type": "img",
                    "title": "背景图片",
                    "height":100,
                    "width":200,
                    "size":30,
                    "input_id":"bg_img"
                 }
            },
            {"id":11,"pId":1,"name":"叶子节点11","open":false}
        ]
    }
}
	




<div>
    {@each test.zNodes as node}
        {@if node.pId==0}
            <span>一级菜单${node.name}</span>
            {@each test.zNodes as node2}
                {@if node2.pId==node.id}
                    <span>二级菜单${node2.name}</span>
                {@/if}
            {@/each}
        {@/if}
        
    {@/each}
</div>


优点：
1.样式不会冲突
2.生成的页面体积小
3.移动动画效果
4.布局定制
5.左右边距上下边距及宽度微调
6.楼层可单独定义能加载的模板类型，终端类型，模板高度
7.模板维护数据高度自定制，可满足绝大部分日常需求
8.创建楼层，选择模板等提示信息
9.页面更美观
10.页面交互都优先交互，成功后才进行页面dom操作，更稳健


流程：
1.选择布局（如果没有则创建布局）
2.微调布局（主要是宽度，有时候可能需要调外边距）
3.创建楼层（创建n个楼层，并设置每层模板筛选条件，有默认值）
4.创建模板（如果有现成模板可以直接拿来用，即选择模板，如轮播图模板）
5.维护数据（如果有编辑按钮）
6.生成页面
其中创建模板时提供了text,selection,img,list,tree,ajax_win六种类型供选择，也有这些数据如何展示的模板实例供参考



权限JSON
{
    base : {
        edit_layout_btn : true, //编辑布局按钮
        create_floor_btn : true,//增加楼层按钮
        prev_view_btn : true,//预览按钮
        make_html_btn : true,//生成静态页面按钮
        blockGroups_move_btn : true,//块组之间上下移动按钮
        blockGroup_move_btn : true,//块组内部左右移动按钮
        floor_move_btn : true,//块内楼层上下移动按钮
        edit_model_btn : true//编辑模板按钮
    },
    models : {
        "delete_floor_btn" : true,
        "c_edit_btn":true,
        items : {
            "d7798623-debf-11e5-8716-68f728f3bf19":{ //mid
                "delete_floor_btn" : false,
                "chose_model_btn" : true,
                "c_edit_btn":false
            }
        }
    }
    
}