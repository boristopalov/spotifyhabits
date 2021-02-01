import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Circular Std';
      src: local('Circular Std Black'), local('CircularStd-Black'),
      url('fonts/CircularStd-Black.woff2') format('woff2'),
      url('fonts/CircularStd-Black.ttf') format('truetype'),
      url('fonts/CircularStd-Black.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }
  @font-face {
      font-family: 'Circular Std';
      src: local('Circular Std Medium'), local('CircularStd-Medium'),
      url('fonts/CircularStd-Medium.woff2') format('woff2'),
      url('fonts/CircularStd-Medium.ttf') format('truetype'),
      url('fonts/CircularStd-Black.woff') format('woff');
          font-weight: 500;
      font-style: normal;
  }

  @font-face {
      font-family: 'Circular Std';
      src: local('Circular Std Bold'), local('CircularStd-Bold'),
      url('fonts/CircularStd-Bold.woff2') format('woff2'),
      url('fonts/CircularStd-Bold.ttf') format('truetype'),
      url('fonts/CircularStd-Bold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
  }

  @font-face {
      font-family: 'Circular Std';
      src: local('Circular StdBook'), local('CircularStd-Book'),
      url('fonts/CircularStd-Book.woff2') format('woff2'),
      url('fonts/CircularStd-Book.ttf') format('truetype'),
      url('fonts/CircularStd-Book.woff') format('woff');
      font-weight: 400;
      font-style: normal;
    }

  *, *:before, *:after { 
    box-sizing: border-box;
  }
  html { 
    box-sizing: border-box;
  }


  body { 
    font-family: 'Circular Std', system, -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #181818;
    color: #fff;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  button {
    font-family: 'Circular Std';
    color: #000;
    font-weight: 900;
  }
  a {
    font-family: 'Circular Std';
    font-size: 22px;
    color: #000;
    font-weight: 900;
    transition: all 0.25s ease;

  }
  /* Works on Firefox */
* {
  scrollbar-width: 12px;
  scrollbar-color: white black;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #000;
}

*::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 20px;
  border: none;
}


`;
export default GlobalStyle;
