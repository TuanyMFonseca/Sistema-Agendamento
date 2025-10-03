const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require('./Paciente');

const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('agendada', 'confirmada', 'cancelada', 'realizada'),
    defaultValue: 'agendada'
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lembreteEnviado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  tableName: 'consultas',
  timestamps: true
});

// Relação 1:N: Um paciente pode ter várias consultas
Paciente.hasMany(Consulta, { foreignKey: 'pacienteId' });
Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId' });

module.exports = Consulta;
