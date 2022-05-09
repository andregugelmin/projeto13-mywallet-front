import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';

function TransactionInputScreen() {
    const API_URL = 'https://back-my-wallet-deco.herokuapp.com/transactions';
    const { token, setToken } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            loadTransactionsFromAPI();
        }
    }, []);

    useEffect(() => {
        setBalance(getUserBalance);
    }, [transactions]);

    function loadTransactionsFromAPI() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const promise = axios.get(API_URL, config);

        promise.then((response) => {
            const { data } = response;
            setUsername(data.user.name);
            if (data.userTransaction !== undefined)
                setTransactions(data.userTransaction);
        });
        promise.catch((err) => {
            alert(err.response.data.message);
        });
    }

    function quitApp(params) {
        setToken(undefined);
        navigate('/');
        localStorage.removeItem('myWalletUserData');
    }

    function setTransactionBox() {
        return transactions.length === 0 ? (
            <div className="empty-transaction-box">
                <p>Não há registros de entrada ou saída</p>
            </div>
        ) : (
            <div className="user-transactions">
                <div className="transactions">
                    {transactions.map((transaction) => {
                        return (
                            <div className="transaction" key={transaction._id}>
                                <div className="transaction-info">
                                    <p className="transaction-date">
                                        {transaction.date.slice(0, 5)}
                                    </p>
                                    <p className="transaction-desc">
                                        {transaction.description}
                                    </p>
                                </div>
                                <p
                                    className={`transaction-${transaction.type}`}
                                >
                                    {parseFloat(transaction.value).toFixed(2)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="user-balance">
                    <p className="balance">Saldo</p>
                    <p
                        className={
                            balance >= 0
                                ? 'transaction-input'
                                : 'transaction-output '
                        }
                    >
                        {balance.toFixed(2)}
                    </p>
                </div>
            </div>
        );
    }

    function getUserBalance() {
        let userBalance = 0;
        if (transactions.length > 0) {
            transactions.forEach((element) => {
                if (element.type === 'input')
                    userBalance += parseFloat(element.value);
                else userBalance -= parseFloat(element.value);
            });
        }

        return userBalance;
    }

    const transactionBox = setTransactionBox();

    return (
        <Transactions>
            <header>
                <h1>Olá, {username}</h1>
                <ion-icon name="exit-outline" onClick={quitApp}></ion-icon>
            </header>
            <main>
                <div className="transactions-box">{transactionBox}</div>
                <div className="buttons-container">
                    <Link
                        to={`/new-transaction/input`}
                        className="transaction-button"
                    >
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <p>Nova entrada</p>
                    </Link>
                    <Link
                        to={`/new-transaction/output`}
                        className="transaction-button"
                    >
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <p>Nova saída</p>
                    </Link>
                </div>
            </main>
        </Transactions>
    );
}

const Transactions = styled.div`
    background: #8c25be;
    font-family: 'Raleway', sans-serif;
    height: 100vh;
    width: 100vw;
    padding-top: 25px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 16px;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #ffffff;
        overflow: hidden;
        white-space: nowrap;
    }

    ion-icon {
        color: #ffffff;
        font-size: 26px;
    }

    main {
        height: 90%;
    }

    .transactions-box {
        background: #ffffff;
        border-radius: 5px;
        width: 100%;
        height: 80%;
        margin-top: 22px;
        margin-bottom: 3vh;
    }

    .empty-transaction-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .empty-transaction-box p {
        width: 180px;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }

    .buttons-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 14vh;
        max-height: 100px;
    }

    .transaction-button {
        background: #a328d6;
        border-radius: 5px;
        width: 45%;
        height: 100%;
        max-height: 120px;
        padding: 14px;
        position: relative;
    }

    .transaction-button p {
        position: absolute;
        bottom: 14px;
        left: 14px;
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        color: #ffffff;
        width: 40%;
    }

    .user-transactions {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px;
        height: 100%;
    }

    .transactions {
        min-height: 50vh;
        max-height: 60vh;
        width: 100%;
        margin-bottom: 15px;
        overflow: scroll;
    }

    .transaction {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        font-size: 18px;
        line-height: 19px;
    }

    .transaction-info {
        display: flex;
        justify-content: space-evenly;
    }

    .transaction-date {
        color: #c6c6c6;
        margin-right: 15px;
    }

    .transaction-desc {
        color: #000000;
        overflow: hidden;
        white-space: nowrap;
        max-width: 35vw;
    }

    .transaction-input {
        color: #03ac00;
    }
    .transaction-output {
        color: #c70000;
    }

    .user-balance {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        line-height: 20px;
    }

    .balance {
        font-weight: 700;
        color: #000000;
    }
`;

export default TransactionInputScreen;
