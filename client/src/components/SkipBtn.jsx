import React from 'react'
import styled from 'styled-components'

const SkipBtn = ({increaseSkipt, decreaseSkipt}) => {
  return (
    <ButtonContainer>
        
        <Button onClick={(e) => decreaseSkipt(e)}>Voltar</Button>
        <Button onClick={(e) => increaseSkipt(e)}>Próximo</Button>

    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    font-size: 1.5rem;
    width: 100px;
    height: 35px;
    margin: 0 20px;
    background-color: teal;
    color: #fff;
    border: 0;
    border-radius: 4px;
`;

export default SkipBtn