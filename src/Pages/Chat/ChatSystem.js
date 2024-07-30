// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { FaComments } from 'react-icons/fa';
// // import io from 'socket.io-client';
// // import ChatWindow from './ChatWindow';
// // import ChatList from './ChatList';
// // import config from "../../Config";
// // import api from "../../api";

// // const socket = io(config.backendUrl);

// // const ChatSystem = ({ userRole, userId }) => {
// //   const [showChat, setShowChat] = useState(false);
// //   const [activeChat, setActiveChat] = useState(null);
// //   const [chats, setChats] = useState([]);

// //   useEffect(() => {
// //     if (userRole === 'admin' || userRole === 'ceo') {
// //       fetchAllChats();
// //     } else {
// //       fetchUserChats();
// //     }

// //     socket.on('chat message', (message) => {
// //       setChats((prevChats) => {
// //         const updatedChats = prevChats.map((chat) => {
// //           if (chat._id === message.chatId) {
// //             return { ...chat, messages: [...chat.messages, message] };
// //           }
// //           return chat;
// //         });
// //         return updatedChats;
// //       });
// //     });

// //     return () => {
// //       socket.off('chat message');
// //     };
// //   }, [userRole, userId]);

// //   const fetchAllChats = async () => {
// //     try {
// //       const response = await api.get(`${config.backendUrl}/api/chats`);
// //       setChats(response.data.chats);
// //     } catch (error) {
// //       console.error('Error fetching all chats:', error);
// //     }
// //   };

// //   const fetchUserChats = async () => {
// //     try {
// //       const response = await api.get(`${config.backendUrl}/api/chats/user`);
// //       setChats(response.data.chats);
// //     } catch (error) {
// //       console.error('Error fetching user chats:', error);
// //     }
// //   };

// //   const handleChatIconClick = async () => {
// //     if (userRole === 'admin' || userRole === 'ceo') {
// //       setShowChat(true);
// //     } else {
// //       try {
// //         let chat;
// //         if (chats.length > 0) {
// //           chat = chats[0]; // Use the existing chat
// //         } else {
// //           const response = await api.post(`${config.backendUrl}/api/chats`, {
// //             message: 'Chat started'
// //           });
// //           if (response.data.success) {
// //             chat = response.data.chat;
// //             setChats([chat]);
// //           } else {
// //             console.error('Failed to create chat:', response.data.message);
// //             return;
// //           }
// //         }
// //         setActiveChat(chat._id);
// //         setShowChat(true);
// //         socket.emit('join chat', chat._id);
// //       } catch (error) {
// //         console.error('Error creating new chat:', error);
// //       }
// //     }
// //   };

// //   const handleChatSelect = (chatId) => {
// //     setActiveChat(chatId);
// //     socket.emit('join chat', chatId);
// //   };

// //   return (
// //     <>
// //       <motion.div
// //         initial={{ opacity: 0, y: 50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="fixed bottom-5 right-5"
// //       >
// //         <button
// //           onClick={handleChatIconClick}
// //           className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
// //         >
// //           <FaComments size={24} />
// //         </button>
// //       </motion.div>
// //       {showChat && (userRole === 'admin' || userRole === 'ceo') && (
// //         <ChatList 
// //           chats={chats} 
// //           onChatSelect={handleChatSelect} 
// //           userRole={userRole}
// //         />
// //       )}
// //       {showChat && activeChat && (
// //         <ChatWindow 
// //           chatId={activeChat} 
// //           userRole={userRole}
// //           userId={userId}
// //           socket={socket}
// //           onClose={() => {
// //             setShowChat(false);
// //             setActiveChat(null);
// //             socket.emit('leave chat', activeChat);
// //           }}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default ChatSystem;

// import React, { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { FaComments } from 'react-icons/fa';
// import io from 'socket.io-client';
// import ChatWindow from './ChatWindow';
// import ChatList from './ChatList';
// import config from "../../Config";
// import api from "../../api";

// const socket = io(config.backendUrl);

// const ChatSystem = ({ userRole, userId }) => {
//   const [showChat, setShowChat] = useState(false);
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);

//   const fetchChats = useCallback(async () => {
//     try {
//       const response = await api.get(`${config.backendUrl}/api/chats${userRole === 'admin' || userRole === 'ceo' ? '' : '/user'}`);
//       setChats(response.data.chats);
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//     }
//   }, [userRole]);

//   useEffect(() => {
//     fetchChats();

//     socket.on('chat message', (message) => {
//       setChats((prevChats) => {
//         const updatedChats = prevChats.map((chat) => {
//           if (chat._id === message.chatId) {
//             return { ...chat, messages: [...(chat.messages || []), message] };
//           }
//           return chat;
//         });
//         return updatedChats;
//       });
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, [fetchChats]);

//   const handleChatIconClick = async () => {
//     if (showChat) {
//       setShowChat(false);
//       setActiveChat(null);
//       if (activeChat) {
//         socket.emit('leave chat', activeChat);
//       }
//     } else {
//       if (userRole === 'admin' || userRole === 'ceo') {
//         setShowChat(true);
//       } else {
//         try {
//           let chat;
//           if (chats.length > 0) {
//             chat = chats[0];
//           } else {
//             const response = await api.post(`${config.backendUrl}/api/chats`, {
//               message: 'Chat started'
//             });
//             if (response.data.success) {
//               chat = response.data.chat;
//               setChats([chat]);
//             } else {
//               console.error('Failed to create chat:', response.data.message);
//               return;
//             }
//           }
//           setActiveChat(chat._id);
//           setShowChat(true);
//           socket.emit('join chat', chat._id);
//         } catch (error) {
//           console.error('Error creating new chat:', error);
//         }
//       }
//     }
//   };

//   const handleChatSelect = (chatId) => {
//     setActiveChat(chatId);
//     socket.emit('join chat', chatId);
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="fixed bottom-5 right-5"
//       >
//         <button
//           onClick={handleChatIconClick}
//           className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
//         >
//           <FaComments size={24} />
//         </button>
//       </motion.div>
//       {showChat && (userRole === 'admin' || userRole === 'ceo') && (
//         <ChatList 
//           chats={chats} 
//           onChatSelect={handleChatSelect} 
//           userRole={userRole}
//         />
//       )}
//       {showChat && activeChat && (
//         <ChatWindow 
//           chatId={activeChat} 
//           userRole={userRole}
//           userId={userId}
//           socket={socket}
//           onClose={() => {
//             setShowChat(false);
//             setActiveChat(null);
//             socket.emit('leave chat', activeChat);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default ChatSystem;
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import config from "../../Config";
import api from "../../api";

const socket = io(config.backendUrl);

const ChatSystem = ({ userRole, userId }) => {
  const [showChat, setShowChat] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchChats = useCallback(async () => {
    try {
      const response = await api.get(`${config.backendUrl}/api/chats${userRole === 'admin' || userRole === 'ceo' ? '' : '/user'}`);
      setChats(response.data.chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  }, [userRole]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchChats();

      socket.on('chat message', (message) => {
        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) => {
            if (chat._id === message.chatId) {
              return { ...chat, messages: [...(chat.messages || []), message] };
            }
            return chat;
          });
          return updatedChats;
        });
      });

      return () => {
        socket.off('chat message');
      };
    } else {
      setIsLoggedIn(false);
    }
  }, [userId, fetchChats]);

  const handleChatIconClick = async () => {
    if (showChat) {
      setShowChat(false);
      setActiveChat(null);
      if (activeChat) {
        socket.emit('leave chat', activeChat);
      }
    } else {
      if (userRole === 'admin' || userRole === 'ceo') {
        setShowChat(true);
      } else {
        try {
          let chat;
          if (chats.length > 0) {
            chat = chats[0];
          } else {
            const response = await api.post(`${config.backendUrl}/api/chats`, {
              message: 'Chat started'
            });
            if (response.data.success) {
              chat = response.data.chat;
              setChats([chat]);
            } else {
              console.error('Failed to create chat:', response.data.message);
              return;
            }
          }
          setActiveChat(chat._id);
          setShowChat(true);
          socket.emit('join chat', chat._id);
        } catch (error) {
          console.error('Error creating new chat:', error);
        }
      }
    }
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    socket.emit('join chat', chatId);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-5 right-5 z-50"
      >
        <button
          onClick={handleChatIconClick}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <FaComments size={24} />
        </button>
      </motion.div>
      {showChat && (userRole === 'admin' || userRole === 'ceo') && (
        <ChatList 
          chats={chats} 
          onChatSelect={handleChatSelect} 
          userRole={userRole}
        />
      )}
      {showChat && activeChat && (
        <ChatWindow 
          chatId={activeChat} 
          userRole={userRole}
          userId={userId}
          socket={socket}
          onClose={() => {
            setShowChat(false);
            setActiveChat(null);
            socket.emit('leave chat', activeChat);
          }}
        />
      )}
    </>
  );
};

export default ChatSystem;