import React, { useState } from 'react';
import axios from 'axios';
import config from '../../Config';
import api from "../../api"
const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [usefulLinks, setUsefulLinks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`${config.backendUrl}/api/blogs`, {
        title,
        description,
        usefulLinks: usefulLinks.split(',').map(link => link.trim()),
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Blog post created successfully!');
      setTitle('');
      setDescription('');
      setUsefulLinks('');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description (HTML format)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="10"
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="usefulLinks" className="block mb-1">Useful Links (comma-separated)</label>
          <input
            type="text"
            id="usefulLinks"
            value={usefulLinks}
            onChange={(e) => setUsefulLinks(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default AddBlog;