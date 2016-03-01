$().ready(function(){

	var oBODY = document.getElementsByTagName('BODY').item(0);

	var obj_unique_jsurl = get_obj_unique_jsurl();

	for(var i in obj_unique_jsurl){

		load_js_by_src(obj_unique_jsurl[i]['url'],obj_unique_jsurl[i]['delay_time']);
	}
	
	

	function load_js_by_src(jsurl,delay_time){

		if(!delay_time){   //如果没定义的话，统一延迟3秒钟后加载

			delay_time = 3000;

		}

		setTimeout(function(){

			var oScript= document.createElement("script"); 

		    oScript.type = "text/javascript"; 

		    oScript.src = jsurl; 

		    oScript.className = "need_remove";

		    oBODY.appendChild( oScript);

		},delay_time);

	}

	//去重
	function get_obj_unique_jsurl(){

		var result = {};
		
		$('.jsurl').each(function(){

			var jsurl = $(this).text();

			var delay_time = $(this).attr('delay_time');

			result[jsurl] = {};

			if(delay_time){

				result[jsurl]['delay_time'] = delay_time;

			}

			result[jsurl]['url'] = jsurl;

		});

		try{
			if(lenovoplugin_need){

				for(var i in lenovoplugin_need){

					result[i] = {};

					result[i]['url'] = lenovoplugin_need[i];

					result[i]['delay_time'] = 10;

				}

			}
		}catch(e){
			
		}
			
		
		return result;
	}

});