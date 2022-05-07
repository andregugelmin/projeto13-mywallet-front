import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import Login from '../layouts/Login';

function LoginScreen() {
    const { setToken } = useContext(UserContext);
    const API_URL = 'http://localhost:5500/sign-in';

    const [loginEmail, setEmail] = useState('');
    const [loginPassword, setPassword] = useState('');

    const navigate = useNavigate();

    const localUserObj = localStorage.getItem('myWalletUserData');

    if (localUserObj) {
        const userObjDeserialized = JSON.parse(localUserObj);
        sendUserObjToApi(userObjDeserialized);
    }

    function sendUserObjToApi(userObj) {
        const promise = axios.post(API_URL, userObj);

        promise.then((response) => {
            setToken(response.data.token);
            saveUserObjLocally(userObj);
            navigate('/registers');
        });
        promise.catch((err) => {
            alert(err.response.statusText);
        });
    }

    function login(event) {
        event.preventDefault();
        const loginData = {
            email: loginEmail,
            password: loginPassword,
        };
        sendUserObjToApi(loginData);
    }

    function saveUserObjLocally(userObj) {
        const userObjSerialized = JSON.stringify(userObj);
        localStorage.setItem('myWalletUserData', userObjSerialized);
    }

    return (
        <Login>
            <h1>MyWallet</h1>
            <form onSubmit={login}>
                <input
                    required
                    type="text"
                    placeholder="E-mail"
                    value={loginEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    required
                    type="password"
                    placeholder="Senha"
                    value={loginPassword}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <Link style={{ textDecoration: 'none' }} to={`/sign-up`}>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Login>
    );
}

export default LoginScreen;
