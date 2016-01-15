function drag(obj) {
		
	obj.onmousedown = function(ev) {
		var ev = ev || event;
		
		var disX = ev.clientX - $(obj).offset().left;
		var disY = ev.clientY - $(obj).offset().top;
		var oldZindex = $(obj).css('zIndex');
		$(obj).css('zIndex',300);//提升层级
		if ( obj.setCapture ) {
			obj.setCapture();
		}

		//console.log($(obj).attr('class'));
		var top = $(obj).offset().top;
		var left = $(obj).offset().left;
		
		//console.log(ev.clientX+'---'+ev.clientY+'--------------'+top+'---'+left);
		var newProduct = $('<div class="'+$(obj).attr('class')+'"></div>').css({top:top,left:left});
		$(document.body).append(newProduct);
		
		var theNearest = null;//碰撞的离的最近的块
		document.onmousemove = function(ev) {
			var ev = ev || event;
			
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			theNearest = pzjc(newProduct,$(obj).parent().find('.stone'));//碰撞检测,返回离的最近的块
			
			//console.log(newProduct.get(0).style);
			newProduct.get(0).style.left = L + 'px';
			newProduct.get(0).style.top = T + 'px';
			
		}
		
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			if ( obj.releaseCapture ) {
				obj.releaseCapture();
			}
			$(obj).css('zIndex',oldZindex);//还原层级

			if(theNearest){//如果得到了最近的块，则将之前碰撞到的所有的块的高亮去掉，然后只给这一块加上高亮
				//newProduct.parent().find('.stonePz').removeClass('stonePz');
				$(theNearest.block).removeClass('stonePz');
				newProduct.remove();//放开按钮后将新创建的元素删掉
				var id = $(theNearest.block).attr('id');
				var className = $(obj).attr('class');
				createPlant(id,className);//根据不同的类名，创建不同的植物类型(该方法在zwdzjs.js中定义)
				
			}
		}
		
		return false;
		
	}
	
}

/*
	碰撞检测
	$objA:当前移动的节点
	$objB:战场中所有的块
*/
function pzjc($objA,$objB){//是否碰撞上
	var leftA = $objA.offset().left;
	var rightA = $objA.offset().left + $objA.width();
	var topA = $objA.offset().top;
	var bottomA = $objA.offset().top + $objA.height();
	$objB.each(function(){
		var leftB = $(this).offset().left;
		var rightB = $(this).offset().left + $(this).width();
		var topB = $(this).offset().top;
		var bottomB = $(this).offset().top + $(this).height();
		
		if(rightA < leftB || leftA > rightB || bottomA < topB || topA > bottomB){
			$(this).removeClass('stonePz');
		}else{
			$(this).addClass('stonePz');
		}
	});
	//通过上面的计算后，可以得到当前一共撞上的块数:$objA.parent().find('.stonePz');
	
	var theNearest = getNearest($objA,$objA.parent().find('.stonePz'));//得到距离最近的块
	if(theNearest){
		$(theNearest.block).parent().find('.stonePz').removeClass('stonePz');
		$(theNearest.block).addClass('stonePz');
	}
	return theNearest;
}

/*
	得到距离最近的块
	$objA:当前移动的节点
	$objB:碰上的所有的块
*/
function getNearest($objA,$objB){
	var result = [];
	$objB.each(function(){
		var distance = getDistance($objA,$(this));
		result.push({block:this,distance:distance});
	});

	//var theMin = getMinFromArray([{a:1,distance:23},{a:1,distance:3},{a:1,distance:43}]);
	var theMin = getMinFromArray(result);
	return theMin;
}

/*得到两个元素之间的距离*/
function getDistance($objA,$objB){
	var topA = $objA.offset().top;
	var leftA = $objA.offset().left;
	var topB = $objB.offset().top;
	var leftB = $objB.offset().left;
	//console.log(topA+'---'+topB+'---'+Math.abs(topB-topA));
	var s = Math.abs(topA-topB)*Math.abs(topA-topB)+Math.abs(leftA-leftB)*Math.abs(leftA-leftB);//平方和
	return Math.sqrt(s);
}

/*
	返回一个数组里的最小值所在的对象
	[{block:this,distance:23},{block:this,distance:11},{block:this,distance:44}]
*/
function getMinFromArray(arr){
	var theMin = arr[0];
	for(var i = 0;i<arr.length;i++){
		if(arr[i].distance < theMin.distance){
			theMin = arr[i];
		}
	}
	return theMin;
}