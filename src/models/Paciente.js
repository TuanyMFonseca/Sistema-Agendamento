const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  historico: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'pacientes',
  timestamps: true,
});

module.exports = Paciente;