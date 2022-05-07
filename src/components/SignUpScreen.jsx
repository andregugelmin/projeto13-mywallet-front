import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Login from '../layouts/Login';

function SignUpScreen() {
    const API_URL = 'http://localhost:5500/sign-up';

    const [registerEmail, setEmail] = useState('');
    const [registerPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerName, setName] = useState('');

    const navigate = useNavigate();

    function sendToApi(event) {
        event.preventDefault();

        if (confirmPassword !== registerPassword) {
            alert('Confirmação de senha esta diferente!');
            return;
        }
        const registerData = {
            email: registerEmail,
            password: registerPassword,
            passwordConfirm: confirmPassword,
            name: registerName,
        };
        const promise = axios.post(API_URL, registerData);

        promise.then((response) => {
            navigate('/');
        });
        promise.catch((err) => {
            alert(err.response.data.message);
        });
    }

    return (
        <Login>
            <h1>MyWallet</h1>
            <form onSubmit={sendToApi}>
                <input
                    required
                    type="text"
                    placeholder="Nome"
                    value={registerName}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    required
                    type="text"
                    placeholder="E-mail"
                    value={registerEmail}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    required
                    type="password"
                    placeholder="Senha"
                    value={registerPassword}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <input
                    required
                    type="password"
                    placeholder="Confirme a senha"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
                <button type="submit">Cadastre</button>
            </form>
            <Link style={{ textDecoration: 'none' }} to={`/`}>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </Login>
    );
}

export default SignUpScreen;
