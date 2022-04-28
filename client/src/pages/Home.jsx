import { useState } from "react";
import styled from "styled-components";
import Anime from "../components/Anime";
import AnimeDesktop from "../components/AnimeDesktop";
import AnimeGrid from "../components/AnimeGrid";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 20px 0;
  background-color: #111;
`;



const Home = ({checkFetching, isFetching}) => {
 

  return (
    <Container>

      {isFetching &&
          <Loading />
      }

      <Anime />
      <AnimeDesktop />
      <Wrapper>
        <AnimeGrid checkFetching={checkFetching} sectionName="Populares" queryName="populares"/>
      </Wrapper>
      <Footer />

    </Container>
    
  )
}


export default Home