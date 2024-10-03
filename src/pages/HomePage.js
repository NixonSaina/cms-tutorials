// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    axios.get('/api/tutorials').then((response) => {
      setTutorials(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Programming Tutorials</h1>
      <ul>
        {tutorials.map((tutorial) => (
          <li key={tutorial._id}>
            <Link to={`/tutorial/${tutorial._id}`}>{tutorial.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
