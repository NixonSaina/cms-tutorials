// src/pages/EditorPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

function EditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post('/api/tutorials', { title, content })
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Create or Edit Tutorial</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default EditorPage;
