import AnimeList from "./AnimeList"
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import {axiosInstance} from "../config";



const Anime = ({checkFetching}) => {

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

    const [sliderPosition, setSliderPosition] = useState(0);
    const [hold, setHold] = useState((window.screen.width - 20) / 3 );
    const [diference, setDiference] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [initialTouch, setInitialTouch] = useState(2);
    const [initialPosition, setInitialPosition] = useState(0);

   
    
    const run = () => {
      
        setHold((window.screen.width - 20) / 3);
        setInitialPosition(2);
        
    };

    // window.addEventListener('resize', run); //ele n gosta amigãn

    useEffect(()=> {
        run();
    },[])

    const slider = (direction) => {
        // const initialPosition = 2;

        if(direction === "right") {
            if(sliderPosition + initialPosition >= newAnimes.length - 1) {
                return;
            }
            setSliderPosition(sliderPosition+1);

        } else {    

            if(sliderPosition > 0) {
                setSliderPosition(sliderPosition-1);
            } 
        }
        setDiference(0);
    }

    // drag slider 

   


    const handleDragMove = (e) => {
        setAnimate(false);

        let test;

        if(e.type === 'touchmove') {
      
            
            setDiference(e.touches[0].clientX - initialTouch);
            test = e.touches[0].clientX - initialTouch;

            if(test >= hold ){
                // console.log(1, e.touches[0].clientX - initialTouch);
                setInitialTouch(e.touches[0].clientX);
                slider('left');

            } 
            else if(test <= -hold) {
                setInitialTouch(e.touches[0].clientX);
                slider('right');
            
            }

            
  
        } 
        
        // else {

        //     setDiference(e.clientX - initialTouch);
        //     test = e.clientX - initialTouch;

        //     if(test >= hold ){
        //         // console.log(1, e.touches[0].clientX - initialTouch);
        //         setInitialTouch(e.clientX);
        //         slider('left');

        //     } 
        //     else if(test <= -hold) {
        //         setInitialTouch(e.touches[0].clientX);
        //         slider('right');
            
        //     }

        // }
    }

    

    const handleDrag = (e) => {


        if(e.type === 'touchstart') {
            setInitialTouch(e.touches[0].clientX);
  
        } 
        // else {
        //     console.log('go');
        //     setInitialTouch(e.clientX);

        //     document.onmousemove = handleDragMove;
        //     document.onmouseup = handleDragEnd;
        // }        
    }
    
    const handleDragEnd = () => {
        setAnimate(true);

        if(diference <= -40) {
            slider('right');
        } else if(diference >= 40) {
            slider('left');
        }

        setDiference(0);
        // document.onmousemove = null;
        // document.onmouseup = null;
        // console.log("end");
    }

  return (
    <MegaContainer>
        <HeadWrapper>
            <HeadTitle>
                Mais Novos
            </HeadTitle>
        </HeadWrapper>
        <Container>
            <Icon onClick={()=> {slider('left'); setAnimate(true)}} ><ArrowBackIos style={{color: "white", fontSize: "2.5rem"}}/></Icon>
            <Icon onClick={()=> {slider('right'); setAnimate(true)}} right={true}><ArrowForwardIos style={{color: "white", fontSize: "2.5rem"}}/></Icon>

            <Wrapper 
            onTouchStart={handleDrag} 
            onMouseDown={handleDrag} 
            onTouchMove={handleDragMove} 
            onTouchEnd={() => handleDragEnd()}
    
         
            slider={sliderPosition}
            dif={diference}
            animate={animate}
            >

                {newAnimes.map(item => (
                    <AnimeList key={item._id} value={item} position={sliderPosition}/>
                ))}
                
            </Wrapper>
        </Container>
    </MegaContainer>
  )
}

const MegaContainer = styled.div`
    /* padding: 0 10px; */
    margin-top: 83px;
    margin-bottom: 23px;
    @media (min-width: 700px) {
        display: none;
    }
`;

const HeadWrapper = styled.div`
    padding: 0 10px;
    border-left: 5px solid teal;
    margin-bottom: 5px;
    margin-left: 10px;
`;

const HeadTitle = styled.h1`
    color: #fff;
    font-size: 1.5rem;
    margin-left: 10px;
`;

const Container = styled.div`
    overflow: hidden;
    position: relative;
    margin: 0 10px;
`;

const Icon = styled.div`
    position: absolute;
    right: ${props => props.right && "0px"};
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    padding: 40px 3px;
    width: 30px;
    cursor: pointer;
    pointer-events: ${navigator.userAgentData.mobile ? 'none' : 'auto'};
`;


const Wrapper = styled.div.attrs(props => ({
    style: {
        transform:`translateX(calc(100% /  8 * -${props.slider} + ${props.dif}px))`,
    },
}))`
    display: flex;
    flex-wrap: nowrap;
    width: calc(100% / 3 * 8); 
    /* width: 100vw;
    max-width: 100%; */
    /* width: fit-content; */
    transition: ${props => props.animate ? `transform 0.1s linear` : `none`};
`;

export default Anime