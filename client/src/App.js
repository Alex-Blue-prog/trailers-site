import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import EpsList from './pages/EpsList';
import Ep from './pages/Ep';
import NewAnimes from './pages/NewAnimes';
import PopularAnimes from './pages/PopularAnimes';
import Favorites from './pages/Favorites';
import NavbarDesktop from './components/NavbarDesktop';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';


function App() {
  //user section --
  const [user, setUser] = useState(null);

  //check if the user is alrealdy loged in
  useEffect(() => {
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(null);
    }
  },[]);

  //log-in the user
  const loginUser = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  //logout the user
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  } 
  //changeFavorite
  const changeFavorite = async (favorite, id) => {
    //push to favorites or remove
    if(favorite == false) {
      let getuser = JSON.parse(localStorage.getItem("user"));

      getuser.favorites.push(id);

      localStorage.setItem("user", JSON.stringify(getuser));

      setUser(getuser);


    } else {
      let getuser = JSON.parse(localStorage.getItem("user"));

      let getItemPosition = getuser.favorites.findIndex((value) => value == id )

      getuser.favorites.splice(getItemPosition, 1);

      localStorage.setItem("user", JSON.stringify(getuser));
      setUser(getuser);
    }

    //change in the server too
    await axios.put(`${process.env.REACT_APP_SERVER_URL}user/favorites/${id}`, {favorite: favorite}, {headers: {
        token: "Bearer " + user.accessToken
      }
    });

  }

  //loading section --
  const [isFetching, setIsFetching] = useState(true);

  const checkFetching = (value) => {
    setIsFetching(value);
  }

  return (
  
      <Router>
        <Navbar user={user} logout={logout}/>
        <NavbarDesktop />
        <Routes>
          <Route path='/' element={<Home checkFetching={checkFetching} isFetching={isFetching}/>} />
          <Route path='/eps/:id' element={<EpsList user={user} changeFavorite={changeFavorite} checkFetching={checkFetching} isFetching={isFetching} />} />
          <Route path='/ep/:id' element={<Ep checkFetching={checkFetching} isFetching={isFetching} />} />
          <Route path='/newanimes' element={<NewAnimes checkFetching={checkFetching} isFetching={isFetching} />} />
          <Route path='/popularanimes' element={<PopularAnimes checkFetching={checkFetching} isFetching={isFetching} />} />
          <Route path='/login' element={<Login loginUser={loginUser} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/favorites' element={<Favorites checkFetching={checkFetching} isFetching={isFetching} />} />
        </Routes>

      </Router>

  );
}

export default App;
