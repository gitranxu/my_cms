var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var router = express.Router();

//生成临时html文件
router.post('/creat_tmp', function(req, res, next) {
	console.log('-----------123-');
	var head = req.body.head;
	var body = req.body.body;
	var html = "<!DOCTYPE html><html><head></head><body></body></html>";
	var $ = cheerio.load(html);
	$('head').append(head);
	$('body').append(body);
	$('.need_remove').remove();
	$('#config').remove();//能写到#config里面的，尽量写到这个里面
	$('.block_mask,.blocks_mask').remove();

	var prev_view_page_url = $('#back').attr('prev_view_page_url');
	if(!prev_view_page_url){
		console.log('请检查#back元素是否设置了【prev_view_page_url】属性');
		res.json({msg:'请检查#back元素是否设置了【prev_view_page_url】属性'});
	}
	var filename_with_houzhui = prev_view_page_url.substring(prev_view_page_url.lastIndexOf('/')+1);
	var tmp = prev_view_page_url.substring(prev_view_page_url.indexOf('//')+2);
	var path = tmp.substring(tmp.indexOf('/'),tmp.lastIndexOf('/')+1); //path两边都有/,例如：/projects/tmp/
	fs.writeFile('public'+path+filename_with_houzhui,$.html(),function(err){
		if(err) throw err;
		res.json({msg:'saved!',prev_view_page_url:prev_view_page_url});
		//console.log('saved!');
	})

  /*res.render('index2', {abc:'test',list:[{name:'rx',show:true},{name:'cl',show:true},{name:'xx',show:false}],blah:[{num:1},{num:2},{num:3,inner:[{time:'15:00'},{time:'16:00'},{time:'17:00'},{time:'18:00'}]},{num:4}] });*/
});

module.exports = router;
