import AnimeList from "./AnimeList"
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import {axiosInstance} from "../config";
import AnimeListDesktop from "./AnimeListDesktop";



const AnimeDesktop = ({checkFetching}) => {

    const [newAnimes, setNewAnimes] = useState([]);

    useEffect(() => {
        const getNewAnimes = async () => {
            // checkFetching(true);
            const res = await axiosInstance.get("anime/all?limit=true");

            setNewAnimes(res.data);
            // checkFetching(false);
        }
        
        
        getNewAnimes();
    },[])


  return (
    <MegaContainer>
        <HeadWrapper>
            <HeadTitle>
                Mais Novos
            </HeadTitle>
        </HeadWrapper>
        <Container>
          

            <Wrapper>
               {newAnimes.map(item => (
                    <AnimeListDesktop key={item._id} value={item} />
                ))}
            </Wrapper>
        </Container>
    </MegaContainer>
  )
}

const MegaContainer = styled.div`
    padding: 0 5px;
    margin-top: 103px;
    margin-bottom: 50px;
    display: none;
    @media (min-width: 700px) {
        display: block;
    }
`;

const HeadWrapper = styled.div`
    padding: 0 10px;
    margin-left: 5px;
    border-left: 5px solid teal;
    margin-bottom: 5px;
`;

const HeadTitle = styled.h1`
    color: #fff;
    font-size: 1.5rem;
    margin-left: 10px;
`;

const Container = styled.div`
    overflow: hidden;
    position: relative;
`;

const Wrapper = styled.div.attrs(props => ({
 
}))`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;

`;

export default AnimeDesktop;