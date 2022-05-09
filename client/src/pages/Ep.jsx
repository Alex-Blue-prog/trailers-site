import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import {axiosInstance} from "../config";

const Ep = ({checkFetching, isFetching}) => {
  const locationId = useLocation().pathname.split("/")[2];
  const [ep, setEp] = useState({});
  const [ep2, setEp2] = useState(null);
  const [mainName, setMainName] = useState("");

  useEffect(()=> {
    const getEp = async () => {
      checkFetching(true);
      const res = await axiosInstance.get("anime/ep/" + locationId);

      setEp(res.data.takeEp);
      setEp2(res.data.takeEp2);
      setMainName(res.data.name);

      checkFetching(false);
    }

    getEp();
  },[locationId]);

  return (
    <Container>
      {isFetching && <Loading />}
      <EpName>{mainName}</EpName>
      
      <VidContainer>
        {/* <source src="https://dl.dropboxusercontent.com/s/z22nnq6t5b9503q/videoplayback.mp4?dl=0"/> */}
        <Video controls src={ep.video} poster={ep.img} autoPlay></Video>

      </VidContainer>
      <BottomLine></BottomLine>
      
      <Wrapper>
        <EpTitle>Trailer: {ep.ep}</EpTitle>
        {ep2 &&
        <Link to={"/ep/" + ep2._id} style={{color: "inherit", textDecoration: "none"}}>
          <NextBtn>Próximo</NextBtn>
        </Link>
        }
      </Wrapper>
      
      <Footer pos={"fixed"} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 80px;
  padding: 0 10px;
  @media (min-width: 700px) {
    width: 50%;
    margin: 0 auto;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;



const VidContainer = styled.div`
  width: calc(100vw - 20px);
  margin: 15px 0;
  margin-bottom: 0;
  @media (min-width: 700px) {
    width: 100%;
  }
  
`;

const Video = styled.video`
  width: 100%;
`;

const EpName = styled.h1`
  color: teal;
  margin-top: 10px;
  font-size: 1.5rem;
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;

  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`;

const EpTitle = styled.h2`
  color: gray;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;
  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`;

const BottomLine = styled.div`
  height: 2px;
  width: 100%;
  background-image: linear-gradient(to right, teal, #fff);
  margin: 0 auto;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NextBtn = styled.div`
  color: #fff;
  background-color: teal;
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;
  font-size: 1.5rem;
  cursor: pointer;

  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`;

export default Ep