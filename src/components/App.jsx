import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import GlobalCSSConfig from './GlobalCSSConfig';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import TransactionsScreen from './TransactionsScreen';
import NewTransactionScreen from './NewTransactionScreen';

function App() {
    const [token, setToken] = useState('');

    return (
        <>
            <GlobalCSSConfig />
            <UserContext.Provider value={{ token, setToken }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/sign-up" element={<SignUpScreen />} />
                        <Route
                            path="/transactions"
                            element={<TransactionsScreen />}
                        />
                        <Route
                            path="/new-transaction/:transactionType"
                            element={<NewTransactionScreen />}
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
