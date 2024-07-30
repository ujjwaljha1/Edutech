// // client/src/PaidCategoryContent.js

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import api from './api';
// import config from './Config';

// const PaidCategoryContent = () => {
//   const [category, setCategory] = useState(null);
//   const [content, setContent] = useState([]);
//   const { membershipType } = useParams();

//   useEffect(() => {
//     const fetchCategoryAndContent = async () => {
//       try {
//         // Fetch the category details
//         const categoryResponse = await api.get(`${config.backendUrl}/api/premium-categories/${membershipType}`);
//         setCategory(categoryResponse.data);

//         // Fetch the content for this category
//         const contentResponse = await api.get(`${config.backendUrl}/api/premium-content/${membershipType}`);
//         setContent(contentResponse.data);
//       } catch (error) {
//         console.error('Error fetching paid category content:', error);
//       }
//     };

//     fetchCategoryAndContent();
//   }, [membershipType]);

//   if (!category) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">{category.title} Content</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {content.map((item) => (
//           <div key={item._id} className="bg-white shadow-lg rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
//             <p className="text-gray-600 mb-4">{item.description}</p>
//             <Link
//               to={`/premium-content/${item._id}`}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               View Content
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Book, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import config from "./Config";

const PaidCategoriesContent = ({ userMembershipType }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/api/premium-categories?membershipType=${userMembershipType}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (userMembershipType) {
      fetchCategories();
    } else {
      setError("No active membership found.");
      setLoading(false);
    }
  }, [userMembershipType]);  
  
  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/premium-content/${categoryId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Premium Categories ({userMembershipType})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category._id} 
            className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <CardActionArea>
              {category.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.title}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="flex items-center justify-between">
                  {category.title}
                  {category.type === 'notes' ? (
                    <Book className="h-6 w-6" />
                  ) : (
                    <PenTool className="h-6 w-6" />
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" className="mt-2 block">
                  Type: {category.type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaidCategoriesContent;