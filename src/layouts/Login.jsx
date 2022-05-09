import styled from 'styled-components';

const Login = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #8c25be;
    font-family: 'Raleway', sans-serif;
    height: 100vh;
    width: 100vw;
    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 42px;
        line-height: 50px;
        color: #ffffff;
        margin-top: 15vh;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5vh;
        width: 80vw;
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
        margin-bottom: 7vh;
    }

    p {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #ffffff;
        margin-bottom: 20px;
    }
`;

export default Login;
