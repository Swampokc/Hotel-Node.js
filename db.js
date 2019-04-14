const Sequelize = require("sequelize");
const sequelize = new Sequelize('hotel_node', 'root', '', {
    host: 'localhost',
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

var Room = sequelize.define('room', {
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
    cPlaces: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    countRooms: {
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
    },

    roomFK:{
        type: Sequelize.INTEGER
    },

    clientFK:{
        type: Sequelize.INTEGER
    }
});

Room.hasMany(Booking,{foreignKey:'roomFK', sourceKey:'id'})
Booking.belongsTo(Room,{foreignKey:'roomFK', targetKey:'id'})

Client.hasMany(Booking,{foreignKey:'clientFK', sourceKey:'id'})
Booking.belongsTo(Client,{foreignKey:'clientFK', targetKey:'id'})
// Room.belongsToMany(Booking)
// Room.belongsToMany(Client, { through: Booking });
// Client.belongsToMany(Room, { through: Booking });

sequelize.sync();

module.exports.Room = Room;
module.exports.Client = Client;
module.exports.Booking = Booking;

module.exports.sequelize = sequelize;