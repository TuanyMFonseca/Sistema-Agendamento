import { useEffect, useState } from 'react';
import api from '../api/api.js';

export default function Dashboard() {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await api.get('/consultas');
        setConsultas(response.data);
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
      }
    };
    fetchConsultas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-blue-200">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 drop-shadow">
          Consultas Agendadas
        </h1>
        <table className="min-w-full border border-blue-300 divide-y divide-blue-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-base font-bold">Paciente</th>
              <th className="px-4 py-3 text-left text-base font-bold">Data</th>
              <th className="px-4 py-3 text-left text-base font-bold">Observações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {consultas.map((c) => (
              <tr key={c.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-3">{c.Paciente ? c.Paciente.nome : '—'}</td>
                <td className="px-4 py-3">
                  {new Date(c.data).toLocaleString('pt-BR')}
                </td>
                <td className="px-4 py-3">{c.observacoes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}