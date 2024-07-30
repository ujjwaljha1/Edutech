// // import React, { useState, useEffect, useRef } from 'react';
// // import api from "../../api";
// // import config from "../../Config";

// // const ChatWindow = ({ chatId, userRole, userId, socket, onClose }) => {
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const messagesEndRef = useRef(null);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useEffect(() => {
// //     fetchMessages();

// //     socket.on('chat message', (message) => {
// //       setMessages((prevMessages) => [...prevMessages, message]);
// //     });

// //     return () => {
// //       socket.off('chat message');
// //     };
// //   }, [chatId, socket]);

// //   useEffect(scrollToBottom, [messages]);

// //   const fetchMessages = async () => {
// //     try {
// //       const response = await api.get(`${config.backendUrl}/api/chats/${chatId}/messages`);
// //       setMessages(response.data.messages);
// //     } catch (error) {
// //       console.error('Error fetching messages:', error);
// //     }
// //   };

// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //     if (newMessage.trim()) {
// //       socket.emit('chat message', { chatId, message: newMessage, userId, userRole });
// //       setNewMessage('');
// //     }
// //   };

// //   return (
// //     <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg">
// //       <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-lg">
// //         <h3>Chat</h3>
// //         <button onClick={onClose}>Close</button>
// //       </div>
// //       <div className="h-64 overflow-y-auto p-3">
// //         {messages.map((message, index) => (
// //           <div key={index} className={`mb-2 ${message.sender === userId ? 'text-right' : 'text-left'}`}>
// //             <span className={`inline-block rounded-lg px-3 py-2 ${message.sender === userId ? 'bg-blue-200' : 'bg-gray-200'}`}>
// //               {message.content}
// //             </span>
// //           </div>
// //         ))}
// //         <div ref={messagesEndRef} />
// //       </div>
// //       <form onSubmit={handleSendMessage} className="p-3">
// //         <input
// //           type="text"
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           className="w-full border rounded px-3 py-2"
// //           placeholder="Type a message..."
// //         />
// //         <button type="submit" className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded">Send</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ChatWindow;


// import React, { useState, useEffect, useRef } from 'react';
// import api from "../../api";
// import config from "../../Config";
// import { X, Send } from 'lucide-react';

// const emojis = ['😀', '😎', '🤓', '🧐', '🤠', '👽', '🐱', '🐶', '🦊', '🐼'];

// const ChatWindow = ({ chatId, userRole, userId, socket, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [userEmojis, setUserEmojis] = useState({});
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     fetchMessages();

//     socket.on('chat message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       if (!userEmojis[message.sender]) {
//         setUserEmojis((prevEmojis) => ({
//           ...prevEmojis,
//           [message.sender]: emojis[Math.floor(Math.random() * emojis.length)]
//         }));
//       }
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, [chatId, socket]);

//   useEffect(scrollToBottom, [messages]);

//   const fetchMessages = async () => {
//     try {
//       const response = await api.get(`${config.backendUrl}/api/chats/${chatId}/messages`);
//       setMessages(response.data.messages);
//       const newUserEmojis = {};
//       response.data.messages.forEach(message => {
//         if (!newUserEmojis[message.sender]) {
//           newUserEmojis[message.sender] = emojis[Math.floor(Math.random() * emojis.length)];
//         }
//       });
//       setUserEmojis(newUserEmojis);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       socket.emit('chat message', { chatId, message: newMessage, userId, userRole });
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
//       <div className="flex justify-between items-center p-3 bg-blue-600 text-white">
//         <h3 className="font-semibold">Chat</h3>
//         <button onClick={onClose} className="text-white hover:text-gray-200">
//           <X size={20} />
//         </button>
//       </div>
//       <div className="h-96 overflow-y-auto p-3 bg-gray-50">
//         {messages.map((message, index) => (
//           <div key={index} className={`flex ${message.sender === userId ? 'justify-end' : 'justify-start'} mb-2`}>
//             {message.sender !== userId && (
//               <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
//                 {userEmojis[message.sender]}
//               </div>
//             )}
//             <div className={`max-w-[70%] rounded-lg px-3 py-2 ${message.sender === userId ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'}`}>
//               {message.content}
//             </div>
//             {message.sender === userId && (
//               <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2">
//                 {userEmojis[userId]}
//               </div>
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSendMessage} className="p-3 bg-white border-t">
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Type a message..."
//           />
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
//             <Send size={20} />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatWindow;
import React, { useState, useEffect, useRef } from 'react';
import api from "../../api";
import config from "../../Config";
import { X, Send } from 'lucide-react';

const emojis = ['😀', '😎', '🤓', '🧐', '🤠', '👽', '🐱', '🐶', '🦊', '🐼'];

const ChatWindow = ({ chatId, userRole, userId, socket, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userEmojis, setUserEmojis] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (!userEmojis[message.sender]) {
        setUserEmojis((prevEmojis) => ({
          ...prevEmojis,
          [message.sender]: emojis[Math.floor(Math.random() * emojis.length)]
        }));
      }
    });

    return () => {
      socket.off('chat message');
    };
  }, [chatId, socket]);

  useEffect(scrollToBottom, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`${config.backendUrl}/api/chats/${chatId}/messages`);
      setMessages(response.data.messages);
      const newUserEmojis = {};
      response.data.messages.forEach(message => {
        const senderId = message.sender?._id || message.sender || 'unknown';
        if (!newUserEmojis[senderId]) {
          newUserEmojis[senderId] = emojis[Math.floor(Math.random() * emojis.length)];
        }
      });
      setUserEmojis(newUserEmojis);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('chat message', { chatId, message: newMessage, userId, userRole });
      setNewMessage('');
    }
  };

  const isCurrentUser = (senderId) => {
    return senderId === userId;
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-3 bg-blue-600 text-white">
        <h3 className="font-semibold">Chat</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
      <div className="h-96 overflow-y-auto p-3 bg-gray-50">
        {messages.map((message, index) => {
          const senderId = message.sender?._id || message.sender || 'unknown';
          return (
            <div key={index} className={`flex ${isCurrentUser(senderId) ? 'justify-end' : 'justify-start'} mb-2`}>
              {!isCurrentUser(senderId) && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                  {userEmojis[senderId] || '👤'}
                </div>
              )}
              <div className={`max-w-[70%] rounded-lg px-3 py-2 ${isCurrentUser(senderId) ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'}`}>
                {message.content}
              </div>
              {isCurrentUser(senderId) && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2">
                  {userEmojis[userId] || '👤'}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;