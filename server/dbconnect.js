const { Sequelize } = require('sequelize');
 

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('TimKiemPhongTroTrucTuyen', 'root', '123456', {
  host: 'localhost',
  dialect:  'mysql',
  logging: false
});

const testConnection = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection()