import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AnimeListDesktop = ({value}) => {
    const ref = useRef(null);




  return (
    <Wrapper ref={ref} >

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
    width: 100%;
    max-width: 137px;
    border: 5px solid transparent;
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
    font-size: 1rem;
    text-transform: capitalize;
    color: teal;
    text-align: center;
    font-weight: 400;
`;

export default AnimeListDesktop