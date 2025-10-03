const cron = require('node-cron');
const { Op } = require('sequelize');
const Consulta = require('../models/Consulta');
const Paciente = require('../models/Paciente');
const { notificarLembrete } = require('./notificationService');

/**
 * Procura consultas entre agora e +24h e envia lembretes para as que ainda não receberam.
 */
async function enviarLembretes() {
  try {
    const agora = new Date();
    const daqui24h = new Date(agora.getTime() + 24 * 60 * 60 * 1000);

    const consultas = await Consulta.findAll({
      where: {
        data: { [Op.between]: [agora, daqui24h] },
        status: { [Op.in]: ['agendada', 'confirmada'] },
        lembreteEnviado: false
      },
      include: [{ model: Paciente }]
    });

    if (!consultas.length) {
      console.log('ReminderService: não há consultas para lembrar agora.');
      return;
    }

    console.log(`ReminderService: encontradas ${consultas.length} consultas para lembrete.`);

    for (const consulta of consultas) {
      const paciente = consulta.Paciente || await Paciente.findByPk(consulta.pacienteId);
      if (!paciente) {
        console.log(`ReminderService: paciente não encontrado para consulta ${consulta.id}`);
        continue;
      }

      try {
        await notificarLembrete(paciente, consulta);
        // marcar como enviado
        consulta.lembreteEnviado = true;
        await consulta.save();
        console.log(`ReminderService: lembrete enviado e marcado para consulta ${consulta.id}`);
      } catch (err) {
        console.error(`ReminderService: erro ao enviar lembrete para consulta ${consulta.id}:`, err);
        // aqui pode implementar retry ou salvar um log para reprocessamento
      }
    }
  } catch (err) {
    console.error('ReminderService: erro ao processar lembretes:', err);
  }
}

function startReminderScheduler({ schedule = '*/30 * * * *' } = {}) {
  // Executa imediatamente ao iniciar (opcional)
  enviarLembretes().catch(err => console.error('Erro no envio inicial de lembretes:', err));

  // Agenda recorrente
  cron.schedule(schedule, async () => {
    console.log(`ReminderService: cron acionado (${new Date().toLocaleString()})`);
    await enviarLembretes();
  }, {
    timezone: 'America/Sao_Paulo' // ajuste de timezone (opcional)
  });

  console.log(`ReminderService: scheduler iniciado com expressão '${schedule}'`);
}

module.exports = { startReminderScheduler, enviarLembretes };
