const Sequelize = require("sequelize");

var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/admin', async function (req, res, next) {

    let rooms = await db.Room.findAll();
    let clients = await db.Client.findAll();
    let bookings = await db.Booking.findAll();

    res.render('admin', {title: 'Администрирование', rooms: rooms, clients: clients, bookings: bookings});
});

router.post('/addRoom', async function (req, res, next) {
    db.Room.create({
        name: req.body.name,
        description: req.body.description,
        aPlaces: req.body.aPlaces,
        cPlaces: req.body.cPlaces,
        countRooms: req.body.count,
        cost: req.body.cost,
        img: req.body.s_img
    }).then(res.redirect('admin'));
});

router.post('/editRoom', async function (req, res, next) {
    db.Room.update({
            name: req.body.name,
            description: req.body.description,
            aPlaces: req.body.aPlaces,
            cPlaces: req.body.cPlaces,
            countRooms: req.body.count,
            cost: req.body.cost,
            img: req.body.s_img
        },
        {where: {id: req.body.id}}).then(res.redirect('admin'));
});

router.get('/deleteRoom/:id', async function (req, res, next) {
    db.Room.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/admin'));
});

router.post('/editClient', async function (req, res, next) {
    db.Client.update({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.mail
        },
        {where: {id: req.body.id}}).then(res.redirect('admin'));
});

router.get('/deleteClient/:id', async function (req, res, next) {
    db.Client.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/admin'));
});

router.post('/editBooking', async function (req, res, next) {
    db.Booking.update({
            dateIn: req.body.DateIn,
            dateOut: req.body.DateOut,
            roomFK: req.body.room,
            clientFK: req.body.client
        },
        {where: {id: req.body.id}}).then(res.redirect('admin'));
});

router.get('/deleteBooking/:id', async function (req, res, next) {
    db.Booking.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/admin'));
});
module.exports = router;
