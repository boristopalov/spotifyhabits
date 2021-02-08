import styled from 'styled-components';
import media from '../styles/media';


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
  min-width: 160px;
  ${media.giant`
    max-width: 30vw;
  `}
  ${media.tablet`
    max-width: 60vw;
  `}
  ${media.phablet`
    max-width: 80vw;
    font-size: 18px;
  `}
  text-align: center;
  cursor: pointer;
  text-decoration: none;

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