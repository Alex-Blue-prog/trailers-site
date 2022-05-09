import styled from 'styled-components';
import AnimeGrid from "../components/AnimeGrid";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Container = styled.div`
`;

const Wrapper = styled.div`
  margin-top: 73px;
`;


const Favorites = ({user, isFetching, checkFetching}) => {
  return (
    <Container>
        {isFetching && <Loading />}
        <Wrapper>
          <AnimeGrid user={user} checkFetching={checkFetching} sectionName={"Favoritos"} queryName={"user"}  />
        </Wrapper>
        {/* <Footer pos="static"/> */}
    </Container>
  )
}

export default Favorites