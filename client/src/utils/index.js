function getTopKeys(dict) {
 // Create keys array
  var keys = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });
  // Sort the array based on the second element
  keys.sort(function (first, second) {
    return second[1] - first[1];
  });
  // return a new array with only the first 3 keys
  return keys.slice(0,3);
};

export function calculateTopGenres(artists) {
  var topGenres = {};
  const numberOfArtists = artists.length;
  for (var i = 0; i < numberOfArtists; i++) {
    //more listened to artists will have greater weight in determining top genre
    let weight = numberOfArtists - i;

    //loop through genre for each artist and update topGenres 
    artists[i].genres.forEach((genre) => {
      if (topGenres[genre]) {
        topGenres[genre] += weight;
      } else {
        topGenres[genre] = weight;
      }
    });
  };
  return getTopKeys(topGenres);
};

export function calculateTopDecades(tracks) {
  //instead of 4-digit (1990s, 2000s, etc) decades I am doing just first 3 digits because the 4th digit is irrelevant, ex. 1970s is 197

  var topDecades = {
    190: 0,
    191: 0,
    192: 0,
    193: 0,
    194: 0,
    195: 0,
    196: 0,
    197: 0,
    198: 0,
    199: 0,
    200: 0,
    201: 0,
    202: 0,
  };

  const numberOfTracks = tracks.length;

  for (var i = 0; i < numberOfTracks; i++) {
    let currentTrack = tracks[i];
    let releaseYear = currentTrack.album.release_date.substr(0, 3);
    topDecades[releaseYear] += 1;
  }

  return getTopKeys(topDecades);
};

export function calculateListeningHabits(trackAudioFeatures) {

  var audioFeatures = {
    'danceability': 0.0,
    'energy': 0.0,
    'valence': 0.0,
  };

  const numberOfTracks = trackAudioFeatures.length;
  for (var i = 0; i < numberOfTracks; i++) {
    //loop through audioFeature for each artist and update audioFeatures 
    let currentTrack = trackAudioFeatures[i];

    //spaghetti
    let danceability = currentTrack.danceability;
    let energy = currentTrack.energy;
    let valence = currentTrack.valence;
    audioFeatures['danceability'] += danceability;
    audioFeatures['energy'] += energy;
    audioFeatures['valence'] += valence;
  };

  audioFeatures["danceability"] = (audioFeatures["danceability"] / numberOfTracks).toFixed(3);
  audioFeatures["energy"] = (audioFeatures["energy"] / numberOfTracks).toFixed(3);
  audioFeatures["valence"] = (audioFeatures["valence"] / numberOfTracks).toFixed(3);

  return audioFeatures;
};


export function calculateHabitsText(habits, timeFrame) {
  var allText = {'energy': '', 'danceability': '', 'positivity': '', 'timeText': ''}
  var energyText = '';
  var danceText = '';
  var positivityText = '';
  var timeText = '';

    if (timeFrame === 'long') {
      energyText =
        "The average energy of your all-time favorite music is " +
        (habits["energy"] * 100).toFixed(1) +
        "%.";
      danceText =
          "The average danceability of your all-time favorite music is " +
          (habits["danceability"] * 100).toFixed(1) +
          "%.";
      positivityText =
            "The average positivity of your all-time favorite music is " +
            (habits["valence"] * 100).toFixed(1) +
            "%.";
      timeText = "all-time";
    }
    if (timeFrame === 'medium') {
      energyText =
        "The average energy of your music in the past 6 months is " +
        (habits["energy"] * 100).toFixed(1) +
        "%.";
      danceText =
          "The average danceability of your music in the past 6 months is " +
          (habits["danceability"] * 100).toFixed(1) +
          "%.";
      positivityText =
            "The average positivity of your music in the past 6 months is " +
            (habits["valence"] * 100).toFixed(1) +
            "%.";
      timeText = "the past 6 months";
    } if (timeFrame === "short") {
      energyText =
        "The average energy of your music the past month is " +
        (habits["energy"] * 100).toFixed(1) +
        "%.";
      danceText =
        "The average danceability of your music the past month is " +
        (habits["danceability"] * 100).toFixed(1) +
        "%.";
      positivityText =
        "The average positivity of your music the past month is " +
        (habits["valence"] * 100).toFixed(1) +
        "%.";
      timeText = "the past month";
    }

  allText['positivity'] = positivityText;
  allText['energy'] = energyText;
  allText['danceability'] = danceText;
  allText['timeText'] = timeText;


  return allText;
};



  


