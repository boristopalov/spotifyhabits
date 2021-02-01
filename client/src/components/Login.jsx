import styled from 'styled-components';
import LoginButton from './LoginButton';



const StyledLogin = styled.div`
  h1 {
    font-size: 4em;
    text-align: left;
    padding-left: 4em;
    margin-top: 3.5em;
  }

  h3 {
    font-size: 2em;
    text-align: left;
    padding-left: 8em;
    margin-top: -0.5em;
  }
`;

const Login = () => { 
    return (
      <div>
        <StyledLogin>
          <h1>Spotify Habits</h1>
            <h3>
              A simple app to see your top music and listening habits on
              Spotify.
            </h3>
        </StyledLogin>

        <LoginButton> Login with Spotify </LoginButton>
      </div>
    );
    
}


export default Login;