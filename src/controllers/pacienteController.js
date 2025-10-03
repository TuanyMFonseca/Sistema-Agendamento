const Paciente = require('../models/Paciente');

module.exports = {
  // Cadastrar paciente
  async criarPaciente(req, res) {
    try {
      const { nome, telefone, email, historico } = req.body;
      const paciente = await Paciente.create({ nome, telefone, email, historico });
      return res.status(201).json(paciente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar paciente' });
    }
  },

  // Listar todos os pacientes
  async listarPacientes(req, res) {
    try {
      const pacientes = await Paciente.findAll();
      return res.status(200).json(pacientes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
  }
};
