import { Link, useNavigate } from 'react-router-dom';
import '../index.css'; 

function Navbar() {
	const navigate = useNavigate();
	const handleLogout = () => {
		sessionStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<nav className="navbar">
			<Link to="/signup">Registro</Link>
			<Link to="/login">Login</Link>
			<Link to="/private">Privado</Link>
			<button onClick={handleLogout}>Cerrar Sesión</button>
		</nav>
	);
}

export default Navbar;
