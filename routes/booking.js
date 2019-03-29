const Sequelize = require("sequelize")

let express = require('express');
let router = express.Router();
let db = require('../db');
const Op = Sequelize.Op;

/* GET booking page. */
router.get(['/', '/booking'], function (req, res, next) {
    res.render('booking', {title: 'Бронирование номера'});
});

router.post(['/', '/booking'], async function (req, res, next) {

    // поиск номеров, удовлетворяющих запросу по количеству проживающих взрослых и детей
    let rooms = await db.Room.findAll({
        attributes: ['id', 'countRooms'],
        where: {
            [Op.and]: [
                {
                    aPlaces:
                        {[Op.gte]: req.body.aPlaces}
                },
                {
                    cPlaces:
                        {[Op.gte]: req.body.cPlaces}
                }
            ]
        }
    });

    var masRooms = [];
    // поиск количества свободных номер на выбранные даты
    rooms.forEach(async function (room) {
        var countRooms = await db.Booking.findAndCountAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                {
                                    [Op.and]: [
                                        {
                                            dateIn:
                                                {[Op.lte]: req.body.DateIn}
                                        },
                                        {
                                            dateOut:
                                                {[Op.gte]: req.body.DateIn}
                                        }]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            dateIn:
                                                {[Op.lte]: req.body.DateOut}
                                        },
                                        {
                                            dateOut:
                                                {[Op.gte]: req.body.DateOut}
                                        }]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            dateIn:
                                                {[Op.gte]: req.body.DateIn}
                                        },
                                        {
                                            dateOut:
                                                {[Op.lte]: req.body.DateOut}
                                        }]
                                }
                            ]
                        },
                        {
                            id:
                                {[Op.eq]: room.id}
                        }]
                }
            });
        if (countRooms.count < room.countRooms) {
            masRooms.push(room);
        }
    });

    res.render('booking', {title: 'Бронирование номера', rooms: masRooms});
})
;

module.exports = router;