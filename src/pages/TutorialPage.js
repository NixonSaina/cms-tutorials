// src/pages/TutorialPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function TutorialPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    axios.get(`/api/tutorials/${id}`).then((response) => {
      setTutorial(response.data);
    });
  }, [id]);

  return (
    <div>
      {tutorial && (
        <>
          <h1>{tutorial.title}</h1>
          <ReactMarkdown>{tutorial.content}</ReactMarkdown>
        </>
      )}
    </div>
  );
}

export default TutorialPage;
