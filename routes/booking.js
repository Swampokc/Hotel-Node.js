let express = require('express');
let router = express.Router();
let db = require('../db');

/* GET booking page. */
router.get(['/', '/booking'], function(req, res, next) {
  res.render('booking', { title: 'Express', date: 'kkeeekk'});
});

module.exports = router;
