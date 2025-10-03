import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api/api.js';


const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-bold">Clínica</h1>
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
};

export default Navbar;
