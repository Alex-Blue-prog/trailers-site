import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { axiosInstance } from "../config";
import Footer from "../components/Footer";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const Container = styled.div`
  margin-top: 80px;
  padding: 0 10px;

  @media (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const TopTitle = styled.h1`
  color: gray;
  font-size: 1.1rem;
  margin-bottom: 18px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 400;
  @media (min-width: 700px) {
    font-size: 0.9rem;
    width: 100%;
    
  }
`;

const AnimeTitle = styled.span`
  color: #fff;
  text-transform: uppercase;
`;

const AnimeContainer = styled.div`
  padding: 20px;
  background-color: #333;
  @media (min-width: 700px) {
    flex: 1;
    background-color: #111;
  }
`;

const AnimeImgContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  
`;

const AnimeImg = styled.div`
  width: 80%;
  height: 350px;
  border: 1px solid teal;
  position: relative;
  @media (min-width: 700px) {
    height: 450px;
  }

`;

const FavoriteIcon = styled.div`
  padding: 5px;
  color: teal;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
`;

const Img = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 350px;
  object-fit: cover;

  @media (min-width: 700px) {
    height: 450px;
  }
`;

const ImgBottomTitle = styled.h2`
  color: teal;
  font-size: 1rem;
  margin-top: 15px;
  text-transform: capitalize;
  @media (min-width: 700px) {
    font-size: 0.9rem;
  }
  
`;

const AnimeInfo = styled.div`
  margin-top: 15px;

`;

const InfoText = styled.h3`
  margin-top: 10px;
  color: #fff;
  font-size: 15px;
  @media (min-width: 700px) {
    font-size: 12px;
  }
`;

const InfoTextValue = styled.span`
    font-size: 15px;
    color: gray;
    text-transform: lowercase;
    margin-left: 5px;
    text-decoration: underline;

    @media (min-width: 700px) {
      font-size: 13px;
      text-decoration: none;
    }
`;

const DescWrapper = styled.article`
  margin-top: 25px;
  
`;

const Desc = styled.p`
  text-align: center;
  color: teal;
  font-size: 1.4rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`;

const DescText = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  color: #fff;
  line-height: 1.5rem;

  @media (min-width: 700px) {
    font-size: 0.8rem;
  }
`;

const TemporadaContainer = styled.div`
  
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const TempBtn = styled.button`
  margin-top: 20px;
  width: calc(50% - 10px);
  background-color: teal;
  color: #fff;
  border: none;
  height: 35px;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 5px;
  
`;

const EpisodesContainer = styled.div`
  padding: 20px;
  background-color: #111;

  @media (min-width: 700px) {
    flex: 1;
  }
`;

const TempNum = styled.h4`
  color: #fff;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 400;
  @media (min-width: 700px) {
    /* border-left: 5px solid teal;
    padding-left: 10px; */
    text-align: center;
    margin-bottom: 30px;
    font-weight: 300;
  }
`;

const TempType = styled.h4`
  color: #fff;
  @media (min-width: 700px) {
    border-left: 5px solid teal;
    padding-left: 10px;
    font-weight: 400;
  }
`;

const EpList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const EpListItem = styled.li`
  
`;

const EpInfoContainer = styled.div`
  line-height: 45px;
`;

const EpText = styled.span`
  color: teal;
  margin-right: 10px;
  font-weight: bold;

  @media (min-width: 700px) {
    font-size: 0.8rem;
  }
`;

const EpTitle = styled.span`
  color: gray;
  

  @media (min-width: 700px) {
    font-size: 0.8rem;
  }
`;

const EpsList = ({changeFavorite, user, checkFetching, isFetching}) => {
  const locationId = useLocation().pathname.split("/")[2];
  const [animeInfo, setAnimeInfo] = useState({});
  

  useEffect(()=> {
    let isMounted = true;
    const getEps = async () => {
      if(isMounted) {
        checkFetching(true);
      }
      

      const res = await axiosInstance.get("anime/" + locationId);

      if(isMounted) {
        setAnimeInfo(res.data);
      }
      
      if(isMounted) {
        checkFetching(false);
      }
      
    }

    getEps();

    return () => {isMounted = false}
  },[locationId])

  useEffect(()=> {


    const increaseRate = async () => {
      await axiosInstance.put("anime/rate/" + locationId);
    }

    increaseRate();
 
  
  },[locationId]);

  //check if this item is favorited or not


  //change favorite when user click the favorite icon button
  const changeFavoriteFunc = () => {
    changeFavorite(user?.favorites.includes(animeInfo._id), animeInfo._id);
  }

  useEffect(()=> {
    window.scrollTo(0, 0);
  },[locationId]);

  

  return (
    <>
    <Container>
      {isFetching && 
        <Loading />
      }

      <TopTitle>Assista Online Grátis - <AnimeTitle>{animeInfo.name}</AnimeTitle></TopTitle>
      <AnimeContainer>
        <AnimeImgContianer>
          <AnimeImg>
            <Img src={animeInfo.img} />
            {user && <FavoriteIcon onClick={changeFavoriteFunc}>{user?.favorites.includes(animeInfo._id) ? <Favorite style={{fontSize: "2rem"}} /> : <FavoriteBorder style={{fontSize: "2rem"}} />}</FavoriteIcon>}
          </AnimeImg>
          <ImgBottomTitle>Assistir {animeInfo.name} Online</ImgBottomTitle>
        </AnimeImgContianer>
        <AnimeInfo>
          <InfoText>Video: <InfoTextValue>{animeInfo.dub ? "dublado" : "lengendado"}</InfoTextValue></InfoText>
          <InfoText>Lançamento: <InfoTextValue>{animeInfo.launch}</InfoTextValue></InfoText>
          <InfoText>Total de trailers: <InfoTextValue>{animeInfo.episodes?.length}</InfoTextValue></InfoText>
          {/* <InfoText>Atualizado: <InfoTextValue>{new Date(animeInfo.updatedAt).toLocaleDateString()}</InfoTextValue></InfoText> */}
        </AnimeInfo>
        <DescWrapper>
          <Desc>Descrição</Desc>
          <DescText>{animeInfo.desc}</DescText>
        </DescWrapper>
        
      </AnimeContainer>
      
      <EpisodesContainer>
        <TempNum>
          {animeInfo?.temp ?
            `temporada ${animeInfo.temp}`
          :
            `assista os trailers aqui`
          }
        </TempNum>
        <TempType>{animeInfo?.dub ? "Dublado" : "Legendado"}</TempType>
        <EpList>
          {animeInfo.episodes?.map(item => (
            <EpListItem key={item._id}>
              <Link to={`/ep/${item._id}`} style={{color: "inherit", textDecoration: "none"}}>

                <EpInfoContainer>
                  <EpText>Trailer: {item.ep}</EpText>
                  <EpTitle>assistir agora</EpTitle>
                  {/* <EpTitle>{item.name && item.name}</EpTitle> */}
                </EpInfoContainer>

              </Link>
            </EpListItem>
          ))}
        </EpList>
      </EpisodesContainer>
          
    </Container>
    <Footer />
    </>
  )
}

export default EpsList