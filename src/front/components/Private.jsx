import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 

function Private() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) navigate('/login');
    }, [navigate]);

    return (
        <div className="private-container">
            <h2>Bienvenido a la zona privada</h2>
            <p>
                Aquí podrás ver contenido exclusivo sólo para usuarios autenticados.
            </p>
        </div>
    );
}

export default Private;
