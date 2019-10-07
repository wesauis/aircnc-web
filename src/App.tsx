import React, { useState } from 'react';
import logo from './assets/logo.svg';
import './App.css';

import api from './services/api';

const App: React.FC = () => {
  const [email, setEmail] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await api.post('/sessions', { email });
    const { id } = res.data;

    localStorage.setItem('aircnc.user_id', id);
  }

  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre{' '}
          <strong>talentos</strong> para sua empresa'
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input
            type="email"
            id="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <button className="btn" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
