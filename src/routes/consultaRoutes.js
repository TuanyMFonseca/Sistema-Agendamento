const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');



// Rota pública para agendamento de consultas (para pacientes sem login)
router.post('/publico', consultaController.agendarConsultaPublica);

// Rotas protegidas (apenas para usuários com a role 'secretaria')
router.use(authMiddleware); 
router.use(roleMiddleware('secretaria')); 

// Rota para a secretária listar todas as consultas
router.get('/', consultaController.listarConsultas);

// Rota para a secretária agendar uma consulta internamente
router.post('/', consultaController.agendarConsultaInterna);

module.exports = router;