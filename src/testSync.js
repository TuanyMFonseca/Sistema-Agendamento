const sequelize = require('./config/database');
const Paciente = require('./models/Paciente');
const Consulta = require('./models/Consulta');


async function sync() {
  try {
    await sequelize.sync({ force: true }); // força recriar a tabela
    console.log('✨ Tabela Paciente criada com sucesso!');
    process.exit();
  } catch (error) {
    console.error('🧨 Erro ao criar a tabela:', error);
  }
}

async function sync() {
  try {
    await sequelize.sync({ force: true }); // recria todas as tabelas
    console.log('✨ Tabelas Paciente e Consulta criadas com sucesso!');
    process.exit();
  } catch (error) {
    console.error('🧨 Erro ao criar as tabelas:', error);
  }
}

sync();
