const Sequelize = require("sequelize");

let express = require('express');
let router = express.Router();
let db = require('../db');
const Op = Sequelize.Op;

/* GET booking page. */
var DateIn = new Date();
var DateOut = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
var aPlaces = "1";
var cPlaces = "0";

router.get(['/', '/booking'], async function (req, res, next) {

    let rooms = await db.Room.findAll({
        attributes: ['id', 'countRooms', 'name', 'description', 'cost', 'img'],
        where: {
            [Op.and]: [
                {
                    aPlaces:
                        {[Op.gte]: aPlaces}
                },
                {
                    cPlaces:
                        {[Op.gte]: cPlaces}
                }
            ]
        }
    });

    var j = 0;
    var masRooms = [];
    var countRooms;
    for (i = 0; i < rooms.length; i++) {
        countRooms = await db.Booking.findAndCountAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                {
                                    [Op.and]: [
                                        {
                                            dateIn:
                                                {[Op.lte]: DateIn}
                                        },
                                        {
                                            dateOut:
                                                {[Op.gte]: DateIn}
                                        }]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            dateIn:
                                                {[Op.lte]: DateOut}
                                        },
                                        {
                                            dateOut:
                                                {[Op.gte]: DateOut}
                                        }]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            dateIn:
                                                {[Op.gte]: DateIn}
                                        },
                                        {
                                            dateOut:
                                                {[Op.lte]: DateOut}
                                        }]
                                }
                            ]
                        },
                        {
                            id:
                                {[Op.eq]: rooms[i].id}
                        }]
                }
            }
        );
        if (countRooms.count < rooms[i].countRooms) {
            //console.log(countRooms);
            masRooms[j] = rooms[i];
            j++;
        }
    }

    res.render('booking', {title: 'Бронирование номера', rooms: masRooms,})
});

router.post('/findRooms', async function (req, res, next) {

    DateIn = req.body.DateIn;
    DateOut = req.body.DateOut;
    aPlaces = req.body.aPlaces;
    cPlaces = req.body.cPlaces;

    res.redirect('booking');
    }
);

router.post('/bookingRoom', async function (req, res, next) {
    var client = null;
    client = await db.Client.findOne({
        where: {
                phone:
                    {[Op.eq]: req.body.phone}
        },
        raw: true,
    });

     if (client == null) {
        await db.Client.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.mail
        });

         client = await db.Client.findOne({
            where: {
                phone:
                    {[Op.eq]: req.body.phone}
            },
             raw: true,
        });
    }

    db.Booking.create({
        dateIn: DateIn,
        dateOut: DateOut,
        roomFK: req.body.roomID,
        clientFK: client.id
    });

    res.redirect("booking")
    }
);

module.exports = router;