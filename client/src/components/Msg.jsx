import {Menu} from '@material-ui/icons'
import styled from 'styled-components'

const Msg = ({message, complete}) => {
  return (
    <Container>
        <Message complete={complete}>message</Message>

    </Container>
  )
}

const Container = styled.div`
    background-color: teal;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
`;

const Message = styled.span`
    color: ${props => props.complete == true ? 'red' : '#fff'};
`

export default Msg;