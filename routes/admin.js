const Sequelize = require("sequelize");

var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get(['/', '/admin'], async function (req, res, next) {

  let rooms = await db.Room.findAll();
  let clients = await db.Client.findAll();
  let bookings = await db.Booking.findAll();

  res.render('admin', {title: 'Администрирование', rooms: rooms, clients: clients, bookings: bookings});
});

router.post('/addRoom', async function (req, res, next) {
  db.Booking.create({
    name: req.body.name,
    description: req.body.description,
    aPlaces: req.body.aPlaces,
    cPlaces: req.body.cPlaces,
    countRooms: req.body.count,
    cost: req.body.cost,
    img: req.body.s_img
  });

  res.redirect('admin');
});

module.exports = router;
