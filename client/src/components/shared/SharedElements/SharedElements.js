import styled from "styled-components";
import Chef from '../../../Images/Chef.png';
export const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    background:url(${Chef}) left bottom no-repeat;
    background-size: 21.5rem;
`
export const Header = styled.h1`
    justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgb(178, 108, 41) 0%,
    rgb(253, 190, 16) 100%
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 1rem;
`