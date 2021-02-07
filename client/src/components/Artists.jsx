import styled from 'styled-components';
import { useEffect, useReducer } from 'react';
import { getShortTermArtists, getMediumTermArtists, getLongTermArtists } from '../data';
import Artist from './Artist';
import Loading from "./Loading";
import media from '../styles/media'



const ColumnHeadings = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  ${media.tablet`
    grid-template-columns: 50px 1fr 1fr 1fr;
  `};
  margin-bottom: 60px;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  margin-left: 10px;
  ${media.tablet`
    font-size: 18px;
  `};
`;

const Header = styled.span`
  text-align: center;
`;


const ArtistHeader = styled.span`
  padding-left: 50px;
  ${media.tablet`
    padding-left: 25px;
  `};
`;

const ArtistsContainer = styled.ul`
  margin-top: 50px;
  ${media.tablet`
    padding-left: 0px;
  `};
`;


const TimeFrames = styled.div`
  display: flex;
  padding-top: 25px;
  margin-left: 50px;
  padding-bottom: 25px;
  ${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;

const TimeFrame = styled.button`
  background-color: transparent;
  //color: #9b9b9b;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isActive ? `#fff` : `#9b9b9b`)};
  outline: none;
  font-size: 22px;
  margin-right: 5px;

  span {
    padding-bottom: 2px;
    border-bottom: 2px solid
      ${(props) => (props.isActive ? `#fff` : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
  &:hover {
    color: #fff;
    transition: all 0.25s ease;
  }
`;



const initialState = {
  time: 'long',
  artists: null,
};




const reducer = (state, action) => {
  switch (action.type) {
    case 'short':
      return {
        time: "short",
        artists: action.payload,
      };
    case 'medium':
      return {
        time: "medium",
        artists: action.payload,
      };
    case 'long':
      return {
        time: "long",
        artists: action.payload,
      };
    default:
      return state;
  }
};

const Artists = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {time, artists} = state;


  useEffect(() => {
    const initFetch = async () => {
      const req = await getLongTermArtists();
      dispatch({ type: "long", payload: req.data });
      window.scrollTo(0, 0);
    }
    initFetch();
  }, []);

  return (
    <div>
      <TimeFrames>
        <TimeFrame
          isActive={time === "long"}
          onClick={() => {
            getLongTermArtists().then((response) => { 
              const responseArtists = response.data;
              dispatch({ type: "long", payload: responseArtists })
            })
          }
          }
        >
          <span> All-Time</span>
        </TimeFrame>
        <TimeFrame
          isActive={time === "medium"}
          onClick={() => {
            getMediumTermArtists().then((response) => {
              dispatch({ type: "medium", payload: response.data })
            })
          }
          }
        >
          <span> Last 6 Months </span>
        </TimeFrame>
        <TimeFrame
          isActive={time === "short"}
          onClick={() => {
            getShortTermArtists().then((response) => {
              dispatch({ type: "short", payload: response.data })
            })
          }
        }
        >
          <span> Last 4 Weeks </span>
        </TimeFrame>
      </TimeFrames>
      <ArtistsContainer>
        <ColumnHeadings>
          <ArtistHeader> Artist</ArtistHeader>
          <span> </span>
          <Header> Top Genres </Header>
          <Header> Popularity </Header>
        </ColumnHeadings>
        {artists ? (
          artists.items.map((artist, i) => (
            <Artist artist={artist} key={i} rank={i} />
          ))
        ) : (
          <Loading />
        )} 
      </ArtistsContainer>
    </div>
  );
};

export default Artists;
