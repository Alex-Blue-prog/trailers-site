import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
    position: ${props => props.pos};
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: 10px;

`;

const FooterList = styled.ul`
    background-color: #333;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
`;

const FooterListItem = styled.li`
    line-height: 45px;
    padding: 0 20px;
    color: #fff;
    font-size: 14px;
    border-left: ${props => props.mid && `1px solid #fff`};
    border-right: ${props => props.mid && `1px solid #fff`};
`;

const Rights = styled.div`
    background-color: teal;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    font-size: 15px;

    @media (min-width: 700px) {
        padding: 5px 0;
        font-size: 12px;
    }
`;

const Footer = ({pos}) => {
    let year = new Date().getFullYear();
    // const [value, setValue] = useState(0);

    // console.log(window.innerHeight);
    // console.log(document.body.clientHeight);

    // useEffect(()=> {
    //     if(document.body.clientHeight < window.innerHeight) {
    //         setValue(true);
    //     } else {
    //         setValue(false);
    //     }
    // },[]);

    // console.log(value);

  return (
    <FooterContainer pos={pos} >
        {/* <FooterList>
            <FooterListItem>Home</FooterListItem>
            <FooterListItem mid={"true"}>Contato</FooterListItem>
            <FooterListItem>Atualizações</FooterListItem>
        </FooterList> */}
        <Rights>
            &copy;{year} por Alex Silva
        </Rights>
    </FooterContainer>
  )
}

export default Footer