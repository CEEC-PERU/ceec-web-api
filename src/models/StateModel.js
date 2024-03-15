const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const StateModel = sequelize.define('StateModel', {
  id_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
  name: {
        type: DataTypes.STRING(100),
        collate: 'pg_catalog."default"',
  },
  
}, {
  tableName: 'states',
  timestamps: false,
});

/*
const data = [
  { id_state: 1, name: 'Habilitado' },
  { id_state: 2, name: 'En progreso' },
  { id_state: 3, name: 'Finalizado' }
];

const insertData = async () => {
  try {
    await StateModel.bulkCreate(data);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error(`Error while inserting data: ${error}`);
  }
};

insertData();*/

module.exports = StateModel;