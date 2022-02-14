import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Navbar} from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import {Login } from './components/Login/Login';
import { ProfileCard } from './components/ProfileCard/ProfileCard';
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import { Loadingscreen } from './components/Loadingscreen/Loadingscreen';
import { ProfileContent } from './components/ProfileContent/ProfileContent'

ReactDOM.render(
  <BrowserRouter basename='academic-report'>
    <Loadingscreen/>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/Profile" element={<><ProfileCard/> <ProfileContent/></>} />
      </Routes>
    <Footer/>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


