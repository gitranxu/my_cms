 // mysql CRUD
var sqlclient = module.exports;

var _pool = null;

var NND = {};

/*
 * Innit sql connection pool
 * [@param](/user/param) {Object} app The app for the server.
 */
NND.init = function(){
  if(!_pool){
    _pool = require('./mysql_pool').createMysqlPool();
  }
};

/**
 * Excute sql statement
 * [@param](/user/param) {String} sql Statement The sql need to excute.
 * [@param](/user/param) {Object} args The args for the sql.
 * [@param](/user/param) {fuction} callback Callback function.
 * 
 */
NND.query = function(sql,callback){
  
  _pool.getConnection(function(err, conn) {
    if (!!err) {
      console.error('[sqlqueryErr] '+err.stack);
      return;
    }
    conn.query(sql,function(qerr,rows,fields){
      conn.release();
      callback(qerr,rows,fields);
    });
  });
};

/**
 * Close connection pool.
 */
NND.shutdown = function(){
  _pool.end();
};

/**
 * init database
 */
sqlclient.init = function() {
  if (!!_pool){
    return sqlclient;
  } else {
    NND.init();
    sqlclient.insert = NND.query;
    sqlclient.update = NND.query;
    //sqlclient.delete = NND.query;
    sqlclient.query = NND.query;
    sqlclient._pool = _pool;
    return sqlclient;
  }
};

/**
 * shutdown database
 */
sqlclient.shutdown = function() {
  NND.shutdown();
};