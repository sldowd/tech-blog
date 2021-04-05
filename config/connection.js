const Sequelize = require('sequelize');

require('dotenv').config();

//create the connection to our database
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    dialectOptions: {
      decimalNumbers: true,
    },
  });
}


module.exports = sequelize;
