import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Navbar} from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';


ReactDOM.render(
  <div>
    <Navbar/>
    <Footer/>
  </div>,
  document.getElementById('root')
);


