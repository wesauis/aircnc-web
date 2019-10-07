import React, { useState, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import camera from '../../assets/camera.svg';
import './styles.css';

import api from '../../services/api';

const New: React.FC<RouteComponentProps> = props => {
  const [thumbnail, setThumbnail] = useState<Blob | null>();
  const [company, setCompany] = useState<string>('');
  const [techs, setTechs] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const preview = useMemo(
    () => (thumbnail ? URL.createObjectURL(thumbnail) : null),
    [thumbnail],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user_id = localStorage.getItem('aircnc.user_id');
    if (!(thumbnail && company && techs && user_id)) return;

    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id },
    });

    props.history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input
          type="file"
          onChange={event => {
            const files: FileList | null = event.target.files;
            if (files) setThumbnail(files[0]);
          }}
        />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrivel"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por virgula)</span>
      </label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">
        VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
};

export default New;
