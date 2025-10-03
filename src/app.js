const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/pacientes', pacienteRoutes);
app.use('/consultas', consultaRoutes);
app.use('/auth', authRoutes);

module.exports = app;
