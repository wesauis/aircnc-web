import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

const Login: React.FC<RouteComponentProps> = props => {
  const [email, setEmail] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await api.post('/sessions', { email });
    const { id } = res.data;

    localStorage.setItem('aircnc.user_id', id);

    props.history.push('/dashboard');
  }

  return (
    <>
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
    </>
  );
};

export default Login;
