import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';

import Cell from '../components/Alumni/Cell';

const Alumni = () => {
  const [alumni, setAlumni] = useState([]);
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
        };
        const data = await axios.get('http://localhost:4000/alumni', { headers });
        setAlumni(data.data.data);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      }
    };
    fetchAlumni();
  }, []);
  return (
    <Main
      title="Alumni"
      description="A glance at the Alumni who had worked with Prof. Dr. Bagesh Kumar"
    >
      <article className="post" id="Alumni">
        <header>
          <div className="title">
            <h2><Link to="/alumni">Meet the Alumnus</Link></h2>
          </div>
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {alumni ? alumni.map((photo) => (
            <Cell
              data={photo}
              key={photo.cap}

            />
          )) : <></>}
        </div>
      </article>
    </Main>
  );
};

export default Alumni;
