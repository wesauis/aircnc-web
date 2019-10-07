import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import api from '../../services/api';

interface ISpot {
  _id: string;
  thumbnail_url: string;
  company: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [spots, setSpots] = useState<ISpot[]>([]);

  useEffect(() => {
    (async () => {
      const user_id = localStorage.getItem('aircnc.user_id');
      const res = await api.get('/dashboard', {
        headers: { user_id },
      });
      setSpots(res.data);
    })();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{
                backgroundImage: `url(${process.env.REACT_APP_API_BASEURL}/${spot.thumbnail_url})`,
              }}
            />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar Novo Spot</button>
      </Link>
    </>
  );
};

export default Dashboard;
