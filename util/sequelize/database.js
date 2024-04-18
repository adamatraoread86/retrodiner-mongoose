const Sequelize = require('sequelize');

// Create sequelize instance
const sequelize = new Sequelize('5750kellyfadelsp24_retrodinersequelize', '5750kellyfadelsp24', 'A00547972', {
    dialect: 'mysql',
    host: 'fadel-5750-sp23.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com'
});

module.exports = sequelize;


