import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../config";
import AnimeGridItem from "./AnimeGridItem";
import {Favorite, Pageview} from "@material-ui/icons";

const AnimeGrid = ({user, sectionName, queryName, checkFetching, skip}) => {
    const [animes, setAnimes] = useState([]);

    // console.log(skip);

    useEffect(()=> {
        let isMounted = true;
        let abortController = new AbortController();  

        const getAnimes = async () => {
            let res;
 
            checkFetching(true);
            
            if(queryName == "user") {
                // console.log('1');
                res = await axios.get(`${process.env.REACT_APP_SERVER_URL}user/favorites`, { headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken} });
            } else {
                // console.log('2');
                res = await axiosInstance.get(`anime/all?${queryName}=true&skip=${skip}`);
            }

            

            if(isMounted) {
                setAnimes(res.data);
            }
            
            checkFetching(false); 
        }

        getAnimes();

        return () => { 
            isMounted = false; 
            abortController.abort();  
        };
    },[skip, queryName])

  return animes.length > 0 ? (
    <Container>
        <SectionName>
            {sectionName}
        </SectionName>
        <AnimeList>
            {animes?.map(value => (
                <AnimeGridItem key={value._id} value={value} />
            ))}
        </AnimeList>
        
    </Container>
  ) : (
      <EmptyWrapper>
        <div>
            <EmptyTitle>Ainda não há nada aqui.</EmptyTitle>
            {/* <Favorite style={{fontSize: "3.5rem"}} /> */}
        </div>
      </EmptyWrapper>
  )
}

const Container = styled.div`
    padding: 0px 10px;
    @media (min-width: 700px) {
        padding: 0;
    }
`;
const SectionName = styled.h1`
    color: #fff;
    text-align: center;
    font-weight: 400;
    text-shadow: 1px 1px teal;
    font-size: 1.5rem;
`;
const AnimeList = styled.ul`
    margin-top: 20px;
    display: flex;
    list-style: none;
    padding: 0;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (min-width: 700px) {
        justify-content: flex-start;
    }
`;

const EmptyWrapper = styled.div`
    margin-top: 280px;
    color: #fff;
    text-align: center;
`;

const EmptyTitle = styled.p`
    font-size: 1.4rem;
    margin-bottom: 20px;
`;



export default AnimeGrid