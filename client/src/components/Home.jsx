import styled from 'styled-components';
import Nav from "./Nav";
import { ReactComponent as GithubIcon } from "../images/github.svg";
import { Switch, Route } from "react-router-dom";
import Tracks from "./Tracks";
import Artists from "./Artists";
import Habits from './Habits';
import media from '../styles/media'


const Github = styled.div`
  ${media.tablet`
    display: none;
  `};
  width: 45px;
  height: 45px;
  position: fixed;
  bottom: 5px;
  right: 5px;
  fill: #fff;
  opacity: 60%;
  cursor: pointer;
  &:hover,
  &:focus,
  &.active {
    opacity: 100%;
    transition: all 0.25s ease;
  }
`;



const Main = styled.div`
    margin-top: 100px;
    margin-bottom: 100px;
`;




const Home = () => {
    return (
      <div>
        <Nav />

        <Main>
          <Switch>
            <Route exact path="/" component={Habits} />
            <Route exact path="/tracks" component={Tracks} />
            <Route exact path="/artists" component={Artists} />
            {/**  not found page */}
          </Switch>

          <Github>
            <a
              href="https://github.com/boristopalov/spotifyhabits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
            </a>
          </Github>
        </Main>
      </div>
    );
}



export default Home;