import { useState, useEffect } from 'react';
import styled from "styled-components";
import { accessToken } from "../data";
import GlobalStyle from "../styles/GlobalStyle";
import Login from './Login';
import Home from './Home';
import media from "../styles/media";



const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin: 0px auto;
  max-width: 1400px;
  ${media.desktop`
    padding: 60px 50px;
  `};
  ${media.tablet`
    padding: 50px 40px;
  `};
  ${media.phablet`
    padding: 30px 25px;
  `};
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
