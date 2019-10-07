import React from 'react';
import logo from './assets/logo.svg';
import './App.css';

import Routes from './Routes';

const App: React.FC = () => {
  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="content">
        <Routes />
      </div>
    </div>
  );
};

export default App;
