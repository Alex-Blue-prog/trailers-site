import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AnimeList = ({value, position}) => {
    const ref = useRef(null);

    // useEffect(()=> {
    //     console.log(ref.current ? ref.current.offsetWidth : 0);
    // },[ref.current])



  return (
    <Wrapper ref={ref} position={position} >

        <Link to={`/eps/${value._id}`}>
            <ImgWrapper>
                <Img src={value.img} />
            </ImgWrapper>
        </Link>
        
        <AnimeName>{value.name}</AnimeName>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: calc(100% / 3);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
`;
const ImgWrapper = styled.div`
    width: 100%;
    height: 183px;
`;
const Img = styled.img`
    width: 100%;
    height: 183px;
    object-fit: cover;
`;
const AnimeName = styled.h2`
    margin-top: 5px;
    font-size: 1.1rem;
    text-transform: capitalize;
    color: teal;
    text-align: center;
    font-weight: 400;
`;

export default AnimeList