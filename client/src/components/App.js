import { useState, useEffect } from 'react';
import styled from "styled-components";
import { accessToken } from "../data";
import GlobalStyle from "../styles/GlobalStyle";
import Login from './Login';
import Home from './Home';


const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 60px 50px;
`;


function App() {
    const [token, setToken] = useState('');
    useEffect(() => {
      console.log(accessToken)
      if (accessToken) {
        setToken(accessToken)
      }
    }, [])
        console.log(window.localStorage);


  return (
    <AppContainer>
      {token && token !== "null" ? <Home /> : <Login />}

      <GlobalStyle />

    </AppContainer>
  );
}

export default App;
