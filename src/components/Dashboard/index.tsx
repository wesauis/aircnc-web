import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import './styles.css';

import api from '../../services/api';
import { request } from 'https';

interface ISpot {
  _id: string;
  thumbnail_url: string;
  company: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [spots, setSpots] = useState<ISpot[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  const user_id = localStorage.getItem('aircnc.user_id');
  const socket = useMemo(
    () =>
      socketio(String(process.env.REACT_APP_API_BASEURL), {
        query: { user_id },
      }),
    [user_id],
  );

  useEffect(() => {
    socket.on('booking_request', (data: any) => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    (async () => {
      const user_id = localStorage.getItem('aircnc.user_id');
      const res = await api.get('/dashboard', {
        headers: { user_id },
      });
      setSpots(res.data);
    })();
  }, []);

  async function handleSolicitation(id: number, approved: boolean) {
    if (approved) await api.post(`/bookings/${id}/approvals`);
    else await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(req => req._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map((req: any) => (
          <li key={req._id}>
            <p>
              <strong>{req.user.email}</strong> está solicitando uma reserva em{' '}
              <strong>{req.spot.company}</strong> para a data{' '}
              <strong>{req.date}</strong>
            </p>
            <button
              className="accept"
              onClick={() => handleSolicitation(req._id, true)}
            >
              ACEITAR
            </button>
            <button
              className="reject"
              onClick={() => handleSolicitation(req._id, false)}
            >
              REGEITAR
            </button>
          </li>
        ))}
      </ul>

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
