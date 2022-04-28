import styled from "styled-components";
import {Link} from "react-router-dom"

const AnimeListItemli = styled.li`
    width: calc(50% - 5px);
    margin-bottom: 5px;
    
    @media (min-width: 700px) {
        width: calc(20% - 20px);
        height: fit-content;
        margin: 0 10px;
        margin-bottom: 5px;
    }
`;

const AnimeListItem = styled.div`
    
    /* height: 300px; */
`;
const AnimeImgContainer = styled.div`
    height: 250px;
    width: 100%;
    position: relative;

    @media (min-width: 700px) {
        height: 220px;
    }
`;
const Img = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const TotalCircle = styled.div`
    line-height: 25px;
    width: 25px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: #fff;
    color: teal;
    text-align: center;
    font-weight: bold;
`;

const AnimeName = styled.h2`
    font-size: 1.2rem;
    text-transform: capitalize;
    color: teal;
    text-align: center;
    font-weight: 600;
    text-decoration: none;
    /* margin-top: 10px; */
    line-height: calc(1.2rem + 15px);

    @media (min-width: 700px) {
        font-size: 1.1rem;
        font-weight: 400;
    }
`;

const AnimeGridItem = ({value}) => {
  return (
        <AnimeListItemli>
            <Link to={`/eps/${value?._id}`} style={{textDecoration: "none"}}>
                <AnimeListItem>
                    <AnimeImgContainer>
                        <Img src={value?.img} />
                        <TotalCircle>
                            {value?.episodes.length}
                        </TotalCircle>
                    </AnimeImgContainer>
                    <AnimeName>{value?.name}</AnimeName>
                </AnimeListItem>
            </Link>
        </AnimeListItemli>
  )
}



export default AnimeGridItem