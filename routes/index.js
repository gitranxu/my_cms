var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { is_back: true });
});

router.get('/test', function(req, res, next) {
  res.render('index2', {abc:'test',list:[{name:'rx',show:true},{name:'cl',show:true},{name:'xx',show:false}],blah:[{num:1},{num:2},{num:3,inner:[{time:'15:00'},{time:'16:00'},{time:'17:00'},{time:'18:00'}]},{num:4}] });
});

module.exports = router;
