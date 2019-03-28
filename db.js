const Sequelize = require("sequelize");
const sequelize = new Sequelize('hotel_db', 'artem_andriukov', 'KSTrcEiyCSLJ5Ta', {
    host: 'db4free.net',
    port: '3306',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

var Rooms = sequelize.define('rooms', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    aPlaces: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

var Client = sequelize.define('client', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

var Booking = sequelize.define('booking', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    dateIn: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dateOut: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

Rooms.belongsToMany(Client, { through: Booking });
Client.belongsToMany(Rooms, { through: Booking });

sequelize.sync();

module.exports.Rooms = Rooms;
module.exports.Client = Client;
module.exports.Booking = Booking;

module.exports.sequelize = sequelize;