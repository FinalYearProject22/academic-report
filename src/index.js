import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Navbar} from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';


ReactDOM.render(
  <div>
    <Navbar/>
    <Login/>
    <Footer/>
  </div>,
  document.getElementById('root')
);


