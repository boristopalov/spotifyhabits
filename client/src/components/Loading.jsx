import styled, { keyframes } from "styled-components/macro";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`;
const sound = keyframes`
  from {
    height: 20px;
  }
  to {
    height: 90px;
  }
`;
const Bars = styled.div`
  width: 250px;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Bar = styled.div`
  display: block;
  width: 2px;
  margin-right: 2px;
  height: ${(props) => props.height};
  background: #fff;
  animation-name: ${sound};
  animation-duration: 800ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transition: height 0.8s;
  animation-duration: ${(props) => props.duration};
`;

const Loading = () => (
  <Container>
    <Bars>
      <Bar height="2px" duration="474ms" />
      <Bar height="10px" duration="333ms" />
      <Bar height="18px" duration="207ms" />
      <Bar height="26px" duration="458ms" />
      <Bar height="30px" duration="400ms" />
      <Bar height="32px" duration="427ms" />
      <Bar height="34px" duration="241ms" />
      <Bar height="36px" duration="319ms" />
      <Bar height="40px" duration="474ms" />
      <Bar height="46px" duration="233ms" />
      <Bar height="2px" duration="407ms" />
      <Bar height="10px" duration="358ms" />
      <Bar height="18px" duration="400ms" />
      <Bar height="26px" duration="227ms" />
      <Bar height="30px" duration="341ms" />
      <Bar height="32px" duration="319ms" />
      <Bar height="34px" duration="487ms" />
      <Bar height="36px" duration="351ms" />
      <Bar height="40px" duration="412ms" />
      <Bar height="46px" duration="247ms" />
      <Bar height="2px" duration="474ms" />
      <Bar height="10px" duration="333ms" />
      <Bar height="18px" duration="207ms" />
      <Bar height="26px" duration="458ms" />
      <Bar height="30px" duration="400ms" />
      <Bar height="32px" duration="427ms" />
      <Bar height="34px" duration="241ms" />
      <Bar height="36px" duration="319ms" />
      <Bar height="40px" duration="474ms" />
      <Bar height="46px" duration="233ms" />
      <Bar height="2px" duration="407ms" />
      <Bar height="10px" duration="358ms" />
      <Bar height="18px" duration="400ms" />
      <Bar height="26px" duration="227ms" />
      <Bar height="30px" duration="341ms" />
      <Bar height="32px" duration="319ms" />
      <Bar height="34px" duration="487ms" />
      <Bar height="36px" duration="351ms" />
      <Bar height="40px" duration="412ms" />
      <Bar height="46px" duration="247ms" />
    </Bars>
  </Container>
);

export default Loading;
