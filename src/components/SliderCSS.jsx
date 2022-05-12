import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

export const Card = styled.div`
  min-height: 20rem;
  min-width: 15rem;
  overflow: hidden;
  border-radius: 4rem;
  position: relative;

  img {
    border-radius: 3.5rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 7.5%;
    transform: translate(-50%, 0%);
    text-align: center;
    width: 100%;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width:100%;
  height: 100%;
  background-color: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;