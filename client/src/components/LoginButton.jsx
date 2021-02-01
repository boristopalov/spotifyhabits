import styled from 'styled-components';


const login_uri =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://spotifyhabits.herokuapp.com/login";


const StyledLoginButton = styled.a`
  display: inline-block;
  background: linear-gradient(90deg, #00f5a0 0%, #00d9f5 100%);
  border-radius: 50px;
  padding: 20px 40px;
  border-width: 0px;
  margin: 20px 0 70px;
  min-width: 160px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;

  margin-left: 11.5em;

  &:hover {
    opacity: 60%;
  }
`;

const LoginButton = ({ children }) => { 
    return (    
        <StyledLoginButton href={login_uri}>   
            { children } 
        </StyledLoginButton>
    );
    
};

export default LoginButton;