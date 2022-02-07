import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, Navbar} from './components/Navbar/Navbar';


ReactDOM.render(
  <div>
    <Navbar />
    <App />
  </div>,
  document.getElementById('root')
);


