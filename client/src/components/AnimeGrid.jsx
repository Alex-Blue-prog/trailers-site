import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../config";
import AnimeGridItem from "./AnimeGridItem";

const AnimeGrid = ({sectionName, queryName, checkFetching, skip}) => {
    const [animes, setAnimes] = useState([]);

    // console.log(skip);

    useEffect(()=> {
        let isMounted = true;
        let abortController = new AbortController();  

        const getAnimes = async () => {
 
            checkFetching(true);
            

            const res = await axiosInstance.get(`anime/all?${queryName}=true&skip=${skip}`);

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

  return (
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


export default AnimeGrid