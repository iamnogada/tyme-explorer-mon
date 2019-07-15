var express = require('express');
var router = express.Router();
var ServiceStatus = require('../service/Health')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
*
*/
router.get('/health', function(req, res, next) {
  let code = ServiceStatus.Monitor&&
  ServiceStatus.Blockinfo&&ServiceStatus.Database ? 200:500
  res.status(code).json(ServiceStatus)
});

module.exports = router;
