import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import Login from '../layouts/Login';

function LoginScreen() {
    const { setToken } = useContext(UserContext);
    const API_URL = 'https://back-my-wallet-deco.herokuapp.com/sign-in';

    const [loginEmail, setEmail] = useState('');
    const [loginPassword, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLogingIn, setIsLogingIn] = useState(true);

    const navigate = useNavigate();

    const localUserObj = localStorage.getItem('myWalletUserData');

    if (localUserObj) {
        const userObjDeserialized = JSON.parse(localUserObj);
        sendUserObjToApi(userObjDeserialized);
    } else if (isLoading) {
        setIsLoading(false);
        setIsLogingIn(false);
    }

    function sendUserObjToApi(userObj) {
        const promise = axios.post(API_URL, userObj);

        promise.then((response) => {
            setToken(response.data.token);
            saveUserObjLocally(userObj);
            navigate('/transactions');
        });
        promise.catch((err) => {
            alert(err.response.data.message);
            setIsLoading(false);
            setIsLogingIn(false);
        });
    }

    function login(event) {
        event.preventDefault();
        const loginData = {
            email: loginEmail,
            password: loginPassword,
        };
        setIsLogingIn(true);
        sendUserObjToApi(loginData);
    }

    function saveUserObjLocally(userObj) {
        const userObjSerialized = JSON.stringify(userObj);
        localStorage.setItem('myWalletUserData', userObjSerialized);
    }

    return !isLogingIn ? (
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
    ) : (
        <Login>
            <h1>MyWallet</h1>
        </Login>
    );
}

export default LoginScreen;
