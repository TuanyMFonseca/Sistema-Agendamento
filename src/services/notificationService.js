const { enviarEmailConfirmacao, enviarEmailLembrete } = require('../services/emailService');

// Notifica sobre o agendamento de uma consulta (confirmação)
async function notificarAgendamento(paciente, consulta) {
  if (!paciente) {
    console.log('NotificationService: paciente inexistente, nada a enviar.');
    return;
  }

  const dataFormatada = new Date(consulta.data).toLocaleString('pt-BR');

  if (paciente.email) {
    try {
      await enviarEmailConfirmacao(paciente.email, paciente.nome, dataFormatada);
      console.log(`NotificationService: e-mail de confirmação enviado para ${paciente.email}`);
    } catch (err) {
      console.error('NotificationService: erro ao enviar e-mail:', err);
      throw err;
    }
  } else {
    console.log(`NotificationService: paciente ${paciente.nome} não possui e-mail cadastrado.`);
  }
}

// Notifica com lembrete (24h antes).
async function notificarLembrete(paciente, consulta) {
  if (!paciente) return;
  const dataFormatada = new Date(consulta.data).toLocaleString('pt-BR');

  if (paciente.email) {
    try {
      await enviarEmailLembrete(paciente.email, paciente.nome, dataFormatada);
      console.log(`Paciente ${paciente.nome}: lembrete enviado.`);
    } catch (err) {
      console.error('NotificationService: erro ao enviar lembrete:', err);
      // Você pode optar por não "throw" o erro aqui para não travar o processo de lembrete
      // caso um único e-mail falhe.
    }
  } else {
    console.log(`Paciente ${paciente.nome} sem email cadastrado (lembrete não enviado).`);
  }
}

module.exports = { notificarAgendamento, notificarLembrete };
    