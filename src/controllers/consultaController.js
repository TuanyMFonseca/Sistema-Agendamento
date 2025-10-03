const Consulta = require('../models/Consulta');
const Paciente = require('../models/Paciente');
const { enviarEmailConfirmacao } = require('../services/emailService');
const { notificarAgendamento } = require('../services/notificationService'); 


// =======================================================
// ROTA PÚBLICA (POST /consultas/publico)
// Paciente agenda consulta sem autenticação
// =======================================================
exports.agendarConsultaPublica = async (req, res) => {
    const { nomePaciente, email, telefone, data, observacoes } = req.body;

    // Simples validação de campos
    if (!nomePaciente || !email || !data) {
        return res.status(400).json({ error: 'Nome, e-mail e data são obrigatórios.' });
    }

    try {
        // 1. Criar ou encontrar o paciente (se já agendou antes)
        const [paciente, created] = await Paciente.findOrCreate({
            where: { email },
            defaults: { nome: nomePaciente, telefone }
        });

        // 2. Criar a consulta
        const novaConsulta = await Consulta.create({
            pacienteId: paciente.id,
            data,
            observacoes,
            status: 'Agendada'
        });
        
        // 3. Registrar a notificação (opcional, se notificationService for além do email)
        await notificarAgendamento(paciente, novaConsulta); 
            return res.status(201).json({ 
            message: 'Consulta agendada com sucesso. Verifique seu e-mail para a confirmação.', 
            consulta: novaConsulta 
        });

    } catch (error) {
        console.error('Erro ao agendar consulta pública:', error);
        return res.status(500).json({ error: 'Erro interno ao processar agendamento.' });
    }
};

// =======================================================
// ROTA PROTEGIDA (GET /consultas)
// Secretária lista todas as consultas
// =======================================================
exports.listarConsultas = async (req, res) => {
    try {
        // Busca todas as consultas e inclui os dados do Paciente
        const consultas = await Consulta.findAll({
            include: [{ model: Paciente, attributes: ['nome', 'email', 'telefone'] }],
            order: [['data', 'ASC']]
        });
        
        return res.status(200).json(consultas);
    } catch (error) {
        console.error('Erro ao listar consultas:', error);
        return res.status(500).json({ error: 'Erro interno ao listar consultas.' });
    }
};

// =======================================================
// ROTA PROTEGIDA (POST /consultas)
// Secretária agenda consulta internamente
// Agora usa o email do paciente para encontrá-lo (ou o ID, se preferir)
// =======================================================
exports.agendarConsultaInterna = async (req, res) => {
    // ⚠️ Recebemos o email do paciente em vez do pacienteId
    const { emailPaciente, data, observacoes, status = 'Agendada' } = req.body; 

    if (!emailPaciente || !data) {
        return res.status(400).json({ error: 'E-mail do Paciente e data são obrigatórios.' });
    }

    try {
        // 1. Buscar o paciente pelo e-mail
        const paciente = await Paciente.findOne({ where: { email: emailPaciente } });

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado com o e-mail fornecido.' });
        }
        
        const pacienteId = paciente.id; // Encontramos o ID

        // 2. Criar a nova consulta
        const novaConsulta = await Consulta.create({
            pacienteId, // Usamos o ID encontrado
            data,
            observacoes,
            status 
        });

        // Opcional: Notificar o paciente sobre o agendamento interno
        await notificarAgendamento(paciente, novaConsulta);

        return res.status(201).json({ 
            message: `Consulta agendada internamente para ${paciente.nome}.`, 
            consulta: novaConsulta 
        });
    } catch (error) {
        console.error('Erro ao agendar consulta internamente:', error);
        return res.status(500).json({ error: 'Erro interno ao processar agendamento interno.' });
    }
};