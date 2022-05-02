import { useState } from "react";
import styled from "styled-components";
import AnimeGrid from "../components/AnimeGrid";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import SkipBtn from "../components/SkipBtn";

const Container = styled.div`
`;

const Wrapper = styled.div`
  margin-top: 73px;
`;

const PopularAnimes = ({checkFetching, isFetching}) => {
  const [skip, setSkip] = useState(1);

  const increaseSkipt = (event) => {
    event.preventDefault();

    setSkip(skip + 1);
  }

  const decreaseSkipt = (event) => {
    event.preventDefault();

    if(skip <= 1) return;

    setSkip(skip - 1);
  }

  return (
    <Container>
        {isFetching && <Loading />}
        <Wrapper>
        <AnimeGrid checkFetching={checkFetching} sectionName={"Populares"} queryName={"populares"} skip={skip} />
        </Wrapper>
        {/* <SkipBtn increaseSkipt={increaseSkipt} decreaseSkipt={decreaseSkipt} /> */}
        <Footer pos="static"/>
    </Container>
  )
}

export default PopularAnimes