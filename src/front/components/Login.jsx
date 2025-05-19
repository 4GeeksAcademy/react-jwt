import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (res.ok) {
            const { access_token } = await res.json();
            sessionStorage.setItem('token', access_token);
            navigate('/private');
        } else {
            alert('Credenciales inválidas');
        }
    };

    return (
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="form-control"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
