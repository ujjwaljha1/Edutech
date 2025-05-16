import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "../../Config"
import api from "../../api"

const NoteInput = () => {
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.backendUrl}/api/notes`, { content: note });
      setNote('');
      navigate('/latest');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
          Add Note (HTML format)
        </label>
        <textarea
          id="note"
          name="note"
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteInput;
