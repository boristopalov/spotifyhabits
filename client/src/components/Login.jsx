import styled from 'styled-components';
import LoginButton from './LoginButton';
import media from '../styles/media'




const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  h1 {
    font-size: 4em;
    ${media.tablet`
      font-size: 2.5em;
    `};
  }
  h3 {
    font-size: 2em;
    ${media.tablet`
      font-size: 2em;
    `};
  }
`;

const Login = () => { 
    return (
        <StyledLogin>
  
          <h1>Spotify Habits</h1>
            <h3>
              A simple app to see your top music and listening habits on
              Spotify.
            </h3>
        <LoginButton> Login with Spotify </LoginButton>
        </StyledLogin>

   
    );
    
}


export default Login;