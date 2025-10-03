const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function enviarEmailConfirmacao(to, nomePaciente, dataConsulta) {
  const text = `Olá ${nomePaciente}, sua consulta foi agendada para ${dataConsulta}.`;
  const html = `<p>Olá <strong>${nomePaciente}</strong>,</p><p>Sua consulta foi agendada para <strong>${dataConsulta}</strong>.</p>`;
  await transporter.sendMail({
    from: `"Clínica" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Confirmação de Agendamento',
    text,
    html
  });
  console.log(`✅ E-mail de confirmação enviado para ${to}`);
}

// Função para enviar o lembrete de e-mail
async function enviarEmailLembrete(to, nomePaciente, dataConsulta) {
  const text = `Olá ${nomePaciente}, lembrando que sua consulta está agendada para ${dataConsulta}.`;
  const html = `<p>Olá <strong>${nomePaciente}</strong>,</p><p>Lembrete: sua consulta está agendada para <strong>${dataConsulta}</strong>. Esperamos você!</p>`;
  await transporter.sendMail({
    from: `"Clínica" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Lembrete de Consulta',
    text,
    html
  });
  console.log(`✅ E-mail de lembrete enviado para ${to}`);
}

// Exporte as duas funções
module.exports = { 
  enviarEmailConfirmacao,
  enviarEmailLembrete 
};