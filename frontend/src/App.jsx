import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AgendarConsulta from './pages/AgendarConsulta';
import RequireAuth from './components/RequireAuth';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar simples */}
        <nav className="bg-blue-600 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <span className="font-bold">Sistema de Agendamento</span>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">
                Login
              </Link>
              <Link to="/dashboard" className="hover:underline">
                Consultas
              </Link>
              <Link to="/agendar" className="hover:underline">
                Agendar
              </Link>
            </div>
          </div>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/agendar" element={<RequireAuth><AgendarConsulta /></RequireAuth>} />
        </Routes>
      </div>
    </Router>
  );
}
