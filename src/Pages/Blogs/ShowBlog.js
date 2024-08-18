import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../Config';
import api from "../../api"

const ShowBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchBlogs();
    fetchUser();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get(`${config.backendUrl}/api/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get(`${config.backendUrl}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  };

  const handleLike = async (blogId) => {
    if (!user) {
      alert('Please log in to like blogs');
      return;
    }

    try {
      const response = await api.post(
        `${config.backendUrl}/api/blogs/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setBlogs(blogs.map(blog => 
        blog._id === blogId 
          ? { ...blog, likes: response.data.likes, likeCount: response.data.likeCount } 
          : blog
      ));

      if (selectedBlog && selectedBlog._id === blogId) {
        setSelectedBlog({
          ...selectedBlog,
          likes: response.data.likes,
          likeCount: response.data.likeCount
        });
      }
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left container */}
      <div className="w-full md:w-1/3 p-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
        <ul className="space-y-2">
          {blogs.map((blog) => (
            <li 
              key={blog._id} 
              className="cursor-pointer hover:bg-gray-200 p-2 rounded flex justify-between items-center"
              onClick={() => setSelectedBlog(blog)}
            >
              <span>{blog.title}</span>
              <span className="text-sm text-gray-500">Likes: {blog.likeCount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right container */}
      <div className="w-full md:w-2/3 p-4">
        {selectedBlog ? (
          <div>
            <h2 className="text-3xl font-bold mb-4">{selectedBlog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: selectedBlog.description }} className="prose max-w-none"></div>
            {selectedBlog.usefulLinks && selectedBlog.usefulLinks.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Useful Links:</h3>
                <ul className="list-disc pl-5">
                  {selectedBlog.usefulLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 flex items-center">
              <button 
                onClick={() => handleLike(selectedBlog._id)}
                className={`px-4 py-2 rounded ${
                  user && selectedBlog.likes.includes(user._id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {user && selectedBlog.likes.includes(user._id) ? 'Unlike' : 'Like'}
              </button>
              <span className="ml-2">Likes: {selectedBlog.likeCount}</span>
            </div>
          </div>
        ) : (
          <p className="text-xl text-center mt-8">Select a blog post to view its content.</p>
        )}
      </div>
    </div>
  );
};

export default ShowBlog;