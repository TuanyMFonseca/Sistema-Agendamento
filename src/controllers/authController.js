const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!email || !senha || !nome) return res.status(400).json({ error: 'Dados incompletos' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Usuário já existe' });

    const hash = await bcrypt.hash(senha, SALT_ROUNDS);
    const user = await User.create({ nome, email, senha: hash });

    res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });

    const payload = { id: user.id, email: user.email, nome: user.nome };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
