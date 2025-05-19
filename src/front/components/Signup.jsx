// src/components/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (res.ok) {
            navigate('/login');
        } else {
            const { msg } = await res.json();
            alert(msg);
        }
    };

    return (
        <div className="form-container">
            <h2>Registro</h2>
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
                <button className="btn" type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Signup;
