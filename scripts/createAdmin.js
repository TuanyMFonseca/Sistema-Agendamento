const bcrypt = require('bcrypt');
const sequelize = require('../src/config/database');
const User = require('../src/models/User');
require('dotenv').config();


const SALT_ROUNDS = 10;

// Variáveis do usuário administrador (pegas do .env)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_ROLE = process.env.ADMIN_ROLE || 'secretaria';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Secretaria Master';

async function createAdminUser() {
    try {
        console.log('Iniciando script de criação de usuário admin...');
        
        // 1. Verificar se o usuário já existe
        const existingUser = await User.findOne({ where: { email: ADMIN_EMAIL } });

        if (existingUser) {
            console.warn(`\n[AVISO] Usuário com o e-mail ${ADMIN_EMAIL} já existe. Ignorando criação.`);
            return;
        }

        // 2. Criar o hash da senha
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

        // 3. Criar o usuário no banco de dados
        await User.create({
            nome: ADMIN_NAME,
            email: ADMIN_EMAIL,
            senha: hashedPassword, // Armazena a hash
            role: ADMIN_ROLE
        });

        console.log('\n================================================');
        console.log('[SUCESSO] Usuário administrador criado!');
        console.log(`E-mail: ${ADMIN_EMAIL}`);
        console.log(`Senha: ${ADMIN_PASSWORD}`);
        console.log('================================================');

    } catch (error) {
        console.error('\n[ERRO] Falha ao criar usuário admin. Verifique sua conexão DB:', error.message);
    } finally {
        process.exit(); 
    }
}


createAdminUser();
