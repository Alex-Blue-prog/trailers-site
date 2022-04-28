import styled from "styled-components";
import AnimeGrid from "../components/AnimeGrid";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 73px;
`;

const NewAnimes = ({checkFetching, isFetching}) => {
  return (
    <Container>
        {isFetching && <Loading />}
        <Wrapper>
        <AnimeGrid checkFetching={checkFetching} sectionName={"Novos"} queryName={"newAnimes"} />
        </Wrapper>
        <Footer pos="static"/>
    </Container>
  )
}

export default NewAnimes