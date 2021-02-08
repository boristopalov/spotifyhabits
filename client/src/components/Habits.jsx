import styled from 'styled-components';
import {
  getProfile,
  getShortTermTracks,
  getMediumTermTracks,
  getLongTermTracks,
  getAudioFeaturesForTracks,
  getShortTermArtists,
  getMediumTermArtists,
  getLongTermArtists,
  logout
} from "../data";
import { useEffect, useState, useReducer } from 'react';
import { calculateTopGenres, calculateListeningHabits, calculateTopDecades, calculateHabitsText } from '../utils';
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import media from "../styles/media";



const Heading = styled.div`
    text-align: center;
    padding-top: 50px;
    h1 {
      font-size: 3em;
    }
    padding-bottom: 75px;
`;


const TimeFrames = styled.div`
  display: flex;
  padding-top: 25px;
  justify-content: center;
  padding-bottom: 40px;
`;

const TimeFrame = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isActive ? `#fff` : `#9b9b9b`)};
  outline: none;
  font-size: 22px;
  ${media.tablet`
    font-size: 18px;
  `};
  ${media.phablet`
    font-size: 16px;
  `};
  margin-left: 20px;

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


const BodyContainer = styled.div`
  ${media.giant`
    padding: 0px 100px;
  `}
  ${media.desktop`
    padding: 0px 100px;
  `}
  ${media.tablet`
    padding: 0px 25px;
  `} 
   ${media.phablet`
    padding: 0px 0px;
  `}
`;



const LeftText = styled.div`
  display: flex;
  ${media.giant`
    padding: 50px 0;
  `}
  ${media.desktop`
    padding: 50px 0;
  `}
  ${media.tablet`
    padding: 25px 0;
  `} 
   ${media.phablet`
    padding: 0px 0;
  `} 
  h2 {
    ${media.desktop` 
      font-size: 3em;
      max-width: 350px;
    `};
    ${media.giant` 
      font-size: 3em;
      max-width: 350px;
    `};
    ${media.tablet`
      font-size: 2em;
      max-width: 250px;
      `};
    ${media.phablet`
      font-size: 1.5em;
      max-width: 150px;
      `};
  }
`;


const RightText = styled.div`
  display: flex;
  justify-content: flex-end;

  ${media.giant`
    padding: 50px 0;
  `}
  ${media.desktop`
    padding: 50px 0;
  `}
  ${media.tablet`
    padding: 25px 0;
  `} 
   ${media.phablet`
    padding: 0px 0;
  `} 
  h2 {
    ${media.desktop` 
      font-size: 3em;
      max-width: 350px;
    `};
    ${media.giant` 
      font-size: 3em;
      max-width: 350px;
    `};
    ${media.tablet`
      font-size: 2em;
      max-width: 250px;
      `};
    ${media.phablet`
      font-size: 1.5em;
      max-width: 150px;
      `};
  }
`;

const Buttons = styled.div`
  margin: auto;
  text-align: center;
  a {
    margin-bottom: 60px;
  }
`;


const LogoutButton = styled.a`
  margin-top: 30px;
  background: linear-gradient(90deg, #00f5a0 0%, #00d9f5 100%);
  border-radius: 50px;
  padding: 15px 35px;
  border-width: 0px;
  max-width: 12vw;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 1em;
  &:hover {
    opacity: 60%;
  }
`;
const GradientButtonOne = styled.a`
  display: block;
  background: linear-gradient(90deg, #00f5a0 0%, #00d9f5 100%);
  border-radius: 50px;
  padding: 20px 40px;
  border-width: 0px;
  margin: auto;
  max-width: 30vw;
  ${media.tablet`
    max-width: 60vw;
    font-size: 18px;
  `}
  ${media.phablet`
    max-width: 60vw;
    font-size: 14px;
  `}

  text-align: center;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    opacity: 60%;
  }
`;

const GradientButtonTwo = styled.a`
  display: block;
  background: linear-gradient(90deg, #00d9f5 0%, #00f5a0 100%);
  border-radius: 50px;
  padding: 20px 40px;
  border-width: 0px;
  max-width: 30vw;
  ${media.tablet`
    max-width: 60vw;
    font-size: 18px;
  `}
  ${media.phablet`
    max-width: 60vw;
    font-size: 14px;
  `}
  text-align: center;
  margin: auto;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    opacity: 60%;
  }
`;

const NoDecLink = styled(NavLink)`
  text-decoration: none;

`;


const initialState = {
  time: "long",
  artists: null,
  genres: null,
  decades: null,
  habits: null,
  tracks: null,
};


const reducer = (state, action) => {

  switch (action.type) {
    case 'short':
      return {
        time: "short",
        artists: action.payload.artists,
        tracks: action.payload.tracks,
        genres: action.payload.genres,
        decades: action.payload.decades,
        habits: action.payload.habits,
      };
      case 'medium':
        return {
          time: "medium",
          artists: action.payload.artists,
          tracks: action.payload.tracks,
          genres: action.payload.genres,
          decades: action.payload.decades,
          habits: action.payload.habits,
        };
        case 'long':
          return {
            time: "long",
            artists: action.payload.artists,
            tracks: action.payload.tracks,
            genres: action.payload.genres,
            decades: action.payload.decades,
            habits: action.payload.habits,
          };
    default:
      return state;
  }
};


const Habits = () => {
    const [ profile, setProfile ] = useState();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { time, genres, decades, habits } = state;

  const apiRequests = {
        'short': [getShortTermTracks(), getShortTermArtists()],
        'medium': [getMediumTermTracks(), getMediumTermArtists()],
        'long': [getLongTermTracks(), getLongTermArtists()],
    };
      
  const changeTimeFrame = async (timeFrame) => {
    try {
      const reqTracks = await apiRequests[timeFrame][0];
      const reqArtists = await apiRequests[timeFrame][1];  
      const reqAudioFeatures = await getAudioFeaturesForTracks(reqTracks.data);
      const topGenres = calculateTopGenres(reqArtists.data.items);
      const topDecades = calculateTopDecades(reqTracks.data.items);
      const topHabits = calculateListeningHabits(reqAudioFeatures.data.audio_features);
      console.log(timeFrame);
      const habitsText = calculateHabitsText(topHabits, timeFrame);
      dispatch({
        type: timeFrame,
        payload: {
          artists: reqArtists.data.items,
          tracks: reqTracks.data.items,
          audioFeatures: reqAudioFeatures.data.audio_features,
          genres: topGenres,
          decades: topDecades,
          habits: habitsText,
        }
      });
    } catch(error) {
      if (error.response.status === 429) {
        alert("Too many requests! Please wait a minute to try again.")
      }
    }
};


    useEffect(() => {
      const initFetch = async () => {
        const reqProfile = await getProfile();
        setProfile(reqProfile.data);

        const reqArtists = await getLongTermArtists();
        const reqTracks = await getLongTermTracks();
        const reqAudioFeatures = await getAudioFeaturesForTracks(reqTracks.data)

        const topGenres = calculateTopGenres(reqArtists.data.items);
        const topDecades = calculateTopDecades(reqTracks.data.items);
        const topHabits = calculateListeningHabits(reqAudioFeatures.data.audio_features);
        const habitsText = calculateHabitsText(topHabits, 'long');


        dispatch({ type: 'long', payload: {
          artists: reqArtists.data.items,
          tracks: reqTracks.data.items,
          audioFeatures: reqAudioFeatures.data.audio_features,
          genres: topGenres,
          decades: topDecades,
          habits: habitsText
        }})
        window.scrollTo(0, 0);
      };
      initFetch();
        
    }, []);

    return (
      <div>
        {profile && decades && habits && genres ? (
          <div>
            <Heading>
              <h1> Hi, {profile.display_name}. </h1>
              <h3> What kind of music have you been listening to recently? </h3>

              <TimeFrames>
                <TimeFrame
                  isActive={time === "long"}
                  onClick={() => changeTimeFrame("long")}
                >
                  <span> All-Time</span>
                </TimeFrame>
                <TimeFrame
                  isActive={time === "medium"}
                  onClick={() => changeTimeFrame("medium")}
                >
                  <span> Last 6 Months </span>
                </TimeFrame>
                <TimeFrame
                  isActive={time === "short"}
                  onClick={() => changeTimeFrame("short")}
                >
                  <span> Last 4 Weeks </span>
                </TimeFrame>
              </TimeFrames>
              <LogoutButton onClick={logout}> Logout </LogoutButton>
            </Heading>
            <BodyContainer>
              <LeftText>
                <h2>
                  Your favorite decades {habits["timeText"]} are the{" "}
                  {decades.map((decade, i) => (
                    <span key={i}> {decade[0]}0s, </span>
                  ))}
                </h2>
              </LeftText>
              <RightText>
                <h2>
                  Your most listened to genres {habits["timeText"]} are{" "}
                  {genres.map((genre, i) => (
                    <span key={i}> {genre[0]}, </span>
                  ))}
                </h2>
              </RightText>
              <LeftText>
                {" "}
                <h2>{habits["energy"]} </h2>
              </LeftText>
              <RightText>
                {" "}
                <h2> {habits["danceability"]} </h2>
              </RightText>
              <LeftText>
                {" "}
                <h2> {habits["positivity"]} </h2>
              </LeftText>
            </BodyContainer>
            <Buttons>
              <NoDecLink exact to="/tracks">
                <GradientButtonOne> See my top tracks </GradientButtonOne>
              </NoDecLink>
              <NoDecLink exact to="/artists">
                <GradientButtonTwo> See my top artists </GradientButtonTwo>
              </NoDecLink>
            </Buttons>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
};

export default Habits;
