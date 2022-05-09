import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Login from '../layouts/Login';

function SignUpScreen() {
    const API_URL = 'https://back-my-wallet-deco.herokuapp.com/sign-up';

    const [transactionEmail, setEmail] = useState('');
    const [transactionPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [transactionName, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function sendToApi(event) {
        event.preventDefault();
        setIsLoading(true);

        if (confirmPassword !== transactionPassword) {
            alert('Confirmação de senha esta diferente!');
            setIsLoading(false);
            return;
        }
        const transactionData = {
            email: transactionEmail,
            password: transactionPassword,
            passwordConfirm: confirmPassword,
            name: transactionName,
        };
        const promise = axios.post(API_URL, transactionData);

        promise.then((response) => {
            navigate('/');
        });
        promise.catch((err) => {
            alert(err.response.data.message);
            setIsLoading(false);
        });
    }

    return !isLoading ? (
        <Login>
            <h1>MyWallet</h1>
            <form onSubmit={sendToApi}>
                <input
                    required
                    type="text"
                    placeholder="Nome"
                    value={transactionName}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    required
                    type="text"
                    placeholder="E-mail"
                    value={transactionEmail}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    required
                    type="password"
                    placeholder="Senha"
                    value={transactionPassword}
                    minlength="6"
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
    ) : (
        <Login>
            <h1>MyWallet</h1>
        </Login>
    );
}

export default SignUpScreen;
