import { useEffect, useReducer } from "react";
import {
  getShortTermTracks,
  getMediumTermTracks,
  getLongTermTracks,
} from "../data";
import styled from "styled-components";
import { SpotifyIcon } from "../images/spotify.js";
import Loading from "./Loading";
import media from '../styles/media'


const TracksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  `};
  grid-gap: 20px;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Track = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 22px;
  ${media.tablet`
    font-size: 16px;
  `};
  ${media.phablet`
    font-size: 12px;
  `};
  margin-top: 5px;
  font-weight: 500;
`;

const ArtistAlbum = styled.div`
  color: #9b9b9b;
  font-size: 16px;
  ${media.tablet`
    font-size: 12px;
  `};
  ${media.phablet`
    font-size: 10px;
  `};
`;


const AlbumMask = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  opacity: 0%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: none;
  transition: all 0.25s ease;
  align-items: center;

  svg {
    width: 100px;
    height: 100px;
    fill: #fff;
  }
`;

const TrackLink = styled.a`
  //z-index: 999999;
`;
const AlbumArtwork = styled.div`
  display: inline-block;
  position: relative;
  ${media.tablet`
    width: 120px;
    height: 120px;
  `};
  ${media.phablet`
    width: 100px;
    height: 100px;
  `};
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    ${AlbumMask} {
      opacity: 100%;
    }
    img {
      transition: all 0.25s ease;
      opacity: 30%;
    }
  }
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
  time: "long",
  tracks: null,
};


const reducer = (state, action) => {
  switch (action.type) {
    case "short":
      return {
        time: "short",
        tracks: action.payload,
      };
    case "medium":
      return {
        time: "medium",
        tracks: action.payload,
      };
    case "long":
      return {
        time: "long",
        tracks: action.payload,
      };
    default:
      return state;
  }
};


const Tracks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {time, tracks} = state;

  useEffect(() => {
    const initFetch = async () => {
      const req = await getLongTermTracks();
      dispatch({ type: "long", payload: req.data });
      window.scrollTo(0, 0);
    };
    initFetch();
  }, []);

  return (
    <div>
      <TimeFrames>
        <TimeFrame
          isActive={time === "long"}
          onClick={() => {
            getLongTermTracks().then((response) => {
              const responseTracks = response.data;
              dispatch({ type: "long", payload: responseTracks });
            });
          }}
        >
          <span> All-Time</span>
        </TimeFrame>
        <TimeFrame
          isActive={time === "medium"}
          onClick={() => {
            getMediumTermTracks().then((response) => {
              const responseTracks = response.data;
              dispatch({ type: "medium", payload: responseTracks });
            });
          }}
        >
          <span> Last 6 Months </span>
        </TimeFrame>
        <TimeFrame
          isActive={time === "short"}
          onClick={() => {
            getShortTermTracks().then((response) => {
              const responseTracks = response.data;
              dispatch({ type: "short", payload: responseTracks });
            });
          }}
        >
          <span> Last 4 Weeks </span>
        </TimeFrame>
      </TimeFrames>

      <TracksGrid>
        {tracks ? (
          tracks.items.map((track, i) => (
            <div key={i}>
              {track.album.images.length && (
                <AlbumArtwork>
                  <img src={track.album.images[1].url} alt="Album Artwork" />
                  <TrackLink
                    href={track.external_urls["spotify"]}
                    target="_blank"
                  >
                    <AlbumMask>
                      <SpotifyIcon />
                    </AlbumMask>
                  </TrackLink>
                </AlbumArtwork>
              )}
              <Track>
                {" "}
                {i + 1}. {track.name}{" "}
                <ArtistAlbum>
                  {track.artists[0].name} {" - "} {track.album.name}
                </ArtistAlbum>
              </Track>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </TracksGrid>
    </div>
  );
};

export default Tracks;
