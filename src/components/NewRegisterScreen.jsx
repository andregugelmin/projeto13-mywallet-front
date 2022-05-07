import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import UserContext from './contexts/UserContext';

function NewRegisterScreen() {
    const API_URL = 'http://localhost:5500/registers';

    const { token } = useContext(UserContext);
    const { registertype } = useParams();

    const [registerValue, setValue] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, []);

    function sendToApi(event) {
        event.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const registerData = {
            value: registerValue,
            description: description,
            type: registertype,
        };
        const promise = axios.post(API_URL, registerData, config);

        promise.then((response) => {
            navigate('/registers');
        });
        promise.catch((err) => {
            alert(err.response.statusText);
        });
    }

    function setTypeText() {
        return registertype === 'input' ? <>entrada</> : <>saída</>;
    }

    const typeText = setTypeText();
    return (
        <NewRegister>
            <h1>Nova {typeText}</h1>
            <form onSubmit={sendToApi}>
                <input
                    required
                    type="number"
                    placeholder="Valor"
                    min="0"
                    step="0.01"
                    value={registerValue}
                    onChange={(e) => setValue(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Salvar {typeText}</button>
            </form>
        </NewRegister>
    );
}

const NewRegister = styled.div`
    background: #8c25be;
    font-family: 'Raleway', sans-serif;
    height: 100vh;
    width: 100vw;
    padding-top: 25px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 16px;

    h1 {
        font-weight: 700;
        font-size: 30px;
        line-height: 31px;
        color: #ffffff;
        margin-bottom: 40px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5vh;
        width: 100%;
    }

    input {
        width: 100%;
        margin-bottom: 5%;
        height: 58px;
        background: #ffffff;
        border-radius: 5px;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        border: 1px double #d5d5d5;
        padding-left: 11px;
    }
    input::placeholder {
        color: #858282;
    }
    input:focus {
        outline: 1px outset #bdb9b9;
    }

    button {
        width: 100%;
        height: 46px;
        background: #a328d6;
        border-radius: 5px;
        border: none;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #ffffff;
        margin-bottom: 15%;
    }
`;

export default NewRegisterScreen;
