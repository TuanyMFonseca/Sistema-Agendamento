import { useState } from 'react';
import api from '../api/api.js';

function AgendarConsulta() {
  const [formData, setFormData] = useState({
    nomePaciente: '',
    email: '',
    telefone: '',
    data: '', // Use formato datetime-local para melhor UX
    observacoes: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Ajusta a data para o formato ISO (opcional, mas recomendado para o backend)
    const dataISO = new Date(formData.data).toISOString();
    
    try {
      const payload = { ...formData, data: dataISO };
      
      // Chama a rota pública de agendamento
      const response = await api.post('/consultas/publico', payload);
      
      setMessage(response.data.message || 'Agendamento concluído!');
      setIsSuccess(true);
      setFormData({ nomePaciente: '', email: '', telefone: '', data: '', observacoes: '' }); // Limpa o formulário

    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erro ao agendar consulta. Tente novamente.';
      setMessage(errorMsg);
      setIsSuccess(false);
      console.error('Erro de agendamento:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Agendamento de Consulta</h2>
      <p className="mb-6 text-center text-gray-600">
        Agende sua consulta preenchendo os dados abaixo. Você receberá uma confirmação por e-mail.
      </p>

      {message && (
        <div className={`p-4 mb-4 text-sm rounded-lg ${isSuccess ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded shadow-md">
        
        {/* Nome do Paciente */}
        <div className="mb-4">
          <label htmlFor="nomePaciente" className="block text-gray-700 font-medium mb-2">Nome Completo</label>
          <input type="text" id="nomePaciente" name="nomePaciente" value={formData.nomePaciente} onChange={handleChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        {/* E-mail */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        {/* Telefone */}
        <div className="mb-4">
          <label htmlFor="telefone" className="block text-gray-700 font-medium mb-2">Telefone (Opcional)</label>
          <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        {/* Data e Hora */}
        <div className="mb-6">
          <label htmlFor="data" className="block text-gray-700 font-medium mb-2">Data e Hora da Consulta</label>
          <input type="datetime-local" id="data" name="data" value={formData.data} onChange={handleChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        {/* Observações */}
        <div className="mb-6">
          <label htmlFor="observacoes" className="block text-gray-700 font-medium mb-2">Observações (Opcional)</label>
          <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange} rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <button type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150">
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
}

export default AgendarConsulta;