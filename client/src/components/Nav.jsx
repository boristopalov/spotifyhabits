import styled from "styled-components";
import { ReactComponent as MicrophoneIcon } from "../images/microphone.svg";
import { ReactComponent as TrackIcon } from "../images/music.svg";
import { ReactComponent as HabitsIcon } from "../images/trending.svg";
import { NavLink } from "react-router-dom";


const StyledNavContainer = styled.nav`
  display: flex;
  //flex-flow: row wrap;
  justify-content: space-between;
  min-width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  background-color: #000;
  z-index: 9999;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 5vw;
`;


const HomeLink = styled(NavLink)`
  display: flex;
  padding-left: 1em;
  text-decoration: none;
  color: #fff;
  align-items: center;

`;

const StyledMenuItem = styled.li`
  padding-top: 10px;
  color: #fff;
  font-size: 18px;
  display: block;
  padding: 15px;
  justify-content: center;
  

  &:hover {
    opacity: 60%;
    background-position: 0% 50%;
    background: linear-gradient(90deg, #00f5a0 0%, #00d9f5 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.25s ease;

    svg {
      fill: url(#HoverGradient);
    }
  }

  svg {
    display: flex;
    margin: auto;
    width: 40px;
    height: 40px;
    margin-bottom: 7px;
    fill: #fff;
  }
`;




const isActive = "nav-item-active";

const StyledLink = styled(NavLink).attrs({ activeClassName: isActive })`
  &.${isActive} {
    background: linear-gradient(90deg, #00f5a0 0%, #00d9f5 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    svg {
      fill: url(#HoverGradient);
    }
  }
`;


const Nav = () => {
  return (
      <StyledNavContainer>
        <HomeLink exact to="/">
          Spotify Habits
          </HomeLink>
        <StyledMenu>
          <StyledLink
            exact to="/">
            <StyledMenuItem>
              {/* <HabitsIcon /> */}
              <div> My Habits </div>
            </StyledMenuItem>
          </StyledLink>
          <StyledLink
            exact to="/tracks">
            <StyledMenuItem>
              {/* <TrackIcon /> */}
              <div> Top Tracks </div>
            </StyledMenuItem>
          </StyledLink>
          <StyledLink exact to="/artists">
            <StyledMenuItem>
              {/* <MicrophoneIcon /> */}
              <div> Top Artists </div>
            </StyledMenuItem>
          </StyledLink>
        </StyledMenu>
      </StyledNavContainer>
  );
};

export default Nav;
