import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

const Login: React.FC<RouteComponentProps> = props => {
  const [email, setEmail] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const req = { email: email.trim() };

    if (!req.email) return;

    const res = await api.post('/sessions', req);
    const { _id } = res.data;

    if (!_id) return;

    localStorage.setItem('aircnc.user_id', _id);
    props.history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{' '}
        <strong>talentos</strong> para sua empresa
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
