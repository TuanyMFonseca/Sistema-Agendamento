# 🩺 Sistema de Agendamento de Consultas Médicas (Full Stack)

🔗 **Repositório:** [GitHub - TuanyMFonseca/Sistema-Agendamento](https://github.com/TuanyMFonseca/Sistema-Agendamento)

Este projeto é um sistema completo de agendamento de consultas médicas, construído com arquitetura **Full Stack**.  
Ele utiliza uma **API REST robusta em Node.js** para a lógica de negócios e um **front-end moderno em React** para a interface do usuário.

---

## ⚠️ Status do Projeto
| Status       | Versão  | Licença |
|--------------|---------|---------|
| 🚧 Em Andamento | v1.0.0 | MIT     |

---

## 🚀 Tecnologias Utilizadas

Este projeto combina um servidor eficiente com uma interface de usuário rápida e responsiva.

### 🔹 Back-end (API REST)
| Categoria     | Tecnologia        | Descrição |
|---------------|------------------|-----------|
| Ambiente      | Node.js & Express | Ambiente de execução e framework minimalista para o servidor. |
| Banco de Dados| MySQL             | Banco de dados relacional para persistência de dados. |
| ORM           | Sequelize         | Mapeamento Objeto-Relacional para interagir com o MySQL. |
| Notificações  | Nodemailer        | Serviço para envio de e-mails (confirmação, lembretes). |
| Agendador     | node-cron         | Para agendamento de tarefas automáticas (ex: lembretes). |

### 🔹 Front-end (Interface Web)
| Categoria     | Tecnologia        | Descrição |
|---------------|------------------|-----------|
| Biblioteca    | React             | Biblioteca JavaScript para construção da interface dinâmica. |
| Estilização   | Tailwind CSS      | Framework CSS utilitário para design rápido e responsivo. |
| Estrutura     | SPA (Single Page Application) | Para uma experiência fluida. |

---

## 📌 Funcionalidades Principais
- **Cadastro de Pacientes**: Gerenciamento da base de usuários.  
- **Agendamento de Consultas**: Criação e listagem de consultas.  
- **Comunicação Automatizada**: Envio automático de e-mails após agendamento.  
- **Lembretes Programados**: Notificações automáticas com **Cron Jobs**.  
- **Endpoints RESTful**: API clara para integração com o Front-end.  

---

## 📂 Estrutura de Pastas (Back-end)
```
src/
 ├── config/
 │    └── database.js        # Conexão com o banco de dados
 ├── controllers/
 │    └── consultaController.js # Lógica de negócio da API
 ├── models/
 │    ├── Consulta.js
 │    └── Paciente.js        # Definição dos modelos Sequelize
 ├── services/
 │    ├── emailService.js    # Lógica de envio de e-mails
 │    └── notificationService.js # Serviço de notificação
 ├── routes/
 │    └── consultaRoutes.js  # Definição das rotas da API
 └── server.js               # Ponto de entrada da aplicação
```

---

## ⚙️ Como Configurar e Rodar

### 1️⃣ Pré-requisitos
Certifique-se de ter instalado:
- Node.js (versão LTS)  
- MySQL Server  
- Gerenciador de pacotes: **npm** ou **yarn**  

---

### 2️⃣ Configuração da API (Back-end)

**Instalação**  
```bash
cd backend
npm install
```

**Variáveis de Ambiente**  
Crie o arquivo **.env** na raiz do Back-end:  
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=sistema_agendamento

# Nodemailer
EMAIL_HOST=smtp.seuprovedor.com
EMAIL_PORT=465
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha_email
```

**Banco de Dados**  
```bash
# Cria o DB (via MySQL Workbench ou terminal)
# Executa as migrações
npx sequelize-cli db:migrate
```

**Iniciar o Servidor**  
```bash
npm start
# API rodando em http://localhost:3001
```

---

### 3️⃣ Configuração do Front-end (React)

**Instalação**  
```bash
cd frontend
npm install
```

**Iniciar a Aplicação**  
```bash
npm start
# Front-end rodando em http://localhost:3000
```

---

## 📬 Endpoints Principais (API)

### Criar consulta
```http
POST /consultas
```
```json
{
  "pacienteId": 1,
  "data": "2025-09-25T14:00:00",
  "observacoes": "Consulta de rotina"
}
```

### Listar consultas
```http
GET /consultas
```

---

## 💡 Próximos Passos
- **Front-end (React):** Criar telas de agendamento, dashboard médico e painel administrativo.  
- **Notificações:** Finalizar lembretes automáticos + templates HTML para e-mails.  
- **Autenticação:** Implementar login e permissões com **JWT**.  

---

## ✒️ Autor
**Tuany M. Fonseca**  
- GitHub: [TuanyMFonseca](https://github.com/TuanyMFonseca)  
- LinkedIn:  [Tuany-fonseca](https://www.linkedin.com/in/tuany-fonseca/) 

---
