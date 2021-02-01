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


const Heading = styled.div`
    margin: auto;
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
  //margin: auto;
  justify-content: center;
  padding-bottom: 25px;
`;

const TimeFrame = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isActive ? `#fff` : `#9b9b9b`)};
  outline: none;
  font-size: 22px;
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
  padding: 0px 100px;
`;



const LeftText = styled.div`
  display: flex;
  padding: 50px 0;
  h2 {
    font-size: 3em;
    max-width: 350px;
  }
`;


const RightText = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 50px 0;
  h2 {
    font-size: 3em;
    max-width: 350px;
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
  display: block;
  background: linear-gradient(90deg, #00f5a0 0%, #00d9f5 100%);
  border-radius: 50px;
  padding: 15px 0;
  border-width: 0px;
  margin: auto;
  max-width: 12vw;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.2em;
  margin-top: 10px;

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
  text-align: center;
  margin: auto;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    opacity: 60%;
  }
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
                <GradientButtonOne href={"/tracks"}>
                  {" "}
                  See my top tracks{" "}
                </GradientButtonOne>
                <GradientButtonTwo href={"/artists"}>
                  {" "}
                  See my top artists{" "}
                </GradientButtonTwo>
              </Buttons>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
};

export default Habits;
