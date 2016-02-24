setInterval(function(){
	var time = new Date();
	$('.cntr .time').text(time.getFullYear()+'-'+(time.getMonth()-0+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds());
},1000);