import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import EpsList from './pages/EpsList';
import Ep from './pages/Ep';
import NewAnimes from './pages/NewAnimes';
import PopularAnimes from './pages/PopularAnimes';
import NavbarDesktop from './components/NavbarDesktop';
import { useState } from 'react';
import Loading from './components/Loading';


function App() {
  const [isFetching, setIsFetching] = useState(true);

  const checkFetching = (value) => {
    setIsFetching(value);
  }

  return (
  
      <Router>
        <Navbar />
        <NavbarDesktop />
        <Routes>
          <Route path='/' element={<Home checkFetching={checkFetching} isFetching={isFetching}/>} />
          <Route path='/eps/:id' element={<EpsList checkFetching={checkFetching} isFetching={isFetching} />} />
          <Route path='/ep/:id' element={<Ep checkFetching={checkFetching} isFetching={isFetching} />} />
          <Route path='/newanimes' element={<NewAnimes checkFetching={checkFetching} isFetching={isFetching} />} />
          <Route path='/popularanimes' element={<PopularAnimes checkFetching={checkFetching} isFetching={isFetching} />} />
        </Routes>

      </Router>

  );
}

export default App;
