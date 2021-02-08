import styled from 'styled-components';
import { SpotifyIcon } from "../images/spotify.js";
import media from "../styles/media";



const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  margin-bottom: 15px;
  align-items: center;
`;


const ArtistMask = styled.div`
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
    width: 30px;
    height: 30px;
    fill: #fff;
  }
`;

const ArtistLink = styled.a`
    //z-index: 9999;

`;
const ArtistPicContainer = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    ${ArtistMask} {
      opacity: 100%;
    }
    img {
      transition: all 0.25s ease;
      opacity: 30%;
    }
  }
`;


const ArtistName = styled.div`
  display: inline-block;
  margin-left: 20px;
  font-weight: 500;
  font-size: 20px;
  ${media.tablet`
    font-size: 16px;
  `};
  ${media.phablet`
    font-size: 14px;
  `};
`;


const ArtistPic = styled.div`
  display: flex;
  align-items: center;  

  img {
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
    border-radius: 100%;
  }
`;

const ArtistGenres = styled.span`
  text-align: center;
  font-size: 20px;
  ${media.tablet`
    font-size: 16px;
  `};
  ${media.phablet`
    font-size: 14px;
  `};
  color: #9b9b9b;
`;


const PopularityFollowers = styled.span`
  text-align: center;
  font-size: 20px;
  ${media.tablet`
    font-size: 16px;
  `};
  ${media.phablet`
    font-size: 14px;
  `};
  color: #9b9b9b;
`;





const Artist = (props) => { 
    const {artist, rank} = props;
    
    //gets the top genres of the artist
    const getGenres = (artist) => {
        let genres = "";

        if (artist.artist.genres.length && artist.artist.genres.length <= 3) {
            for (let i = 0; i < artist.artist.genres.length; i++) {
                genres += artist.artist.genres[i] + "/";
            }
            return genres;
        }
        if (artist.artist.genres.length && artist.artist.genres.length >= 3) {
            for (let i = 0; i < 3; i++) {
                genres += artist.artist.genres[i] + "/";
            }
            return genres;
        }
        return "no genres classified!";
    };

    //adds commas to numbers > 999
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
      <div>
        <ArtistGrid>
          <ArtistPicContainer>

            <ArtistPic>
              {artist.images.length && (
                <img src={artist.images[2].url} alt={artist.name} />
              )}
            </ArtistPic>

            <ArtistLink href={artist.external_urls["spotify"]} target="_blank">
                <ArtistMask>
                <SpotifyIcon />
                </ArtistMask>
            </ArtistLink>

          </ArtistPicContainer>

          <ArtistName> {rank+1}. {artist.name} </ArtistName>
          <ArtistGenres> {getGenres({ artist })} </ArtistGenres>

          <PopularityFollowers>
            {artist.popularity}% / {numberWithCommas(artist.followers.total)}{" "}
            followers
          </PopularityFollowers>
          
        </ArtistGrid>
      </div>
    );

}


export default Artist;