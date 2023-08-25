import React, { useState, useEffect } from "react";
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onChildAdded, serverTimestamp, push } from 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration
};

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  //   useEffect(() => {
  //     const messagesRef = ref(database, 'messages');
  //     onChildAdded(messagesRef, (snapshot) => {
  //       const message = snapshot.val();
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     });

  //   }, []);
  //   const sendMessage = () => {
  //     if (newMessage.trim() !== '') {
  //       const messagesRef = ref(database, 'messages');
  //       push(messagesRef, {
  //         text: newMessage,
  //         timestamp: serverTimestamp(),
  //       });
  //       setNewMessage('');
  //     }
  //   };

  return (
    <div className="flex flex-col min-h-[calc(100vh-70px)] ">
      <div className="bg-blue-500 text-white p-4">Chat Room</div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? "self-start" : "self-end"
              } bg-blue-100 text-blue-800 p-2 rounded-lg`}
            >
              {/* {message.text} */}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-100 p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full border rounded-lg px-2 py-1 focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg"
          //   onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
