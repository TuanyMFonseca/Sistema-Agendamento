const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();
const { startReminderScheduler } = require('./services/reminderService');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    // sincroniza modelos (em dev, alter: true atualiza o schema)
    await sequelize.sync({ alter: false });
    console.log('✅ Conectado ao MySQL e modelos sincronizados!');
    const server = app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

    // iniciar scheduler de lembretes (padrão: a cada 30 minutos)
    startReminderScheduler({ schedule: process.env.REMINDER_CRON || '*/30 * * * *' });

    return server;
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
    process.exit(1);
  }
}

startServer();


