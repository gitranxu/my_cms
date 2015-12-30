var express = require('express');
var router = express.Router();
var sqlclient = require('../lib/mysql_cli');
var juicer = require('juicer');

router.get('/',function(req, res, next){
	sqlclient.init();
	sqlclient.query('SELECT * FROM  model',function(err,rows,fields){
		if(err) throw err;
		console.log(rows[1].content);
		var html = juicer(rows[1].content,{ list: rows });
		res.render('findmodels', { list: rows });
	});
});

module.exports = router;