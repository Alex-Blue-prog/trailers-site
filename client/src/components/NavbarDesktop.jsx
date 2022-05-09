import styled from "styled-components";
import {Menu, Search, Close, Home, FiberNew, Star, MovieCreation, Favorite} from '@material-ui/icons'
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../config";

const NavbarDesktop = ({user, logout}) => {
    const [navOpen, setNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [animes, setAnimes] = useState([]);
    const [text, setText] = useState("");
    const location = useLocation().pathname; 

    useEffect(()=> {

        setNavOpen(false);
        setSearchOpen(false);
        setText("");
        setAnimes(prev => []);

    },[location]);

    //check if the search section is open and disable body scroll
    useEffect(()=> {
        if(searchOpen){
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    },[searchOpen]);


    const searchAnime = async (e) => {   
        
        if(e.target.value.length > 1) {
            setSearchOpen(true);
        } else {
            setSearchOpen(false);
        }

        setTimeout(async () => {
      

            let res;

            

            if(e.target.value === "" || e.target.value.length <= 1) {
                setAnimes(prev => []);
    
                return;
            }

            res = await axiosInstance.post("anime/search",  {text: e.target.value});


            setAnimes(res.data);
        }, 2000);
        
        

        

       
        
    }

  return (
    <>
    <BlackScreen navOpen={navOpen} onClick={() => setNavOpen(false)}></BlackScreen>

    <Nav>
        <Bar>
            <Icon onClick={()=>{ setNavOpen(!navOpen); setSearchOpen(false)}}>
                {!navOpen ? <Menu style={{fontSize: "1.5rem"}}/> : <Close style={{fontSize: "1.5rem"}}/>} 
            </Icon>
            <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
                <Logo>Trailers<span style={{color: "#fff"}}>on</span></Logo>
            </Link>
            {/* <Icon onClick={()=> {setSearchOpen(!searchOpen); setNavOpen(false)}}>
                <Search style={{fontSize: "1.8rem"}} />
            </Icon> */}

            <SearchBar>
                <SearchText type="text" placeholder="Digite o nome aqui..." color="#fff" onChange={(e)=> {setText(e.target.value); searchAnime(e);}} value={text} />
                <SearchBtn>
                    <Search style={{fontSize: "1.5rem"}} />
                </SearchBtn>
            </SearchBar>
           
        </Bar>
        <NavList nav={navOpen}>
            <Link to="/" style={{color: "inherit", textDecoration:"none"}} onClick={()=> setNavOpen(false)}>
            <NavListItem><NavIcon><Home style={{fontSize: "1.2rem"}}/></NavIcon> Inicio</NavListItem>
            </Link>
            <Link to="/newanimes" style={{color: "inherit", textDecoration:"none"}} onClick={()=> setNavOpen(false)}>
            <NavListItem><NavIcon><FiberNew style={{fontSize: "1.2rem"}}/></NavIcon>Novos</NavListItem>
            </Link>
            <Link to="/popularanimes" style={{color: "inherit", textDecoration:"none"}} onClick={()=> setNavOpen(false)}>
            <NavListItem><NavIcon><Star style={{fontSize: "1.2rem"}}/></NavIcon>Populares</NavListItem>
            </Link>
            {user && <>
            <Link to="/favorites" style={{color: "inherit", textDecoration:"none"}} onClick={()=> setNavOpen(false)}>
            <NavListItem><NavIcon><Favorite style={{fontSize: "1.5rem"}}/></NavIcon>Favoritos</NavListItem>
            </Link>
            <UserInfo>
                <UserName>usuário: <small style={{textDecoration: "underline", marginLeft: "5px"}}> {user.username} </small></UserName>
                <UserName>email: <small style={{textDecoration: "underline", marginLeft: "5px"}}> {user.email} </small></UserName>
            </UserInfo>
            </>
            }

            {!user ?
                <AuthContainer>
                    <Link to="/login" style={{color: "inherit", textDecoration:"none"}} onClick={()=> setNavOpen(false)}>
                    <LoginBtn> <p> login  </p></LoginBtn>
                    </Link>
                    <Link to="/register" style={{color: "inherit", textDecoration:"none"}} onClick={()=> setNavOpen(false)}>
                    <RegisterBtn><p> registrar </p></RegisterBtn>
                    </Link>
                </AuthContainer>
            :
                <AuthContainer>
                    <LoginBtn onClick={logout}> <p style={{letterSpacing: "2px"}}> Sair </p></LoginBtn>
                </AuthContainer>
            }
        </NavList>
        <SearchList search={searchOpen}>
            {
                animes.length == [] && text.length > 1 &&

                <NoAnimeContainer>
                    <NoAnimeMsg>nenhum item foi encontrado</NoAnimeMsg>
                </NoAnimeContainer>
    
            }



            <AnimesWrapper>
                {animes?.map(value => (

                        <AnimeItem key={value._id} >
                             <Link to={"/eps/" + value._id} key={value._id} onClick={()=> {setSearchOpen(false); setText(""); setAnimes(prev => [])}} style={{textDecoration: "none", color: "inherit"}}>
                                <Anime key={value._id} >
                                    <AnimeImg>
                                        <Img src={value.img} />
                                    </AnimeImg>
                                    <AnimeInfo>
                                        <AnimeInfoText><big>{value.name}</big></AnimeInfoText>
                                        <AnimeInfoText><b> Video: </b>{value.dub ? "Dublado" : "Lengendado"}</AnimeInfoText>
                                        <AnimeInfoText><b>Lançamento: </b>{value.launch}</AnimeInfoText>
                                        <AnimeInfoText><b>Total: </b>{value.episodes.length}</AnimeInfoText>
                                    </AnimeInfo>
                                </Anime>
                            </Link>
                        </AnimeItem>
                
                ))
                }
            </AnimesWrapper>
        </SearchList>
       
    </Nav>
    </>
  )
}

const BlackScreen = styled.div`
    display: none;
    background-color: #00000080;
    position: fixed;
    top: 53px;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 50;
    transition: opacity 0.1s linear;
    opacity: ${props => props.navOpen ? 1 : 0};

    @media (min-width: 700px) {
        display: ${props => props.navOpen ? "block" : "none"};
    }
`;

const NoAnimeContainer = styled.div`
    width: calc(100% - 40px);
    margin-top: 20%;
`;

const NoAnimeMsg = styled.div`
    color: #fff;
    text-align: center;
    font-size: 1.2rem;
`;


const Nav = styled.div`
    display: none;
    margin: 0;
    padding: 0;
    height: 53px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    @media (min-width: 700px) {
        display: block;
    }
`;

const Bar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    background-color: #111;
    z-index: 100;

`;

const Icon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    color: teal;
`;

const Logo = styled.h1`
    color: teal;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const NavList = styled.ul`
    height: calc(100vh - 53px);
    width: 300px;
    background: linear-gradient(to bottom, teal, #111);
    margin: 0;
    padding: 0;
    transform:  ${props => props.nav ? `translateX(0)` : `translateX(-100%)`} ;
    z-index: 100;
    position: fixed;
    top: 53px;
    left: 0%;
    transition: transform 0.1s linear;
`;

const NavListItem = styled.li`
    list-style: none;
    color: #fff;
    display: flex;
    align-items: center;
    line-height: 60px;
    font-size: 1.2rem;
    cursor: pointer;
`;

const NavIcon = styled.div`
    display: flex;
    align-items: center;
    margin: 0 15px;
    
`;


const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    width: calc(100% - 30px);
    position: absolute;
    left: 0;
    bottom: 15px;
`;
const RegisterBtn = styled.div`
    color: teal;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
    padding: 5px 0;
    font-size: 1.2rem;
    text-transform: capitalize;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 15px;
`;

const LoginBtn = styled.div`
    color: #fff;
    background-color: teal;
    cursor: pointer;
    text-align: center;
    padding: 5px 0;
    font-size: 1.2rem;
    text-transform: capitalize;
    border-radius: 5px;
    font-weight: 500;
    
`;

const UserInfo = styled.div`
    
    padding: 15px 15px;
`;

const UserName = styled.p`
    font-size: 1.1rem;
    font-weight: 400;
    color: #ffffffc1;
    margin-bottom: 5px;
`;



// search style
const SearchList = styled.div`
    height: calc(100vh - 53px);
    overflow-y: auto;
    width: 100vw;
    background-color: #111;
    margin: 0;
    padding: 0;
    transform: ${props => props.search ? `translateY(0)` : `translateY(-100%)`} ;
    z-index: -5;
    position: fixed;
    top: 53px;
    left: 0;
    opacity: ${props => props.search ? "1" : "0"};
    transition: opacity 0.1s linear;
    /* padding: 0 10px; */
`;

const SearchBar = styled.div`

    height: 30px;
    width: 200px;
    padding: 5px;
    background-color: teal;
    border-radius: 50px;
    display: flex;
    margin-right: 10px;
`;

const SearchText = styled.input`
    height: 100%;
    width: calc(100% - 30px);
    font-size: 1rem;
    padding: 0px 10px;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
        color: #ffffffd1;
    }
`;

const SearchBtn = styled.div`
    
    color: teal;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    
`;

const AnimesWrapper = styled.div`
    margin-top: 10px;
    width: calc(100vw - 20px) ;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
`;

const AnimeItem = styled.div`
    width: calc(33.33% - 20px);
    padding: 0 10px;
    height: 183px;
    margin-bottom: 10px;
`;

const Anime = styled.div`
    background-color: #333;
    color: white;
    display: flex;
    /* align-items: center; */
    margin-bottom: 10px;
    border-radius: 10px;
`;

const AnimeInfo = styled.div`
    width: 50%;
    /* padding: 0 50px; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 25px;
    color: #fff;
`;

const AnimeInfoText = styled.p`

    font-size: 0.8rem;

    &:first-child {
        color: teal;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
    }
`;

const AnimeImg = styled.div`
    width: 50%;
    height: 183px;
`;

const Img = styled.div`
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;


export default NavbarDesktop