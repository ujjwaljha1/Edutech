// // // client/src/components/Chat/ChatList.js
// // import React from 'react';
// // import config from "../../Config"

// // const ChatList = ({ chats, onChatSelect, userRole }) => {
// //   return (
// //     <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
// //       <h2 className="text-xl font-bold mb-4">Chats</h2>
// //       {chats.map((chat) => (
// //         <div 
// //           key={chat._id} 
// //           className="border-b py-2 cursor-pointer hover:bg-gray-100"
// //           onClick={() => onChatSelect(chat._id)}
// //         >
// //           <p className="font-semibold">
// //             {userRole === 'admin' || userRole === 'ceo' ? chat.user.name : 'Support'}
// //           </p>
// //           <p className="text-sm text-gray-600">
// //             {chat.messages[chat.messages.length - 1].content.substring(0, 50)}...
// //           </p>
// //           <p className="text-xs text-gray-400">
// //             {new Date(chat.createdAt).toLocaleString()}
// //           </p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default ChatList;

// import React from 'react';

// const ChatList = ({ chats, onChatSelect, userRole }) => {
//   if (!Array.isArray(chats)) {
//     return <div>Error loading chats</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
//       <h2 className="text-xl font-bold mb-4">Chats</h2>
//       {chats.map((chat) => (
//         <div 
//           key={chat._id} 
//           className="border-b py-2 cursor-pointer hover:bg-gray-100"
//           onClick={() => onChatSelect(chat._id)}
//         >
//           <p className="font-semibold">
//             {userRole === 'admin' || userRole === 'ceo' ? chat.user.name : 'Support'}
//           </p>
//           <p className="text-sm text-gray-600">
//             {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content.substring(0, 50) : 'No messages yet...'}
//           </p>
//           <p className="text-xs text-gray-400">
//             {new Date(chat.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatList;
import React from 'react';

const ChatList = ({ chats, onChatSelect, userRole }) => {
  if (!Array.isArray(chats)) {
    return <div>Error loading chats</div>;
  }

  return (
    <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg overflow-y-auto max-h-96">
      <h2 className="text-xl font-bold p-4 bg-blue-500 text-white">Chats</h2>
      {chats.map((chat) => (
        <div 
          key={chat._id} 
          className="border-b p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => onChatSelect(chat._id)}
        >
          <p className="font-semibold">
            {chat.user && chat.user.name ? chat.user.name : 'Unknown User'}
          </p>
          <p className="text-sm text-gray-600">
            {chat.messages && chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1].content.substring(0, 50)
              : 'No messages yet...'}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(chat.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;