import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { axiosInstance } from '../config';

const Login = ({loginUser}) => {
  const location = useLocation();
  let user = location.search.indexOf("usuario=true");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");



  const getUser = async (e) => {
    e.preventDefault();
    
    const res = await axiosInstance.post("auth/login", {username, password});

    //check if the user exists
    if(res.data.msg) {
      setMsg(res.data.msg);
      return;
    }
    setMsg("");

    //get the token and user data if inputs matches an user and save it in the local storage
    loginUser(res.data);
    navigate("/");
  }

  return (
    <Container>
       
      
      <Form onSubmit={getUser}>
          
          <FormTitle>LOGIN</FormTitle>
          {user !== -1 && !msg && <Label> <b style={{textTransform: "capitalize"}}> sucesso: </b>usuário criado, faça login</Label>}
          {msg && <Label style={{color: "red"}}> <b style={{textTransform: "capitalize"}}> erro: </b>{msg}</Label>}
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder='Usuário' type="text" />
          <Input value={password} onChange={e => setPassword(e.target.value)} placeholder='Senha' type="password" />

          <Button type="submit">Confirmar</Button>
      </Form>

    </Container>
  )
}

const Container = styled.div`
  margin-top: 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  @media (min-width: 700px) {
    max-width: 500px;
    width: 100%;
  }
`;

const Label = styled.label`
  color: teal;
  font-size: 1.2rem;
  margin-bottom: 15px;
  /* text-transform: capitalize; */
  max-width: 300px;
  width: 100%;
  font-weight: 400;
  /* text-align: center; */
  @media (min-width: 700px) {
    font-size: 0.9rem;
  }
`;

const FormTitle = styled.h4`
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 30px;
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

  @media (min-width: 700px) {
    font-size: 1rem;

    &:focus {
      padding: 5px 8px;
    }
  }
`;

const Button = styled.button`
  display: block;
  max-width: 140px;
  width: 100%;
  font-size: 1.4rem;
  padding: 8px 0px;
  background-color: teal;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (min-width: 700px) {
    max-width: 120px;
    font-size: 1rem;
  }

  &:hover {
    background-color: #fff;
    color: teal;
  }
`;

export default Login