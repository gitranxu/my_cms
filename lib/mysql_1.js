var mysql = require("mysql");
var database_name = 'cms';
var pool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '',
	database : database_name
});

var query = function(sql,callback){
	pool.getConnection(function(err,conn){
		if(err) callback(err,null,null);
		conn.query(sql,function(qerr,rows,fields){
			conn.release();
			callback(qerr,rows,fields);
		});
	});
}

module.exports = query;