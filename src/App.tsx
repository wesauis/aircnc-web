import React from 'react';
import './App.css';

import logo from './assets/logo.svg';

const App: React.FC = () => {
  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre{' '}
          <strong>talentos</strong> para sua empresa
        </p>
        <form>
          <label htmlFor="email">E-MAIL *</label>
        </form>
        <input type="email" id="email" placeholder="Seu melhor e-mail" />
      </div>
    </div>
  );
};

export default App;
