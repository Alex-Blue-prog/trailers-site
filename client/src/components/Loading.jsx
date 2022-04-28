import React from 'react'
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Container>
        <LoadingText>Carregando...</LoadingText>
    </Container>
  )
}

const basicLoading = keyframes`
    0%{color: teal }
    100%{color: #fff}
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    height: calc(100vh - 53px);
    width: 100%;
    left: 0;
    top: 53px;
    z-index: 999;
    background-color: #111;
`;

const LoadingText = styled.p`
    color: #fff;
    margin-top: -53px;
    font-weight: bold;
    font-size: 1.1rem;
    animation-name: ${basicLoading};
    animation-duration: 1s;
    animation-iteration-count: infinite;

`;

export default Loading