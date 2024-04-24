import React, { useState, useEffect } from 'react';

function App() {
  const [echoedMessage, setEchoedMessage] = useState('');

  useEffect(() => {
    const fetchEchoedMessage = async () => {
      try {
        const response = await fetch('http://localhost:8080/getEchoedMessage');
        const data = await response.text();
        setEchoedMessage(data);
      } catch (error) {
        console.error('Error fetching echoed message:', error);
      }
    };

    const intervalId = setInterval(fetchEchoedMessage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const setMessageOnBackend = async (message) => {
    try {
      const response = await fetch('http://localhost:8080/setMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error setting message:', error);
    }
  };

  return (
    <div>
      <h1>Echoed Message: {echoedMessage}</h1>
      <input
        type="text"
        placeholder="Enter message"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setMessageOnBackend(e.target.value);
          }
        }}
      />
      <button
        onClick={() => {
          const message = document.getElementById('messageInput').value;
          setMessageOnBackend(message);
        }}
      >
        Set Message
      </button>
    </div>
  );
}

export default App;
