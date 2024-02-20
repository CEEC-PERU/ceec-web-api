const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DocumentType = sequelize.define('DocumentType', {
    document_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'documenttypes', 
  timestamps: false,
});


module.exports = DocumentType;
