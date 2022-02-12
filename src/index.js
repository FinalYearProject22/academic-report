import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Navbar} from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import {Login } from './components/Login/Login';
import { BrowserRouter , Route , Routes} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename='academic-report'>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Login/>} />
      </Routes>
    <Footer/>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


