
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../Config"

const LatestNote = () => {
  const [latestNote, setLatestNote] = useState('');

  useEffect(() => {
    const fetchLatestNote = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/notes/latest`);
        setLatestNote(response.data.content);
      } catch (error) {
        console.error('Error fetching latest note:', error);
      }
    };

    fetchLatestNote();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest Note</h2>
      <div dangerouslySetInnerHTML={{ __html: latestNote }} className="prose" />
    </div>
  );
};


export default LatestNote;