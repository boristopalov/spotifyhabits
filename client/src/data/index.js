import axios from 'axios';
import querystring from 'query-string';

//1 hour in milliseconds to keep track of token expiration 
const EXPIRATION_TIME = 3600000;


//const EXPIRATION_TIME = 1000;

const refresh_uri =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/refresh_token"
    : "https://spotifyhabits.herokuapp.com/refresh_token";

const getAccessToken = () => window.localStorage.getItem('access_token');

const setAccessToken = (token) => {
  window.localStorage.setItem('access_token', token);
};


const setTokenTimestamp = () => { 
  window.localStorage.setItem("access_token_timestamp", Date.now());
};

const setRefreshToken = (token) => {
  window.localStorage.setItem('refresh_token', token);
};


const getRefreshToken = () => window.localStorage.getItem('refresh_token');
const getTokenTimestamp = () => window.localStorage.getItem('access_token_timestamp');

async function refreshAccessToken() {
   try {
    const { data } = await axios.get(`${refresh_uri}?refresh_token=${getRefreshToken()}`)
    console.log('hello')
    console.log(data)
    const { access_token } = data;
    setAccessToken(access_token);
    console.log(getAccessToken());
    setTokenTimestamp();
    window.location.reload();
    return;
  }
  catch (error) {
    console.error(error);
  } 
};

export const getToken = () => {

  console.log(getTokenTimestamp());
  let parsed = querystring.parse(window.location.search);
  let accessToken = parsed.access_token;
  let refreshToken = parsed.refresh_token;
  


  console.log((Date.now() - getTokenTimestamp()))
  console.log(accessToken, refreshToken)
  
  if (!accessToken || accessToken === undefined) {
    accessToken = getAccessToken();
  }
  else { 
    setTokenTimestamp()
  }
  if (!refreshToken || refreshToken === undefined) {
    refreshToken = getRefreshToken();
  }

  
  if (getTokenTimestamp() && (Date.now() - getTokenTimestamp() > EXPIRATION_TIME)) {
    console.log('refreshing token');
    refreshAccessToken();
    return accessToken;
  }

  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  return accessToken;
};

export const accessToken = getToken();

export const logout = () => {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  window.location.assign('/');
};

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};

export const getProfile = () => 
  axios.get(
    "https://api.spotify.com/v1/me",
    { headers }
  );

export const getShortTermTracks = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
    { headers }
  );

export const getMediumTermTracks = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    { headers }
  );

export const getLongTermTracks = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    { headers }
  );


export const getShortTermArtists = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
    {
      headers,
    }
  );
export const getMediumTermArtists = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
    {
      headers,
    }
  );
export const getLongTermArtists = () => 
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
    { headers }
  )



  /**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = tracks => tracks.items.map(( track ) => track.id).join(',');


/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
 */
export async function getAudioFeaturesForTracks(tracks) {
  const ids = await getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

