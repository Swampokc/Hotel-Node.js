var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get(['/', '/admin'], function(req, res, next) {
  res.render('admin', { title: 'Express', date: 'кек' });
});

module.exports = router;
