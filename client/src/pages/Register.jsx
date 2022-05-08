import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {axiosInstance} from '../config';
import Msg from '../components/Msg';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const verifyInputs = (username, email, password) => {
    //take email characters
    let checkEmail = email.split("");


    //verify all inputs
    if(username.length <=2 ) {

      setMsg("nome de usuario deve ter mais que 2 caracteres");

      return true;

    } else if(email.indexOf('@') == -1 || email.indexOf(".com") == -1 && email.indexOf('.com.br') == -1){
      
      setMsg("email invalido");

      return true;

    } else if(email.indexOf('@') == 0 || email.indexOf("@.com") !== -1 || checkEmail.filter(value => value == "@").length > 1 || checkEmail.filter(value => value == ".").length > 2) {

      setMsg("email invalido");

      return true;

    } else if(password.length < 4){

      setMsg("senha deve ter no minimo 4 caracteres");

      return true;
    }
  }

  const createNewUser = async (e) => {
    e.preventDefault();
    let someError = verifyInputs(username, email, password);

    if(someError === true) {
      console.log('invalid inputs');
      return;
    }

   

    const res = await axiosInstance.post('auth/register', {username, email, password});

    if(res.data.userCreated) {
      
      setMsg("");
      navigate('/login?usuario=true');
      
    } else {
      setMsg(res.data.msg)
    }
 
  } 


  return (
    <Container>
      
      <Form onSubmit={createNewUser}>
          <FormTitle>Registrar-se</FormTitle>
          {msg && <Label><b> erro: </b>{msg}</Label>}
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder='Usuário' type="text" />
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />
          <Input value={password} onChange={e => setPassword(e.target.value)} placeholder='Senha' type="password" />

          <Button type="submit" >Confirmar</Button>
      </Form>

    </Container>
  )
}

const Container = styled.div`
  margin-top: 53px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  height: calc(80vh - 53px);

`;

const Form = styled.form`
  padding: 40px 15px;
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  border-radius: 5px;
`;

const FormTitle = styled.h4`
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 30px;
`;

const Label = styled.label`
  color: red;
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-transform: capitalize;
  max-width: 300px;
  width: 100%;
  font-weight: 400;
  /* text-align: center; */
`;

const Input = styled.input`
  min-width: 300px;
  margin-bottom: 15px;
  font-size: 1.4rem;
  padding: 5px 8px;
 

  &:focus {
    outline: none;
    color: teal;
    border-color: teal;
    padding: 8px 11px;
  }
`;

const Button = styled.button`
  display: block;
  max-width: 140px;
  width: 100%;
  font-size: 1.4rem;
  padding: 8px 10px;
  background-color: teal;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

export default Register