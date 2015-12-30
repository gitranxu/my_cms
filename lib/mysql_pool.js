var mysql = require("mysql");
var mysqlConfig = require("../config/mysql");

exports.createMysqlPool = module.exports.createMysqlPool = function(){
	return mysql.createPool({
		host : mysqlConfig.host,
		user : mysqlConfig.user,
		password : mysqlConfig.password,
		database : mysqlConfig.database
	});
}