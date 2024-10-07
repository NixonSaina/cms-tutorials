// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from '../api';  // Import axios with the configured baseURL

function HomePage() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    // This will hit 'http://localhost:5000/api/tutorials'
    axios.get('/api/tutorials')
      .then((response) => setTutorials(response.data))
      .catch((error) => console.error('Error fetching tutorials', error));
  }, []);

  return (
    <div>
      <h1>Programming Tutorials</h1>
      <ul>
        {tutorials.map((tutorial) => (
          <li key={tutorial._id}>{tutorial.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
