import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import GlobalCSSConfig from './GlobalCSSConfig';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import RegistersScreen from './RegistersScreen';
import NewRegisterScreen from './NewRegisterScreen';

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
                            path="/registers"
                            element={<RegistersScreen />}
                        />
                        <Route
                            path="/new-register/:registertype"
                            element={<NewRegisterScreen />}
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
